import fg from "fast-glob";
import fs from "fs";
import path from "path";

// ================= Helper Functions =================
function calculateComplexity(stack, folders, files) {
  let score = 0;
  score += stack.length * 2;
  score += folders.length;
  score += files.length * 0.01;
  return Math.round(score);
}

function complexityLabel(score) {
  if (score < 10) return "Simple";
  if (score < 30) return "Medium";
  return "Complex";
}

function detectMonorepo(pkg, folders) {
  const workspaces = pkg.workspaces || (pkg.packageManager?.includes("workspace"));
  const hasPackagesFolder = folders.includes("packages") || folders.includes("apps");
  return !!(workspaces || hasPackagesFolder);
}

// ================= Core Analyzer =================
export async function analyzeProject(projectPath = ".") {
  const files = await fg(["**/*.*"], {
    cwd: projectPath,
    ignore: ["node_modules/**"]
  });

  const hasPackage = fs.existsSync(path.join(projectPath, "package.json"));
  let type = "Unknown";
  let stack = [];

  let pkg = {};
  if (hasPackage) {
    pkg = JSON.parse(fs.readFileSync(path.join(projectPath, "package.json")));
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };

    stack.push("JavaScript");

    const detectors = {
      express: "Express",
      fastify: "Fastify",
      koa: "Koa",
      react: "React",
      vue: "Vue",
      next: "Next.js",
      nuxt: "Nuxt",
      svelte: "Svelte",
      commander: "Commander CLI",
      yargs: "Yargs CLI",
      vite: "Vite",
      webpack: "Webpack",
      tailwindcss: "Tailwind",
      prisma: "Prisma ORM",
      mongoose: "MongoDB + Mongoose",
      typescript: "TypeScript"
    };

    for (const dep in detectors) {
      if (deps?.[dep]) stack.push(detectors[dep]);
    }

    // detect type
    const isFE = deps.react || deps.vue || deps.svelte || deps.next || deps.nuxt;
    const isBE = deps.express || deps.fastify || deps.koa;

    if (isFE && isBE) type = "Fullstack App";
    else if (isFE) type = "Frontend App";
    else if (isBE) type = "Backend App";
    else type = "Node.js Project";
  }

  const folders = [...new Set(
    files.map(f => f.split("/")[0]).filter(f => !f.includes("."))
  )];

  const complexityScore = calculateComplexity(stack, folders, files);
  const complexity = complexityLabel(complexityScore);
  const isMonorepo = hasPackage ? detectMonorepo(pkg, folders) : false;

  return { type, stack, folders, complexityScore, complexity, isMonorepo };
}

// ================= CLI Interface =================
if (import.meta.url === `file://${process.argv[1]}`) {
  (async () => {
    const projectPath = process.argv[2] || ".";
    const result = await analyzeProject(projectPath);

    console.log("\n📦 Project Analysis Result");
    console.log("=========================");
    console.log("Project Path:", projectPath);
    console.log("Type:", result.type);
    console.log("Stack:", result.stack.join(", "));
    console.log("Folders:", result.folders.join(", "));
    console.log("Complexity Score:", result.complexityScore, `(${result.complexity})`);
    console.log("Monorepo:", result.isMonorepo ? "Yes" : "No");
    console.log("=========================\n");
  })();
}