import chalk from "chalk";
import ora from "ora";
import { askAI } from "../utils/ai.js";

export default async function (error) {
  const spinner = ora("Consulting DevDoctor AI...").start();

  const prompt = `
Explain this coding error and provide a fix:

${error}

Format:
Diagnosis:
Fix:
Example:
`;

  try {
    const result = await askAI(prompt);

    spinner.stop();

    console.log(chalk.green("\n🧑‍⚕️ DevDoctor AI Diagnosis:\n"));
    console.log(result);
  } catch (err) {
    spinner.fail("AI consultation failed");
    console.log(err.message);
  }
}