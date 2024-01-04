import { test, expect } from '@playwright/test';

test.afterEach(async ({ page }, testInfo) => {
  console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);

  if (testInfo.status !== testInfo.expectedStatus) { console.log(`Did not run as expected, ended up at ${page.url()}`); }
});

test('Авторизация', async ({ page }) => {
  await test.step('Негативный тест. Автроризация без ввода данных', async () => {
    await page.goto('https://try.vikunja.io/login');
    // await page.getByRole('button', { name: 'Login' }).click();
    await page.locator('//button[normalize-space()=\'Login\']').click();

    await expect(page.getByTestId('loginform')).toContainText('Please provide a username.');
    await expect(page.getByTestId('loginform')).toContainText('Please provide a password.');
  }, { box: true });

  await test.step('Негативный тест. Неверный логин или пароль', async () => {
    await page.getByTestId('username').fill('Alex_Po');
    await page.getByTestId('password').fill('Test_123');
    await page.locator('[tabindex=\'4\'][type=\'button\']').click();

    await expect(page.getByTestId('app')).toContainText('Wrong username or password.');
  }, { box: true });

  await test.step('Actions', async () => {
    // await page.goto('https://try.vikunja.io/login');
    await page.getByTestId('username').fill('Alex_Po');
    await page.getByTestId('password').fill('Test_12345');
    // await page.getByRole('button', { name: 'Login' }).click();
    await page.locator('[tabindex=\'4\'][type=\'button\']').click();
  }, { box: true });

  await test.step('Check', async () => {
    await expect(page.getByRole('heading', { name: 'Доброй ночи, Alex_Po!' })).toBeVisible();
  }, { box: true });
});

test('Проверка главного меню', async ({ page }) => {
  await page.getByRole('link', { name: 'Предстоящие задачи' }).click();
  await expect(page.getByRole('main')).toContainText('Задачи с ');
});
