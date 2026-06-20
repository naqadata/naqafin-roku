import { copyFileSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const stagingDir = join(repoRoot, "build", "staging");
const stagingImagesDir = join(stagingDir, "images");
const outDir = join(repoRoot, "out");
const devZip = join(outDir, "naqafin-roku-dev.zip");

execFileSync("npm", ["run", "build"], { cwd: repoRoot, stdio: "inherit" });

mkdirSync(stagingImagesDir, { recursive: true });

for (const size of ["fhd", "hd", "sd"]) {
  copyFileSync(
    join(repoRoot, "packaging", "dev", "images", `channel-poster_${size}_dev.png`),
    join(stagingImagesDir, `channel-poster_${size}_dev.png`),
  );
  copyFileSync(
    join(repoRoot, "packaging", "dev", "images", `splash-screen_${size}_dev.png`),
    join(stagingImagesDir, `splash-screen_${size}_dev.png`),
  );
}

const manifestPath = join(stagingDir, "manifest");
const manifest = readFileSync(manifestPath, "utf8")
  .replace(/^title=Naqafin$/m, "title=Naqafin Dev")
  .replace(/^mm_icon_focus_fhd=.*$/m, "mm_icon_focus_fhd=pkg:/images/channel-poster_fhd_dev.png")
  .replace(/^mm_icon_focus_hd=.*$/m, "mm_icon_focus_hd=pkg:/images/channel-poster_hd_dev.png")
  .replace(/^mm_icon_focus_sd=.*$/m, "mm_icon_focus_sd=pkg:/images/channel-poster_sd_dev.png")
  .replace(/^splash_screen_fhd=.*$/m, "splash_screen_fhd=pkg:/images/splash-screen_fhd_dev.png")
  .replace(/^splash_screen_hd=.*$/m, "splash_screen_hd=pkg:/images/splash-screen_hd_dev.png")
  .replace(/^splash_screen_sd=.*$/m, "splash_screen_sd=pkg:/images/splash-screen_sd_dev.png");

writeFileSync(manifestPath, manifest);
rmSync(devZip, { force: true });
execFileSync("zip", ["-qr", devZip, "."], { cwd: stagingDir, stdio: "inherit" });
console.log(`Created ${devZip}`);
