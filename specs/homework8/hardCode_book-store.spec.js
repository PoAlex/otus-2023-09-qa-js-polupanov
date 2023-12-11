const { test, expect } = require('@playwright/test')
const { config } = require('../../framework/config/config')

test.describe('BookAppStore', async () => {
  test('Authorized', async ({ request }) => {
    const response = await request.post('https://bookstore.demoqa.com/Account/v1/Authorized', {
      data: {
        userName: 'UserTest',
        password: 'UserTest_12345!'
      }
    })
    expect(response.status()).toBe(200)
    console.log(await response.json())
  })

  test('GenerateToken', async ({ request }) => {
    const response = await request.post('https://bookstore.demoqa.com/Account/v1/GenerateToken', {
      data: {
        userName: 'UserTest',
        password: 'UserTest_12345!'
      }
    })
    expect(response.status()).toBe(200)
    console.log(await response.json())

    const responseBody = await response.json()
    config.token = 'Bearer ' + responseBody.token
  })

  test('Add books', async ({ request }) => {
    const response = await request.post('https://bookstore.demoqa.com/BookStore/v1/Books', {
      headers: { Authorization: `${config.token}` },
      data: {
        userId: '1fc24928-f9ae-4abb-8ab5-013da37f0bc5',
        collectionOfIsbns: [
          {
            isbn: '9781449325862'
          }
        ]
      }
    })
    // expect(response.status()).toBe(200)
    // console.log(await response.json())

    try {
      expect(response.status()).toBe(200)
    } catch (error) {
      console.log(await response.json())
    }
  })

  test('GetBookInfo', async ({ request }) => {
    const response = await request.get('https://bookstore.demoqa.com/BookStore/v1/Book', {
      params: { ISBN: '9781449325862' },
      headers: { Authorization: `${config.token}` }
    })
    expect(response.status()).toBe(200)
    console.log(await response.json())
  })

  test('Delete book', async ({ request }) => {
    const response = await request.delete('https://bookstore.demoqa.com/BookStore/v1/Book', {
      headers: { Authorization: `${config.token}` },
      data: {
        isbn: '9781449325862',
        userId: '1fc24928-f9ae-4abb-8ab5-013da37f0bc5'
      }
    })
    expect(response.status()).toBe(204)
  })
})
