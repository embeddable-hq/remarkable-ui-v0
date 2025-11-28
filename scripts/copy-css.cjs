// scripts/copy-css.cjs
const fg = require('fast-glob');
const fs = require('fs');
const path = require('path');

async function main() {
  // find all .css files in src
  const files = await fg('src/**/*.css');

  for (const file of files) {
    const rel = path.relative('src', file);      // e.g. components/charts/charts.module.css
    const dest = path.join('dist', rel);         // e.g. dist/components/charts/charts.module.css

    await fs.promises.mkdir(path.dirname(dest), { recursive: true });
    await fs.promises.copyFile(file, dest);
  }

  console.log(`Copied ${files.length} CSS files to dist/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});