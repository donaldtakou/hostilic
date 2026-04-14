/**
 * Patches next/dist/compiled/ua-parser-js/ua-parser.js to be safe
 * in Edge Runtime (Vercel), where __dirname is not defined.
 *
 * The ncc-compiled ua-parser.js runs:
 *   __nccwpck_require__.ab = __dirname + "/";
 * at module-level, which throws ReferenceError in V8 isolates.
 */
const fs = require('fs');
const path = require('path');

const uaParserPath = path.join(
  __dirname,
  '..',
  'node_modules',
  'next',
  'dist',
  'compiled',
  'ua-parser-js',
  'ua-parser.js'
);

if (!fs.existsSync(uaParserPath)) {
  console.log('[patch-ua-parser] File not found, skipping:', uaParserPath);
  process.exit(0);
}

let content = fs.readFileSync(uaParserPath, 'utf8');

if (content.includes('__EDGE_PATCHED__')) {
  console.log('[patch-ua-parser] Already patched, skipping.');
  process.exit(0);
}

const original =
  'if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";';
const patched =
  '/* __EDGE_PATCHED__ */if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=(typeof __dirname!=="undefined"?__dirname:"/")+"/";';

if (!content.includes(original)) {
  console.warn('[patch-ua-parser] Pattern not found — ua-parser.js may have a different format. Skipping.');
  process.exit(0);
}

content = content.replace(original, patched);
fs.writeFileSync(uaParserPath, content, 'utf8');
console.log('[patch-ua-parser] Successfully patched ua-parser.js for Edge Runtime compatibility.');
