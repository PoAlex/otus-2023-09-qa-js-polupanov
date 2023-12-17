const { test, expect } = require('@playwright/test')
const { BookStore } = require('../../framework/services/BookStore')
const { requestData } = require('../../framework/services/data')
const { safeToken } = require('../../framework/fixtures/safeToken')
const isbns = require('../../framework/fixtures/getISBN')

/** Регистрация нового пользователя. Из ответа забираем userID
test('User', async ({ request }) => {
  const response = await request.post('https://bookstore.demoqa.com/Account/v1/User', {
    data: {
      userName: 'TestUser2',
      password: 'TestUser_12345!'
    }
  })
  expect(response.status()).toBe(201)
  console.log(await response.json())

  const responseBody = await response.json()
  config.userID = responseBody.userId
})
 */

test.describe.configure({ mode: 'serial' })

test.describe('BookStore', async () => {
  test.beforeAll('GenerateToken', async ({ request }) => {
    const bookStore = BookStore(request)
    const response = await bookStore.generateToken()

    expect(response.status()).toBe(200)

    safeToken(response)
  })

  test('Authorized', async ({ request }) => {
    const bookStore = BookStore(request)
    const response = await bookStore.authorized(requestData.Data)

    expect(response.status()).toBe(200)
    console.log(await response.json())
  })

  for (const isbn of isbns) {
    test(`Add books ${isbn}`, async ({ request }) => {
      const bookStore = BookStore(request)
      const response = await bookStore.addBooks(isbn)

      expect(response.status()).toBe(201)
      console.log(await response.json())
    })
  }

  for (const isbn of isbns) {
    test(`GetBookInfo ${isbn}`, async ({ request }) => {
      const bookStore = BookStore(request)
      const response = await bookStore.bookInfo(isbn)

      expect(response.status()).toBe(200)
      console.log(await response.json())
    })
  }

  for (const isbn of isbns) {
    test(`Delete book ${isbn}`, async ({ request }) => {
      const bookStore = BookStore(request)
      const response = await bookStore.deleteBook(isbn)

      expect(response.status()).toBe(204)
      console.log(await response.headers())
    })
  }
})
