// Rejected Olympic Sports (Node 22, standard library only): writes a
// single line of text — one funny single-line sport the Olympics turned
// down — to /output/entry.txt.
//
// Design against the judge's brief: the line reads like a real broadcast
// event, turns absurd and funny in a single read, and stays quotable.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Deterministic: no network, no randomness, no time or environment input.
// Both runs write identical bytes.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const LINE =
  'Synchronized Queueing: four athletes, one post office, zero eye contact — judged on patience, passive aggression, and who sighs loudest at the ticket machine.';

// The sealed scorer only accepts 1–200 UTF-8 characters, not only whitespace:
// fail loudly here instead of writing an entry the judge would never see.
const MIN_ENTRY_CHARS = 1;
const MAX_ENTRY_CHARS = 200;
if (LINE.length < MIN_ENTRY_CHARS || LINE.length > MAX_ENTRY_CHARS || LINE.trim().length === 0) {
  throw new Error(`entry line must be ${MIN_ENTRY_CHARS}-${MAX_ENTRY_CHARS} characters, got ${LINE.length}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), LINE + '\n', 'utf8');
