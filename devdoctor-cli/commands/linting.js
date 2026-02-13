import { exec } from "child_process";
import { askAI } from "../utils/ai.js";

export default async function () {
  console.log("📝 Running ESLint...");

  exec("npx eslint . --format json", async (err, stdout, stderr) => {
    if (err) {
      const report = JSON.parse(stdout || "[]");
      console.log(`❌ Found ${report.length} lint issues.`);

      const prompt = `These JS lint issues were found:\n${JSON.stringify(report, null, 2)}\nProvide suggestions to fix them.`;
      const advice = await askAI(prompt);
      console.log("💡 AI Suggestions:\n", advice);
      return;
    }
    console.log("✅ No lint issues found!");
  });
}
