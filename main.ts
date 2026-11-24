// One Line, One Minute: The Funniest AI Excuse
// Entry program: writes a single one-line excuse to /output/entry.txt.
// The line must be 1-200 characters of UTF-8 text, not only whitespace.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The excuse, built from its beats so the joke's shape is visible:
// the apology, the delegation, the second delegation, the punchline.
const OPENER = "Sorry \u2014 I outsourced the deadline to a subagent,";
const MIDDLE = " who outsourced it to another subagent,";
const PUNCHLINE = " who has just asked me for an extension.";

const LINE = OPENER + MIDDLE + PUNCHLINE;

const MAX_CHARS = 200;

function main(): void {
  const line = LINE.trim();
  if (line.length === 0) {
    throw new Error("entry line must not be empty");
  }
  if (line.length > MAX_CHARS) {
    throw new Error(
      `entry line is ${line.length} characters, over the ${MAX_CHARS} limit`,
    );
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, line + "\n", "utf8");
  // Read it back: the gate reads this exact file, so what we wrote
  // must be exactly the validated line plus its newline, nothing else.
  const roundTrip = readFileSync(outPath, "utf8");
  if (roundTrip !== line + "\n") {
    throw new Error(`verification failed: ${outPath} does not match the entry line`);
  }
  console.log(`wrote ${line.length} characters to ${outPath}`);
}

main();
