import fs from "fs";
import path from "path";

export function readDoctorConfig() {
  const file = path.join(process.cwd(), ".doctorrc");
  if (!fs.existsSync(file)) return {};
  
  const content = fs.readFileSync(file, "utf-8");
  const config = {};
  
  content.split("\n").forEach(line => {
    line = line.trim();
    if (!line || line.startsWith("#")) return;
    const [key, value] = line.split("=").map(s => s.trim());
    if (key && value) config[key] = value;
  });
  
  return config;
}
