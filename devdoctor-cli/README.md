# DevDoctor CLI

**DevDoctor** is your AI-powered coding assistant for JavaScript projects.  
It helps you **analyze projects, fix errors, run tests, lint code, and generate documentation or README files** — all from your terminal.

---

## Features

- **Fix coding errors**: Diagnose and get AI suggestions for JS errors.  
- **Analyze project**: Scan project structure, tech stack, and complexity.  
- **Generate README**: Automatically generate professional README.md from project files.  
- **Test**: Run JS tests (Jest by default, configurable via `.doctorrc`) and get AI suggestions.  
- **Lint**: Run ESLint and get AI suggestions for code quality.  

---

## Installation

```bash
npm install -g devdoctor-js
```

or clone and run locally:

```bash
git clone https://github.com/KhairyK/devdoctor-cli.git
cd devdoctor-cli
npm install
```

---

## Usage

```bash
doctor <command> [options]
```

### Commands

| Command           | Description |
|------------------|-------------|
| `doctor fix <error>` | Diagnose and fix coding errors |
| `doctor analyze`     | Analyze current project structure and tech stack |
| `doctor generate`    | Generate a professional README.md |
| `doctor test`        | Run JS tests (default Jest, configurable via `.doctorrc`) |
| `doctor lint`        | Run ESLint and get AI suggestions |

---

## Configuration

Create a `.doctorrc` in your project root to customize behavior:

```text
# .doctorrc example
TEST=mocha
LINTER=eslint
```

- `TEST` → Choose test framework (`jest`, `mocha`, etc.)  
- `LINTER` → Choose linter (`eslint`, `prettier`, etc.)  

---

## Contributing

Contributions are welcome! Feel free to open issues or pull requests.  

---

## License

Apache-2.0 License

2026 (C) OpenDN Foundation
