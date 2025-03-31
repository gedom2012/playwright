# Noah Tech Challenge - Playwright Test Automation

![Playwright](https://img.shields.io/badge/Playwright-2E8555?style=for-the-badge&logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)

## Table of Contents

- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running Tests](#running-tests)
- [Test Reports](#test-reports)
- [Linting and Formatting](#linting-and-formatting)
- [Git Hooks](#git-hooks)
- [Best Practices](#best-practices)
- [Test Architecture](#test-architecture)

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

## Environment Setup

The project requires environment variables for authentication. Follow these steps:

1. **Create your .env file**:

   ```bash
   cp .env.example .env
   ```

2. **Edit the .env file with your credentials**:

   ```bash
   USERNAME=your_actual_username
   PASSWORD=your_actual_password
   ```

3. **Important: Never commit your .env file to version control!**

## Running Tests

The project includes some test scripts configured in package.json:

### Basic Commands

- Run tests in Chromium:

```bash
npm run test-chrome
```

- Run tests in Firefox:

```bash
npm run test-firefox
```

- Run tests in WebKit:

```bash
npm run test-webkit
```

- Run tests in all browsers in parallel:

```bash
npm run test-all
```

### Advanced Options

- Run specific test file:

```bash
npx playwright test tests/checkout.spec.ts
```

- Run in headed mode (visible browser):

```bash
npx playwright test --headed
```

- Generate trace for debugging:

```bash
npx playwright test --trace on
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

Pre-commit hooks automatically:

- Format code with Prettier
- Prevent commits with linting errors

## Best Practices

This project follows these quality engineering best practices:

- Page Object Model for maintainable selectors

- Environment variables for sensitive data

- Cross-browser testing coverage

- Automated code quality checks

- CI/CD integration with GitHub Actions

## Test Architecture

Dive deeper about of this test architecture with the following diagram

- [Test Architecture Diagram](https://drive.google.com/file/d/1MYh88_TYp382WXJohELYmb-AMsJi6ENK/view?usp=sharing)

---

> 💡 _"Good code is its own best documentation." – Steve McConnell_
