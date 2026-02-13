import { exec, execSync } from "child_process";

export function askAI(prompt) {
  return new Promise((resolve, reject) => {
    const safePrompt = prompt.replace(/"/g, '\\"');

    const cmd = `copilot -p "${safePrompt}" --allow-all-tools --silent`;

    exec(cmd, { maxBuffer: 1024 * 1024 * 5 }, (error, stdout, stderr) => {
      if (error) return reject(stderr || error.message);
      resolve(stdout.trim());
    });
  });
}