// Pre-generates responsive WebP variants into public/_img/ for the static (GitHub Pages) build.
// Run automatically by `npm run build:pages`. Output is git-ignored.
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const WIDTHS = [480, 828, 1280, 1920];
const root = path.resolve('public');
const outRoot = path.join(root, '_img');
fs.rmSync(outRoot, { recursive: true, force: true });

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const p = path.join(dir, d.name);
    return d.isDirectory() ? walk(p) : /\.(webp|jpe?g|png)$/i.test(d.name) ? [p] : [];
  });
}

let count = 0;
for (const file of walk(path.join(root, 'assets'))) {
  const rel = '/' + path.relative(root, file).split(path.sep).join('/');
  const { width } = await sharp(file).metadata();
  for (const w of WIDTHS) {
    if (width <= w) continue;
    const out = path.join(outRoot, rel.replace(/\.\w+$/, '') + `-${w}.webp`);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    await sharp(file).resize({ width: w }).webp({ quality: 82 }).toFile(out);
    count++;
  }
}
console.log(`Generated ${count} image variants in public/_img`);
