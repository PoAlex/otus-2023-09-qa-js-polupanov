import { test, expect } from '@playwright/test';

test.skip('Регистрация пользователя', async ({ page }) => {
  await page.goto('https://try.vikunja.io/login');
  await page.getByRole('link', { name: 'Create account' }).click();
  await page.getByTestId('username').fill('Alex_Po');
  await page.getByTestId('email').fill('alex_po@po.com');
  await page.getByTestId('password').fill('Test_12345');
  await page.getByTestId('register-submit').click();

  await expect(page.getByRole('button', { name: 'Alex_Po' })).toBeVisible();
});
