// Rejected Olympic Sports (Node 22, standard library only): writes a
// single line of text — one funny single-line sport the Olympics turned
// down — to /output/entry.txt.
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
if (LINE.length < 1 || LINE.length > 200 || LINE.trim().length === 0) {
  throw new Error(`entry line must be 1-200 characters, got ${LINE.length}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), LINE + '\n', 'utf8');
