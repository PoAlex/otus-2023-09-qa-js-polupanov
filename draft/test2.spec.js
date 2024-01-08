import { test, expect } from '@playwright/test';

// test.use({ locale: 'ru-RU' });
test.use({ locale: 'en-US' });

test.describe.configure({ mode: 'serial' });

test.describe('Тестируем Vikunja', async () => {
  let page;
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.describe('Форма регистрации пользователя', async () => {
    test.slow();
    test('Проверка регистрации без ввода данных', async () => {
      await test.step('Step', async () => {
        await page.goto('https://try.vikunja.io/login');
        await page.getByRole('link', { name: 'Create account' }).click();
      }, { box: true });
      await test.step('Expected result', async () => {
        await expect(page.getByTestId('register-submit')).toBeDisabled();
      }, { box: true });
    });

    test.skip('Регистрация пользователя', async () => {
      await page.getByTestId('username').fill('Alex_Po');
      await page.getByTestId('email').fill('alex_po@po.com');
      await page.getByTestId('password').fill('Test_12345');
      await page.getByTestId('register-submit').click();

      await expect(page.getByRole('button', { name: 'Alex_Po' })).toBeVisible();
    });
  });

  test.describe('Авторизация. Негативные тесты', async () => {
    test.slow();
    test('Негативный тест. Авторизация без ввода данных', async () => {
      await page.goto('https://try.vikunja.io/login');
      // await page.getByRole('button', { name: 'Login' }).click();
      await page.locator('//button[normalize-space()=\'Login\']').click();

      await test.step('Проверка валидации полей ввода данных', async () => {
        await expect(page.getByTestId('loginform')).toContainText('Please provide a username.');
        await expect(page.getByTestId('loginform')).toContainText('Please provide a password.');
      }, { box: true });
    });
    test('Негативный тест. Неверный логин или пароль', async () => {
      await page.getByTestId('username').fill('Alex_Po');
      await page.getByTestId('password').fill('Test_123');
      await page.locator('[tabindex=\'4\'][type=\'button\']').click();

      await test.step('Проверка валидации', async () => {
        await expect(page.getByTestId('app')).toContainText('Wrong username or password.');
      }, { box: true });
    });
  });

  test.describe('Позитивный тест', async () => {
    test.slow();
    test('Авторизация', async () => {
      await page.goto('https://try.vikunja.io/login');
      await page.getByTestId('username').fill('Alex_Po');
      await page.getByTestId('password').fill('Test_12345');
      // await page.getByRole('button', { name: 'Login' }).click();
      await page.locator('[tabindex=\'4\'][type=\'button\']').click();

      await test.step('Проверка входа в систему', async () => {
        await expect(page.getByRole('button', { name: 'Alex_Po' })).toBeVisible();
      }, { box: true });
    });

    test.skip('Проверка главного меню', async () => {
      await page.getByRole('link', { name: 'Upcoming' }).click();
      await expect(page.getByRole('main')).toContainText(/Tasks from/);
    });

    test('Добавление задачи', async () => {
      // await page.getByPlaceholder('Add a new task…').click();
      await page.getByRole('link', { name: 'Overview' }).click();
      await page.getByPlaceholder('Add a new task…').fill('Task-1');
      await page.getByLabel('Add').click();
      await page.getByPlaceholder('Add a new task…').fill('Task-2');
      await page.getByLabel('Add').click();
      await page.getByPlaceholder('Add a new task…').fill('Task-3');
      await page.keyboard.press('Enter');

      await page.locator('div').filter({ hasText: /^InboxTask-1$/ }).getByRole('img').click();
      await expect(page.locator('body')).toContainText('The task was successfully marked as done.');

      await page.locator('div').filter({ hasText: /^InboxTask-2$/ }).getByRole('img').click();
      await expect(page.locator('body')).toContainText('The task was successfully marked as done.');

      await page.locator('div').filter({ hasText: /^InboxTask-3$/ }).getByRole('img').click();
      await expect(page.locator('body')).toContainText('The task was successfully marked as done.');

      // locator('div').filter({ hasText: /^InboxTask-1$/ }).nth(1)
      // locator('div').filter({ hasText: /^InboxTask-4$/ }).nth(1)
    });
  });
});
// step - expected result
