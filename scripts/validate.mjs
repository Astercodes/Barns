import { readFileSync, statSync } from "node:fs";

const files = ["out/index.html", "out/styles.css", "out/charts.css", "out/theme.css", "out/flows.css", "out/app.js", "out/flows.js", "vercel.json"];
for (const file of files) {
  if (!statSync(file).isFile()) throw new Error(`Missing ${file}`);
}
const html = readFileSync("out/index.html", "utf8");
if (!html.includes("BARNS") || !html.includes("app.js")) {
  throw new Error("BARNS app shell is incomplete");
}
console.log("BARNS production build validated.");

