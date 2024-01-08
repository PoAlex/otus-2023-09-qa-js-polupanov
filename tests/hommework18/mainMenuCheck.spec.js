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

test('Проверка главного меню', async () => {
  await test.step('Проверка скрытия/раскрытия меню', async () => {
    await page.getByLabel('Hide the menu').click();
    await expect(page.getByText('Overview Upcoming Projects Labels TeamsInboxPowered by Vikunja')).toHaveClass('menu-container d-print-none');
    await page.getByLabel('Show the menu').click();
    await expect(page.getByText('Overview Upcoming Projects Labels TeamsInboxPowered by Vikunja')).toBeVisible();
  }, { box: true });
});

test('Проверка пунктов главного меню', async () => {
  await test.step('Пункт \'Overview\'', async () => {
    await page.getByRole('link', { name: 'Overview' }).click();
    await expect(page.getByPlaceholder('Add a new task…')).toBeVisible();
  }, { box: true });
  await test.step('Пункт \'Upcoming\'', async () => {
    await page.getByRole('link', { name: 'Upcoming' }).click();
    await expect(page.getByRole('main')).toContainText(/Tasks from/);
  }, { box: true });
  await test.step('Пункт \'Projects\'', async () => {
    await page.getByRole('link', { name: 'Projects' }).click();
    await expect(page.locator('div').filter({ hasText: /^Show Archived$/ })).toBeVisible();
    await expect(page.getByRole('link', { name: 'New Saved Filter' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'New project' })).toBeVisible();
  }, { box: true });
  await test.step('Пункт \'Labels\'', async () => {
    await page.getByRole('link', { name: 'Labels' }).click();
    await expect(page.getByRole('heading')).toContainText('Manage labels');
    await expect(page.getByRole('link', { name: 'New label', exact: true })).toBeVisible();
  }, { box: true });
  await test.step('Пункт \'Teams\'', async () => {
    await page.getByRole('link', { name: 'Teams' }).click();
    await expect(page.getByRole('heading')).toContainText('Teams');
    await expect(page.getByRole('link', { name: 'Create a new team', exact: true })).toBeVisible();
  }, { box: true });
});
