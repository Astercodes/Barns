import { readFileSync, statSync } from "node:fs";

const files = ["out/index.html", "out/check-in.html", "out/capacity-gap.html", "out/open-barn.html", "out/put-barn.html", "out/barn-inventory.html", "out/eat-the-word.html", "out/belief-detox.html", "out/strongholds.html", "out/stretch-zone.html", "out/weight-test.html", "out/capacity-floor.html", "out/capacity-ceiling.html", "out/styles.css", "out/charts.css", "out/theme.css", "out/feature-pages.css", "out/modules.css", "out/growth-systems.css", "out/capacity-limits.css", "out/app.js", "out/feature-pages.js", "out/modules.js", "out/growth-systems.js", "out/capacity-limits.js", "vercel.json"];
for (const file of files) {
  if (!statSync(file).isFile()) throw new Error(`Missing ${file}`);
}
const html = readFileSync("out/index.html", "utf8");
if (!html.includes("BARNS") || !html.includes("app.js")) {
  throw new Error("BARNS app shell is incomplete");
}
console.log("BARNS production build validated.");

