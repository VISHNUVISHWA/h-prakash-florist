// Generates src/data/image-meta.json: intrinsic size + tiny blurred placeholder
// for every raster image under public/assets. Re-run after replacing images:
//   npm run images:meta
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('public');
const out = path.resolve('src/data/image-meta.json');
const exts = new Set(['.webp', '.jpg', '.jpeg', '.png', '.avif']);

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const p = path.join(dir, d.name);
    return d.isDirectory() ? walk(p) : exts.has(path.extname(d.name).toLowerCase()) ? [p] : [];
  });
}

const meta = {};
for (const file of walk(path.join(root, 'assets'))) {
  const key = '/' + path.relative(root, file).split(path.sep).join('/');
  const img = sharp(file);
  const { width, height } = await img.metadata();
  const blur = await img.clone().resize(16, 16, { fit: 'inside' }).webp({ quality: 40 }).toBuffer();
  meta[key] = { w: width, h: height, blur: `data:image/webp;base64,${blur.toString('base64')}` };
}
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify(meta, null, 1));
console.log(`Wrote ${Object.keys(meta).length} entries to ${path.relative(process.cwd(), out)}`);
