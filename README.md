# Email Verification with Gmail Tester and Playwright

## Introduction
This repository provides a guide and code for verifying email functionality using Playwright and the `gmail-tester` library. The focus is on ensuring that critical emails, such as password reset requests, are correctly sent and received.

## Why Email Verification Testing is Important
Email verification testing is crucial for maintaining the reliability of systems that depend on email communications. By automating the testing process, you can catch issues early and ensure that your users receive the necessary emails, such as account confirmations, password resets, and other notifications.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Visual Studio Code](https://code.visualstudio.com/)
- [Node.js](https://nodejs.org/)
- [Playwright](https://playwright.dev/)
- OAuth2 Authentication credentials from [Google Cloud Console](https://console.cloud.google.com/apis/credentials)

## Setting Up Your Project

1. **Clone the Repository**
    ```bash
    git clone <repository-url>
    cd <repository-folder>
    ```

2. **Install Dependencies**
    ```bash
    npm install
    ```

3. **Generate OAuth2 Token**
    The `credentials.json` file is needed to store the OAuth2 values. To generate the `token.json`, run:
    ```bash
    node node_modules/gmail-tester/init.js credentials.json token.json <your-email@gmail.com>
    ```
    Replace `<your-email@gmail.com>` with the email address associated with your Gmail account.

4. **Organize Your Project Structure**
    Ensure that your project structure is organized as follows:
    ```plaintext
    project-root/
    ├── authentication/
    │   ├── credentials.json
    │   └── token.json
    ├── config/
    ├── tests/
    │   └── email-verification.test.js
    └── README.md
    ```
    Place the `credentials.json` and `token.json` files in the `authentication` folder.

## Writing and Running the Test

1. **Test File Example**  
    Below is an example test that verifies if the "Forget Password" email is sent to the requested email address:
    ```javascript
    const { test, expect } = require('@playwright/test');
    const gmailTester = require('gmail-tester');
    const path = require('path');

    test('To verify the Forget Password email is sent to the requested email address', async ({ page }) => {
        await page.goto('https://devmarket.realworld.fi/forgot-password');
        await page.fill('input[placeholder="Ex: johnabraham@mail.com."]', 'your-email@gmail.com');
        await page.click('//button[@type="submit"]');

        // Waiting for the email to be received
        const email = await gmailTester.check_inbox(
            path.resolve(__dirname, '../authentication/credentials.json'),
            path.resolve(__dirname, '../authentication/token.json'),
            {
                subject: "Forget Password",
                from: 'test2412spark@gmail.com',
                to: 'your-email@gmail.com',
            }
        );

        expect(email[0].subject).toBe('Forget Password');
    });
    ```

    Replace `'your-email@gmail.com'` with the email address you used to generate the authentication credentials.

2. **Running the Test**
    Run the test using Playwright's command line interface:
    ```bash
    npx playwright test
    ```

## Conclusion
This setup provides a reliable method to automate and verify email functionalities in your application. By implementing these tests, you can save time on manual verifications and ensure that your email integration works seamlessly.

## Important Notes
- Ensure that sensitive data such as `credentials.json` and `token.json` is not committed to your repository. Use `.gitignore` to prevent these files from being tracked.
- Manage OAuth tokens securely, especially when dealing with production environments.

