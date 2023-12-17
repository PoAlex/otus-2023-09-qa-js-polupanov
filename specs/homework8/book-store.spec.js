const { test, expect } = require('@playwright/test')
const { BookStore } = require('../../framework/services/BookStore')
const { requestData } = require('../../framework/services/data')
// const { config } = require('../../framework/config/config')
const { safeToken } = require('../../framework/fixtures/safeToken')

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
    const response = await bookStore.generateToken(requestData.Data)

    expect(response.status()).toBe(200)

    safeToken(response)
  })

  test('Authorized', async ({ request }) => {
    const bookStore = BookStore(request)
    const response = await bookStore.authorized(requestData.Data)

    expect(response.status()).toBe(200)
    console.log(await response.json())
  })

  test('Add books', async ({ request }) => {
    const bookStore = BookStore(request)
    const response = await bookStore.addBooks(requestData.addBooks)

    try {
      expect(response.status()).toBe(201)
      console.log(await response.json())
    } catch (error) {
      console.log(await response.json())
    }
  })

  test('GetBookInfo', async ({ request }) => {
    const bookStore = BookStore(request)
    const response = await bookStore.bookInfo(requestData.Params)

    expect(response.status()).toBe(200)
    console.log(await response.json())
  })

  test('Delete book', async ({ request }) => {
    const bookStore = BookStore(request)
    const response = await bookStore.deleteBook(requestData.deleteBookData)

    expect(response.status()).toBe(204)
    console.log(await response.headers())
  })
})
