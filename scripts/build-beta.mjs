import { copyFileSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const stagingDir = join(repoRoot, "build", "staging");
const stagingImagesDir = join(stagingDir, "images");
const outDir = join(repoRoot, "out");
const betaZip = join(outDir, "naqafin-roku-beta.zip");

execFileSync("npm", ["run", "build"], { cwd: repoRoot, stdio: "inherit" });

mkdirSync(stagingImagesDir, { recursive: true });

for (const size of ["fhd", "hd", "sd"]) {
  copyFileSync(
    join(repoRoot, "packaging", "beta", "images", `channel-poster_${size}_beta.png`),
    join(stagingImagesDir, `channel-poster_${size}_beta.png`),
  );
  copyFileSync(
    join(repoRoot, "packaging", "beta", "images", `splash-screen_${size}_beta.png`),
    join(stagingImagesDir, `splash-screen_${size}_beta.png`),
  );
}

for (const size of ["fhd", "hd", "sd"]) {
  for (const suffix of ["", "_dev"]) {
    rmSync(join(stagingImagesDir, `channel-poster_${size}${suffix}.png`), { force: true });
    rmSync(join(stagingImagesDir, `splash-screen_${size}${suffix}.png`), { force: true });
  }
}

const manifestPath = join(stagingDir, "manifest");
const manifest = readFileSync(manifestPath, "utf8")
  .replace(/^title=Naqafin$/m, "title=Naqafin Beta")
  .replace(/^mm_icon_focus_fhd=.*$/m, "mm_icon_focus_fhd=pkg:/images/channel-poster_fhd_beta.png")
  .replace(/^mm_icon_focus_hd=.*$/m, "mm_icon_focus_hd=pkg:/images/channel-poster_hd_beta.png")
  .replace(/^mm_icon_focus_sd=.*$/m, "mm_icon_focus_sd=pkg:/images/channel-poster_sd_beta.png")
  .replace(/^splash_screen_fhd=.*$/m, "splash_screen_fhd=pkg:/images/splash-screen_fhd_beta.png")
  .replace(/^splash_screen_hd=.*$/m, "splash_screen_hd=pkg:/images/splash-screen_hd_beta.png")
  .replace(/^splash_screen_sd=.*$/m, "splash_screen_sd=pkg:/images/splash-screen_sd_beta.png");

writeFileSync(manifestPath, manifest);
rmSync(betaZip, { force: true });
execFileSync("zip", ["-qr", betaZip, "."], { cwd: stagingDir, stdio: "inherit" });
console.log(`Created ${betaZip}`);
