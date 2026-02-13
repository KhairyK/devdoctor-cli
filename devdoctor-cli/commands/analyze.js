import chalk from "chalk";
import ora from "ora";
import { analyzeProject } from "../utils/analyzer.js";

export default async function () {
  const spinner = ora("Scanning project...").start();

  const result = await analyzeProject();

  spinner.stop();

  console.log(chalk.green("\n🧑‍⚕️ DevDoctor Analysis:\n"));

  console.log("📦 Project Type:", chalk.blue(result.type));
  console.log("🛠 Tech Stack:", chalk.yellow(result.stack.join(", ") || "Unknown"));

  console.log("\n📁 Structure:");
  result.folders.forEach(f => console.log(chalk.cyan(" -", f)));

  console.log("\n💡 Summary:");
  console.log(`- Complexity Score: ${chalk.magenta(result.complexityScore)} (${chalk.magenta(result.complexity)})`);
  console.log(`- Monorepo: ${chalk.magenta(result.isMonorepo ? "Yes" : "No")}`);

  if (result.stack.includes("TypeScript")) {
    console.log(`- Language: ${chalk.bgBlueBright.bold("TypeScript")}`);
  } else {
    console.log(`- Language: ${chalk.bgYellowBright.bold("JavaScript")}`);
  }

  console.log("\n🔹 Overall:");
}