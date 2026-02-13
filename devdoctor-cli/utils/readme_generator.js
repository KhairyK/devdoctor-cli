import fs from "fs";
import path from "path";

export function readProjectFiles(dir = process.cwd(), ignore = ["node_modules", ".git"]) {
  let files = [];

  const items = fs.readdirSync(dir);
  for (const item of items) {
    if (ignore.includes(item)) continue; // skip ignored folder/file

    const fullPath = path.join(dir, item);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      files = files.concat(readProjectFiles(fullPath, ignore));
    } else {
      const content = fs.readFileSync(fullPath, "utf-8");
      files.push({ path: fullPath.replace(process.cwd() + path.sep, ""), content });
    }
  }

  return files;
}
