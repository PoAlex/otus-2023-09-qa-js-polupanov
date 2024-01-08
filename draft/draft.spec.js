import { test } from '@playwright/test';

test.afterEach(async ({ page }, testInfo) => {
  console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);

  if (testInfo.status !== testInfo.expectedStatus) { console.log(`Did not run as expected, ended up at ${page.url()}`); }
});

test('TestCSSselector', async ({ page }) => {
  test.setTimeout(60000);
  await page.goto('https://demoqa.com/webtables');
  const row = page.getByRole('row').filter({ hasText: 'Cantrell' }); // .and(page.locator('#delete-record-2')).click();
  const checkbox = page.getByRole('row', { has: row }).getByTestId('delete-record-2');
  await checkbox.click();

  const count = await page.getByRole('rowgroup').filter({ hasText: 'Gentry' });
  console.log(count);
  const count1 = await page.getByRole('rowgroup').filter({ hasText: 'Vega' });
  console.log(count1);
});
