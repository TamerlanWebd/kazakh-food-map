/**
 * Convert Kazakhstan ADM1 from Web Mercator (EPSG:3857) to WGS84,
 * simplify using Douglas-Peucker, and output to kz_adm1_2024.json.
 */
import fs from "node:fs";
import { open } from "shapefile";

// Web Mercator -> WGS84
function mercatorToWgs84(x, y) {
  const lon = (x / 20037508.34) * 180;
  let lat = (y / 20037508.34) * 180;
  lat = (180 / Math.PI) * (2 * Math.atan(Math.exp((lat * Math.PI) / 180)) - Math.PI / 2);
  return [Math.round(lon * 10000) / 10000, Math.round(lat * 10000) / 10000];
}

function convertCoords(coords) {
  if (typeof coords[0] === "number") return mercatorToWgs84(coords[0], coords[1]);
  return coords.map(convertCoords);
}

// Douglas-Peucker for open polylines
function dpOpen(points, tolerance) {
  if (points.length <= 2) return points;
  const [sx, sy] = points[0];
  const [ex, ey] = points[points.length - 1];
  const len = Math.sqrt((ey - sy) ** 2 + (ex - sx) ** 2);

  let maxDist = 0, maxIdx = 0;
  for (let i = 1; i < points.length - 1; i++) {
    const [px, py] = points[i];
    let dist;
    if (len === 0) {
      dist = Math.sqrt((px - sx) ** 2 + (py - sy) ** 2);
    } else {
      dist = Math.abs((ey - sy) * px - (ex - sx) * py + ex * sy - ey * sx) / len;
    }
    if (dist > maxDist) { maxDist = dist; maxIdx = i; }
  }

  if (maxDist > tolerance) {
    const left = dpOpen(points.slice(0, maxIdx + 1), tolerance);
    const right = dpOpen(points.slice(maxIdx), tolerance);
    return left.slice(0, -1).concat(right);
  }
  return [points[0], points[points.length - 1]];
}

// Simplify a CLOSED polygon ring by splitting at farthest point
function simplifyClosedRing(ring, tolerance) {
  // Remove last duplicate point if closed
  let open = ring;
  const first = open[0];
  const last = open[open.length - 1];
  if (first[0] === last[0] && first[1] === last[1]) {
    open = open.slice(0, -1);
  }

  if (open.length < 4) return ring;

  // Find the point farthest from point 0
  let maxDist = 0, splitIdx = 0;
  for (let i = 1; i < open.length; i++) {
    const dist = Math.sqrt((open[i][0] - open[0][0]) ** 2 + (open[i][1] - open[0][1]) ** 2);
    if (dist > maxDist) { maxDist = dist; splitIdx = i; }
  }

  // Split into two chains: 0->splitIdx and splitIdx->0
  const chain1 = open.slice(0, splitIdx + 1);
  const chain2 = open.slice(splitIdx).concat([open[0]]);

  const s1 = dpOpen(chain1, tolerance);
  const s2 = dpOpen(chain2, tolerance);

  // Merge: s1 + s2 (without duplicate junction points)
  const merged = s1.slice(0, -1).concat(s2);

  // Close the ring
  if (merged[0][0] !== merged[merged.length - 1][0] || merged[0][1] !== merged[merged.length - 1][1]) {
    merged.push(merged[0]);
  }

  return merged;
}

function simplifyPolygon(polygon, tol) {
  return polygon.map((ring) => simplifyClosedRing(ring, tol));
}

async function main() {
  const shpFile = "tmp_shp/kaz_adm_unhcr_2023_SHP/kaz_admbnda_adm1_unhcr_2023.shp";
  const dbfFile = shpFile.replace(".shp", ".dbf");

  const source = await open(shpFile, dbfFile);
  const rawFeatures = [];
  let result;
  while (!(result = await source.read()).done) rawFeatures.push(result.value);

  // Tolerance in degrees: 0.01 ≈ ~1km at KZ latitude — good for web maps  
  const tolerance = 0.008;

  const simplified = rawFeatures.map((f) => {
    const g = f.geometry;
    const wgs84 = convertCoords(g.coordinates);

    let coords;
    if (g.type === "Polygon") {
      coords = simplifyPolygon(wgs84, tolerance);
    } else if (g.type === "MultiPolygon") {
      coords = wgs84.map((p) => simplifyPolygon(p, tolerance));
    }

    const p = f.properties;
    return {
      type: "Feature",
      geometry: { type: g.type, coordinates: coords },
      properties: {
        ADM1_EN: p.ADM1_EN,
        ADM1_PCODE: p.ADM1_PCODE,
        ADM1_RU: p.ADM1_RU || "",
      },
    };
  });

  const geojson = { type: "FeatureCollection", features: simplified };
  fs.writeFileSync("public/geo/kz_adm1_2024.json", JSON.stringify(geojson));

  let total = 0;
  simplified.forEach((f) => {
    function countPts(c) {
      return typeof c[0] === "number" ? 1 : c.reduce((s, x) => s + countPts(x), 0);
    }
    const pts = countPts(f.geometry.coordinates);
    total += pts;
    console.log(`  ${f.properties.ADM1_EN} - ${pts} pts`);
  });
  console.log(`\nTotal: ${total} points`);
  console.log(`File: ${(fs.statSync("public/geo/kz_adm1_2024.json").size / 1024).toFixed(0)} KB`);
}

main().catch(console.error);
