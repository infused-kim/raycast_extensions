import { exec } from "child_process";
import { promisify } from "util";
import { inspect } from "util";
import { execa } from "execa";

const execp = promisify(exec);

/**
 * Get shortcuts script template string according to shortcut name and input.
 *
 * * NOTE: To run a shortcut in the background, without opening the Shortcuts app, tell 'Shortcuts Events' instead of 'Shortcuts'.
 */
 function getShortcutsScript(shortcutName: string, input: string): string {
    /**
     * * NOTE: First, exec osascript -e 'xxx', internal param only allow double quote, so single quote have to be instead of double quote.
     * * Then, the double quote in the input must be escaped.
     */
    const escapedInput = input.replace(/'/g, '"').replace(/"/g, '\\"'); // test: oh girl you're so beautiful, my "unfair" girl
    const appleScriptContent = `
          tell application "Shortcuts Events"
            run the shortcut named "${shortcutName}" with input "${escapedInput}"
          end tell
        `;
    // console.log(`apple script: ${appleScriptContent}`);
    return appleScriptContent;
  }


export async function getAlDenteStatus(): Promise<any> {
    // const output = await execp(`/usr/bin/shortcuts run "raycast_aldente_get_state"`);

    console.log("Running get status: ");

    const appleScript = getShortcutsScript("raycast_aldente_get_state", "");
    const output = execa("osascript", ["-e", appleScript]);

    console.log("Ran get status: " + inspect(output));
}
