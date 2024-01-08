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

test('Добавление задач', async () => {
  await page.getByRole('link', { name: 'Overview' }).click();

  await page.getByPlaceholder('Add a new task…').fill('Task-1');
  await page.getByLabel('Add').click();
  await test.step('Новая задача \'Task-1\' появилась в списке', async () => {
    await expect(page.getByRole('main')).toContainText('Task-1');
  }, { box: true });

  await page.getByPlaceholder('Add a new task…').fill('Task-2');
  await page.getByLabel('Add').click();
  await test.step('Новая задача \'Task-2\' появилась в списке', async () => {
    await expect(page.getByRole('main')).toContainText('Task-2');
  }, { box: true });
});
