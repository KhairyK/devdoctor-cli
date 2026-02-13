#!/usr/bin/env node
import { program } from "commander";
import fixCommand from "../commands/fix.js";
import analyzeCommand from "../commands/analyze.js";
import { generateCommand } from "../commands/generate.js";
import testCommand from "../commands/test.js";
import lintCommand from "../commands/linting.js";

program
  .name("doctor")
  .description("DevDoctor AI CLI - Your coding assistant in terminal")
  .version("Doctor.js: v0.1.0", "-v, --version", "Output the current version");

program
  .command("fix <error>")
  .description("Diagnose and fix coding errors")
  .action(fixCommand);

program
  .command("analyze")
  .description("Analyze current project")
  .action(analyzeCommand);

program
  .command("generate")
  .description("Generate a professional README.md")
  .action(generateCommand);

program
  .command("test")
  .description("Run JS tests (default jest, configurable via .doctorrc")
  .action(testCommand);

program
  .command("lint")
  .description("Run ESLint and get AI suggestions")
  .action(lintCommand);

  

program.parse();
