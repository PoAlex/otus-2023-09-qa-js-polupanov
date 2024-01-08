import { test, expect } from '@playwright/test';

test('Проверка регистрации без ввода данных', async ({ page }) => {
  await test.step('Step', async () => {
    await page.goto('https://try.vikunja.io/login');
    await page.getByRole('link', { name: 'Create account' }).click();
  }, { box: true });

  await test.step('Кнопка регистрации не активна', async () => {
    await expect(page.getByTestId('register-submit')).toBeDisabled();
  }, { box: true });
});

test('Негативный тест. Авторизация без ввода данных', async ({ page }) => {
  await test.step('Step', async () => {
    await page.goto('https://try.vikunja.io/login');
    await page.getByRole('button', { name: 'Login' }).click();
  }, { box: true });

  await test.step('Проверка валидации полей ввода данных', async () => {
    await expect(page.getByTestId('loginform')).toContainText('Please provide a username.');
    await expect(page.getByTestId('loginform')).toContainText('Please provide a password.');
  }, { box: true });
});

test('Негативный тест. Неверный логин или пароль', async ({ page }) => {
  await test.step('Step', async () => {
    await page.goto('https://try.vikunja.io/login');
    await page.getByTestId('username').fill('Alex_Po');
    await page.getByTestId('password').fill('Test_123');
    await page.getByRole('button', { name: 'Login' }).click();
  }, { box: true });

  await test.step('Проверка валидации', async () => {
    await expect(page.getByTestId('app')).toContainText('Wrong username or password.');
  }, { box: true });
});
