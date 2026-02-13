#!/usr/bin/env node
import readline from "readline";
import fs from "fs";
import { askAI } from "../utils/ai.js";
import { readProjectFiles } from "../utils/readme_generator.js";

export async function generateCommand() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const ignoreFiles = ["node_modules", ".git", ".env"];
  const projectFiles = readProjectFiles(process.cwd(), ignoreFiles);
  console.log(`Found ${projectFiles.length} files in project.`);

  rl.question("Enter a short description of your project: ", async (desc) => {
    rl.close();

    // potong isi file + escape karakter bermasalah
    const fileSummary = projectFiles
      .map(f => {
        const content = f.content.slice(0, 500) // ambil 500 karakter pertama
          .replace(/`/g, "'")                 // replace backticks
          .replace(/\\/g, "\\\\")             // escape backslash
          .replace(/\$/g, "\\$");             // escape $
        return `File: ${f.path}\n${content}...`;
      })
      .join("\n\n");

    const prompt = `
You are generating a professional README.md for a project.
Project description: ${desc}
Project files summary:
${fileSummary}

Include sections:
- Title
- Description
- Installation
- Usage
- License
`;

    try {
      // gunakan async askAI (lebih aman daripada execSync)
      const readmeContent = await askAI(prompt);
      fs.writeFileSync("README.md", readmeContent);
      console.log("\n✅ README.md has been successfully created!");
    } catch (err) {
      console.error("❌ Error generating README:", err);
    }
  });
}