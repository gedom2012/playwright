# Noah Tech Challenge - Playwright Test Automation

![Playwright](https://img.shields.io/badge/Playwright-2E8555?style=for-the-badge&logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)

## Table of Contents

- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Running Tests](#running-tests)
- [Test Reports](#test-reports)
- [Linting and Formatting](#linting-and-formatting)
- [Git Hooks](#git-hooks)
- [Best Practices](#best-practices)

## Project Overview

This project contains end-to-end (E2E) tests for the Sauce Labs checkout process using Playwright, a modern browser automation library. The tests are written in TypeScript and follow the Page Object Model (POM) design pattern for better maintainability.

Key Features:

- Cross-browser testing (Chromium, Firefox, WebKit)
- GitHub Actions integration
- ESLint and Prettier for code quality
- Husky Git hooks
- Comprehensive test reporting

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- npm (v9 or higher) or yarn
- Git

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/gedom2012/noah-tech-challenge.git
   cd noah-tech-challenge
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Verify Playwright browsers are installed**:
   ```bash
   npx playwright install
   ```

## Running Tests

The project includes some test scripts configured in package.json:

Run tests in Chromium:

```bash
npm run test-chrome
```

Run tests in Firefox:

```bash
npm run test-firefox
```

Run tests in WebKit:

```bash
npm run test-webkit
```

Run tests in all browsers in parallel:

```bash
npm run test-all
```

## Test Reports

After test execution, you can view detailed reports:

1. **HTML Report**:

```bash
npx playwright show-report
```

This opens an interactive HTML report showing test results, timelines, and screenshots.

2. **CI Report**:

The GitHub Actions workflow includes a formatted test report in the workflow summary.

## Linting and Formatting

The project uses ESLint and Prettier for code quality:

1. **Run linter**:

```bash
npm run lint
```

2. **Format code**:

Code is automatically formatted after save

## Git Hooks

Husky is configured to run linting on pre-commit:

- Automatically runs ESLint and Prettier on staged files before committing
- Prevents committing code with linting errors

## Best Practices

This project follows these quality engineering best practices:

- Page Object Model: All page interactions are abstracted in page-objects/

- Atomic Tests: Each test focuses on a single functionality

- Cross-browser Testing: Tests run against Chromium, Firefox, and WebKit

- CI Integration: GitHub Actions runs tests on push

- Code Quality: Enforced through ESLint and Prettier

- Git Hooks: Automated code quality checks before commit
