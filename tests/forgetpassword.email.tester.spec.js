// Import necessary modules from Playwright and Gmail-Tester
const { test, expect } = require('@playwright/test');
const gmailTester = require('gmail-tester');
const path = require('path');

// Define the test case
test('Verify that the Forget Password email is sent to the requested email address.', async ({ page }) => {

    // Navigate to the Forget Password page
    await page.goto('https://devmarket.realworld.fi/forgot-password');

    // Fill the email input field with the requested email address
    await page.fill('input[placeholder="Ex: johnabraham@mail.com."]', 'sarumathivasu7@gmail.com');

    // Click the submit button to trigger the Forget Password email
    await page.click('//button[@type="submit"]');

    // Wait and check the Gmail inbox for the Forget Password email
    const email = await gmailTester.check_inbox(
        path.resolve(__dirname, '../authentication/credentials.json'), // Path to credentials.json
        path.resolve(__dirname, '../authentication/token.json'), // Path to token.json
        {
            subject: "Forget Password", // Subject of the email to search for
            from: 'test2412spark@gmail.com', // Sender email address
            to: 'sarumathivasu7@gmail.com', // Recipient email address
        }
    );

    // Verify that the first email in the inbox has the expected subject
    expect(email[0].subject).toBe('Forget Password');
});
