import { spawnSync } from "node:child_process";

const expectedName = "uscss-nostromo";

// The Sharing pane in System Settings writes both of these. HostName is left unset,
// so hostname and uname -n follow LocalHostName.
const settings = ["ComputerName", "LocalHostName"] as const;

/** Read one of the Mac's names. Resolves to null when scutil fails or the name is not set. */
function readName(setting: string): string | null {
  const result = spawnSync("scutil", ["--get", setting], { encoding: "utf8" });
  return result.status === 0 ? result.stdout.trim() : null;
}

/**
 * Compare the Mac's names with the expected name and print the commands that fix a mismatch.
 * Only reads, because changing a name needs sudo.
 */
export function checkComputerName() {
  const mismatches = settings
    .map((setting) => ({ setting, actual: readName(setting) }))
    .filter(({ actual }) => actual !== expectedName);

  if (mismatches.length === 0) {
    console.log("Unchanged computer name");
    return;
  }

  console.log("");
  for (const { setting, actual } of mismatches) {
    const found = actual === null ? "not set" : `"${actual}"`;
    console.log(`${setting} is ${found}, expected "${expectedName}"`);
  }
  console.log("To fix:");
  for (const { setting } of mismatches) {
    console.log(`  sudo scutil --set ${setting} ${expectedName}`);
  }
}
