/* eslint-disable max-len */
import { test, expect } from '@playwright/test';

let page;

test.beforeEach('Авторизация пользователя', async ({ browser }) => {
  page = await browser.newPage();
  test.step('Step', async () => {
    await page.goto('https://try.vikunja.io/login');
    await page.getByTestId('username').fill('Alex_Po');
    await page.getByTestId('password').fill('Test_12345');
    await page.getByRole('button', { name: 'Login' }).click();
  }, { box: true });

  await test.step('Проверка входа в систему', async () => {
    await expect(page.getByRole('button', { name: 'Alex_Po' })).toBeVisible();
    await expect(page.getByText('Overview Upcoming Projects Labels TeamsInboxPowered by Vikunja')).toBeVisible();
  }, { box: true });
});

test.afterEach('Выход из системы', async () => {
  await page.getByRole('button', { name: 'Alex_Po' }).click();
  await page.getByRole('button', { name: 'Logout' }).click();

  await expect(page.getByRole('heading', { name: 'Welcome Back!' })).toBeVisible();
});

test('Завершение задачи из общего интерфейса', async () => {
  await page.getByRole('link', { name: 'Overview' }).click();

  await page.locator('div').filter({ hasText: /^InboxTask-1$/ }).getByRole('img').click();
  await test.step('Задача завершена', async () => {
    await expect(page.locator('body')).toContainText('The task was successfully marked as done.');
  }, { box: true });
});

test('Завершение задачи из задачи', async () => {
  await page.getByRole('link', { name: 'Task-' }).first().click();
  await page.getByRole('button', { name: 'Mark task done!' }).click();
  await test.step('Задача завершена', async () => {
    await expect(page.getByText('Done', { exact: true })).toBeVisible();
  }, { box: true });
});
