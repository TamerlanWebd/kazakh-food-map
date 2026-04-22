/**
 * Download Kazakhstan ADM1 shapefile from HDX and convert to GeoJSON.
 * Result: public/geo/kz_adm1_2024.json
 */
import https from "node:https";
import http from "node:http";
import fs from "node:fs";
import { createUnzip } from "node:zlib";
import path from "node:path";
import { open } from "shapefile";

const OUT_DIR = path.resolve("tmp_shp");
const GEOJSON_OUT = path.resolve("public/geo/kz_adm1_2024.json");

// HDX download link for SHP
const HDX_URL =
  "https://data.humdata.org/dataset/afb05759-c3da-44f4-93a1-6bd2d8bcd431/resource/86cce6ba-4b79-4b4e-8961-3e6e04308395/download/kaz_adm_unhcr_2023_shp.zip";

function followRedirects(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https") ? https : http;
    lib.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        followRedirects(res.headers.location).then(resolve, reject);
      } else if (res.statusCode === 200) {
        resolve(res);
      } else {
        reject(new Error(`HTTP ${res.statusCode}`));
      }
    }).on("error", reject);
  });
}

async function downloadFile(url, dest) {
  console.log("Downloading from HDX...");
  const stream = await followRedirects(url);
  const w = fs.createWriteStream(dest);
  stream.pipe(w);
  return new Promise((resolve, reject) => {
    w.on("finish", resolve);
    w.on("error", reject);
  });
}

async function unzip(zipPath, outDir) {
  console.log("Unzipping...");
  const { default: AdmZip } = await import("adm-zip");
  const zip = new AdmZip(zipPath);
  zip.extractAllTo(outDir, true);
  console.log("Extracted to", outDir);
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const zipPath = path.join(OUT_DIR, "kaz_shp.zip");

  // Step 1: download
  await downloadFile(HDX_URL, zipPath);
  console.log("Downloaded OK:", zipPath);

  // Need adm-zip for zip extraction
  console.log("Installing adm-zip...");
  const { execSync } = await import("node:child_process");
  execSync("npm install -D adm-zip", { stdio: "inherit" });

  // Step 2: extract
  await unzip(zipPath, OUT_DIR);

  // Step 3: find ADM1 shp+dbf
  const allFiles = [];
  function walk(dir) {
    for (const f of fs.readdirSync(dir)) {
      const p = path.join(dir, f);
      if (fs.statSync(p).isDirectory()) walk(p);
      else allFiles.push(p);
    }
  }
  walk(OUT_DIR);

  const shpFile = allFiles.find(
    (f) => f.toLowerCase().includes("adm1") && f.endsWith(".shp")
  );
  const dbfFile = shpFile?.replace(/\.shp$/i, ".dbf");

  if (!shpFile || !dbfFile) {
    console.log("Available files:", allFiles);
    throw new Error("ADM1 shapefile not found");
  }
  console.log("Found SHP:", shpFile);

  // Step 4: convert to GeoJSON
  const source = await open(shpFile, dbfFile);
  const features = [];
  let result;
  while (!(result = await source.read()).done) {
    features.push(result.value);
  }

  const geojson = {
    type: "FeatureCollection",
    features,
  };

  fs.writeFileSync(GEOJSON_OUT, JSON.stringify(geojson));
  console.log(
    `\n✅ GeoJSON written to ${GEOJSON_OUT} (${features.length} features)`
  );

  // Print names for verification
  features.forEach((f) => {
    const p = f.properties;
    console.log(` - ${p.ADM1_EN || p.admin1Name_en || p.NAME_1 || JSON.stringify(p)}`);
  });

  // Cleanup
  // fs.rmSync(OUT_DIR, { recursive: true, force: true });
}

main().catch((err) => {
  console.error("FAILED:", err);
  process.exit(1);
});
