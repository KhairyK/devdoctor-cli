import { exec } from "child_process";
import { askAI } from "../utils/ai.js";
import { readDoctorConfig } from "../utils/config.js";

export default async function () {
  const config = readDoctorConfig();
  const testFramework = config.TEST || "jest";

  console.log(`🧪 Running tests using ${testFramework}...`);

  let cmd;
  if (testFramework === "jest") {
    cmd = "npx jest --json --outputFile=test-report.json";
  } else if (testFramework === "mocha") {
    cmd = "npx mocha --reporter json > test-report.json";
  } else {
    console.log(`❌ Unknown test framework: ${testFramework}`);
    return;
  }

  exec(cmd, async (err, stdout, stderr) => {
    if (err) {
      console.error("❌ Tests failed:", stderr || err.message);

      // opsional: AI suggestion
      const prompt = `JS tests using ${testFramework} failed:\n${stderr}\nProvide suggestions to fix the tests.`;
      const advice = await askAI(prompt);
      console.log("💡 AI Suggestions:\n", advice);
      return;
    }

    console.log("✅ All tests passed!");
  });
}