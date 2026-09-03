import { readFileSync, statSync } from "node:fs";

const files = ["out/index.html", "out/check-in.html", "out/capacity-gap.html", "out/open-barn.html", "out/put-barn.html", "out/barn-inventory.html", "out/eat-the-word.html", "out/belief-detox.html", "out/strongholds.html", "out/stretch-zone.html", "out/weight-test.html", "out/capacity-floor.html", "out/capacity-ceiling.html", "out/prune-to-grow.html", "out/promises.html", "out/ebenezers.html", "out/barn-journal.html", "out/come-up-hither.html", "out/barn-blueprints.html", "out/seasons.html", "out/enlargement-cycle.html", "out/weekly-review.html", "out/monthly-report.html", "out/styles.css", "out/charts.css", "out/theme.css", "out/feature-pages.css", "out/modules.css", "out/growth-systems.css", "out/capacity-limits.css", "out/legacy-systems.css", "out/reflection-systems.css", "out/cycle-systems.css", "out/barn-operating-system.css", "out/app.js", "out/feature-pages.js", "out/modules.js", "out/growth-systems.js", "out/capacity-limits.js", "out/legacy-systems.js", "out/reflection-systems.js", "out/cycle-systems.js", "out/barn-operating-system.js", "vercel.json"];
files.push("out/app.html", "out/landing.css", "out/landing.js");
for (const file of files) {
  if (!statSync(file).isFile()) throw new Error(`Missing ${file}`);
}
const html = readFileSync("out/index.html", "utf8");
const app = readFileSync("out/app.html", "utf8");
if (!html.includes("Make room") || !html.includes("landing.js") || !app.includes("app.js")) {
  throw new Error("BARNS public landing or app shell is incomplete");
}
console.log("BARNS production build validated.");

