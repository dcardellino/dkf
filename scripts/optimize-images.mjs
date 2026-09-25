// Converts the original photos from the legacy site (dkf-bikes.com) into
// web-optimized WebP files under public/images.
// Usage: node scripts/optimize-images.mjs <source-dir>
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const MAX_WIDTH = 1600;
const QUALITY = 78;

const mapping = {
  'GS17.jpeg': 'sportster-scrambler-rot.webp',
  'GS12.jpeg': 'sportster-scrambler-rot-detail.webp',
  'IMG_4768.jpeg': 'sportster-scrambler-rot-seite.webp',
  'IMG_4814.jpeg': 'klassiker-motor-detail.webp',
  'IMG_4822.jpeg': 'harley-custom-creme.webp',
  'IMG_4850.jpeg': 'harley-softail-hellblau.webp',
  'IMG_5491.jpeg': 'motor-instandsetzung.webp',
  'IMG_5496.jpeg': 'getriebe-instandsetzung.webp',
  'IMG_5497.jpeg': 'harley-v-twin-revidiert-1.webp',
  'IMG_5498.jpeg': 'harley-v-twin-revidiert-2.webp',
  'dkf-bikes-bmw-custombike-1-kfz-werkstatt-herrenberg-boeblingen-tuebingen.jpg': 'bmw-cafe-racer-1.webp',
  'dkf-bikes-bmw-custombike-2-kfz-werkstatt-herrenberg-boeblingen-tuebingen.jpg': 'bmw-cafe-racer-2.webp',
  'dkf-bikes-bmw-custombike-3-kfz-werkstatt-herrenberg-boeblingen-tuebingen.jpg': 'bmw-cafe-racer-3.webp',
  'dkf-bikes-harley-davidson-custombike-8-kfz-werkstatt-herrenberg-boeblingen-tuebingen.jpg': 'harley-v-rod-1.webp',
  'dkf-bikes-harley-davidson-custombike-9-kfz-werkstatt-herrenberg-boeblingen-tuebingen.jpg': 'harley-v-rod-2.webp',
  'dkf-bikes-harley-davidson-custombike-10-kfz-werkstatt-herrenberg-boeblingen-tuebingen.jpg': 'harley-v-rod-3.webp',
  'dkf-bikes-harley-davidson-custombike-11-kfz-werkstatt-herrenberg-boeblingen-tuebingen.jpg': 'harley-v-rod-4.webp',
  'dkf-bikes-harley-davidson-fatboy-custombike-1-kfz-werkstatt-herrenberg-boeblingen-tuebingen.jpg':
    'harley-fat-boy-1.webp',
  'dkf-bikes-harley-davidson-fatboy-custombike-3-kfz-werkstatt-herrenberg-boeblingen-tuebingen.jpg':
    'harley-fat-boy-2.webp',
  'dkf-bikes-harley-davidson-fatboy-custombike-4-kfz-werkstatt-herrenberg-boeblingen-tuebingen.jpg':
    'harley-fat-boy-3.webp',
  'dkf-bikes-harley-davidson-flathead-custombike-1-kfz-werkstatt-herrenberg-boeblingen-tuebingen.jpg':
    'harley-sportster-petrol-1.webp',
  'dkf-bikes-harley-davidson-flathead-custombike-2-kfz-werkstatt-herrenberg-boeblingen-tuebingen.jpg':
    'harley-sportster-petrol-2.webp',
  'dkf-bikes-harley-davidson-flathead-custombike-3-kfz-werkstatt-herrenberg-boeblingen-tuebingen.jpg':
    'harley-sportster-petrol-3.webp',
  'dkf-bikes-harley-davidson-flathead-custombike-4-kfz-werkstatt-herrenberg-boeblingen-tuebingen.jpg':
    'harley-flathead-1.webp',
  'dkf-bikes-harley-davidson-flathead-custombike-5-kfz-werkstatt-herrenberg-boeblingen-tuebingen.jpg':
    'harley-flathead-2.webp',
};

const sourceDir = process.argv[2];
if (!sourceDir) {
  console.error('Usage: node scripts/optimize-images.mjs <source-dir>');
  process.exit(1);
}

const outDir = path.resolve('public/images');
fs.mkdirSync(outDir, { recursive: true });

for (const [source, target] of Object.entries(mapping)) {
  const input = path.join(sourceDir, source);
  if (!fs.existsSync(input)) {
    console.warn(`skip (missing): ${source}`);
    continue;
  }
  const info = await sharp(input)
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(path.join(outDir, target));
  console.log(`${target}\t${info.width}x${info.height}\t${Math.round(info.size / 1024)} KB`);
}

const logo = path.join(sourceDir, 'logo_dkf_trans.png');
if (fs.existsSync(logo)) {
  await sharp(logo).png().toFile(path.join(outDir, 'logo-dkf.png'));
  await sharp(logo)
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.resolve('src/app/icon.png'));
  console.log('logo-dkf.png + src/app/icon.png');
}
