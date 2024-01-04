import { test, expect } from '@playwright/test';

// const page = await browser.newPage();

test('Авторизация', async ({ page }) => {
  await test.step('Негативный тест', async () => {
    await page.goto('https://try.vikunja.io/login');
    // await page.getByRole('button', { name: 'Login' }).click();
    await page.locator('//button[normalize-space()=\'Login\']').click();

    await expect(page.getByTestId('loginform')).toContainText('Please provide a username.');
    await expect(page.getByTestId('loginform')).toContainText('Please provide a password.');
  });
  await test.step('Actions', async () => {
    // await page.goto('https://try.vikunja.io/login');
    await page.getByTestId('username').click();
    await page.getByTestId('username').fill('Alex_Po');
    await page.getByTestId('username').press('Tab');
    await page.getByTestId('password').fill('Test_12345');
    // await page.getByRole('button', { name: 'Login' }).click();
    await page.locator('[tabindex=\'4\'][type=\'button\']').click();
  });
  await test.step('Check', async () => {
    await expect(page.getByRole('heading', { name: 'Доброй ночи, Alex_Po!' })).toBeVisible();
  });
});

test('Проверка главного меню', async ({ page }) => {
  await page.getByRole('link', { name: 'Предстоящие задачи' }).click();
  await expect(page.getByRole('main')).toContainText('Задачи с ');
});
