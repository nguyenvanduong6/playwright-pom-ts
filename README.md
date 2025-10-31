**Commands:**
1. Runs the end-to-end tests with example env.
`npm run test-run`

2. See the browser UI during test execution.
`npm run test-head`

3. Open last HTML report
`npm run report`

4. Check eslint for .ts,.tsx files
`npm run lint`

5. Rewrite the format of files with prettier
`npm run format`

**Features:**

Use as a boilerplate

**Allure report:**

1. Install.
`brew install allure`
2. Setting up.
`npm install --save-dev @playwright/test allure-playwright`
3. In the playwright.config.ts file, add Allure Playwright as a reporter.
`reporter: [["line"], ["allure-playwright"]],`
4. Run tests
5. Generate a report
`allure serve allure-results`
