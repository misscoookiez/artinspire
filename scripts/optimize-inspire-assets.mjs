import sharp from "sharp";
import { fileURLToPath } from "node:url";

const publicArt = new URL("../public/art/", import.meta.url);
const sourceLogo = "C:/Users/missc/Downloads/INSPIRE/E617608A-E02F-43F2-BD9D-5E6DB7184693_L0_001-15_04_2024, 13_26_02 white.png";
const sourceMasthead = "C:/Users/missc/Downloads/INSPIRE/Codex Image Sep 2, 2026, 01_32_30 PMeewe.png";

// The supplied logo contains one tiny accidental white speck inside the “p”.
// `dest-out` removes only that mark while preserving the transparent canvas.
const removeSpeck = Buffer.from(`
  <svg width="1670" height="651" xmlns="http://www.w3.org/2000/svg">
    <circle cx="705" cy="208" r="12" fill="white"/>
  </svg>
`);

await sharp(sourceLogo)
  .composite([{ input: removeSpeck, blend: "dest-out" }])
  .webp({ quality: 94, alphaQuality: 100 })
  .toFile(fileURLToPath(new URL("inspire-logo-white-clean.webp", publicArt)));

await sharp(sourceMasthead)
  .resize({ width: 1920, withoutEnlargement: true })
  .webp({ quality: 82 })
  .toFile(fileURLToPath(new URL("inspire-masthead-background.webp", publicArt)));
