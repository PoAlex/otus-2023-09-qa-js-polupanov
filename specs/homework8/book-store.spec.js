const { test, expect } = require('@playwright/test')
const { BookStore } = require('../../framework/services/BookStore')
const isbns = require('../../framework/fixtures/getISBN')
const { config } = require('../../framework/config/config')

const userID = config.credentials.userID
const user = config.credentials.user

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
  let token
  test.beforeAll('GenerateToken', async ({ request }) => {
    const bookStore = BookStore(request)
    const response = await bookStore.generateToken(user)

    expect(response.status()).toBe(200)
    const responseBody = await response.json()
    token = responseBody.token
  })
  test('Authorized', async ({ request }) => {
    const bookStore = BookStore(request)
    const response = await bookStore.authorized(user)

    expect(response.status()).toBe(200)
    console.log(await response.json())
  })

  for (const isbn of isbns) {
    test(`Add books ${isbn}`, async ({ request }) => {
      const bookStore = BookStore(request)
      const response = await bookStore.addBooks(isbn, token, userID)

      expect(response.status()).toBe(201)
      console.log(await response.json())
    })
  }

  for (const isbn of isbns) {
    test(`GetBookInfo ${isbn}`, async ({ request }) => {
      const bookStore = BookStore(request)
      const response = await bookStore.bookInfo(isbn, token)

      expect(response.status()).toBe(200)
      console.log(await response.json())
    })
  }

  for (const isbn of isbns) {
    test(`Delete book ${isbn}`, async ({ request }) => {
      const bookStore = BookStore(request)
      const response = await bookStore.deleteBook(isbn, token, userID)

      expect(response.status()).toBe(204)
      console.log(await response.headers())
    })
  }
})
