import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const assets = [
  "event-slide-lecture.jpg",
  "event-slide-student-work-02.jpeg",
  "event-slide-student-work.jpeg",
  "inspire-door-directions.jpg",
  "inspire-cosmic-strip.png",
  "inspire-inkwell-swash.png",
  "inspire-masthead-artwork.png",
  "inspire-masthead-locked.png",
  "inspire-masthead-wide.png",
  "inspire-mood-strip.png",
  "inspire-nebula.jpg",
  "inspire-slide-02.jpeg",
  "inspire-slide-03.jpeg",
  "inspire-slide-06.jpeg",
  "inspire-slide-07.jpeg",
  "inspire-slide-08.jpeg",
  "inspire-student-work.jpeg",
  "inspire-studio.jpeg",
  "inspire-visual-elements.png",
  "sandra-art-canal.jpg",
  "sandra-art-drips.jpg",
  "sandra-art-eye.jpg",
  "sandra-art-lakeside.jpg",
  "sandra-art-raven-drawing.jpg",
  "sandra-art-raven.jpg",
  "sandra-art-red-eyes.jpg",
  "sandra-art-sea.jpg",
  "sandra-profile-lead.jpeg",
  "sandra-studio-07.jpg",
  "sandra-studio-tea-upright.jpg",
  "student-process-adult.jpg",
  "studio-neutral-01.jpg",
  "studio-neutral-02.jpg",
  "studio-preview-easel.jpg",
  "studio-preview-room.jpg",
  "studio-preview-wall.jpg",
  "studio-slide-easel.jpeg",
  "studio-slide-eyes.jpeg",
  "studio-slide-garden.jpeg",
  "studio-slide-room.jpeg",
  "tattoo-room-detail.jpeg",
  "tattoo-room-main.jpeg"
];

for (const name of assets) {
  const input = path.join(root, "public", "art", name);
  const output = input.replace(/\.[^.]+$/, ".webp");
  await sharp(input)
    .rotate()
    .resize({ width: 1920, height: 1920, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 82, effort: 6, smartSubsample: true })
    .toFile(output);
  const [{ size: before }, { size: after }] = await Promise.all([fs.stat(input), fs.stat(output)]);
  console.log(`${name}: ${(before / 1024 / 1024).toFixed(2)} MB → ${(after / 1024 / 1024).toFixed(2)} MB`);
}
