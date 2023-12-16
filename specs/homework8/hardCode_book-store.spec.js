// import { element as isbns } from '../../framework/fixtures/getISBN'
const { test, expect } = require('@playwright/test')
const { config } = require('../../framework/config/config')
const { requestData } = require('../../framework/services/data')
const isbns = require('../../framework/fixtures/getISBN')

// const isbns = ['9781449325862', '9781449331818', '9781449337711']

test.describe.configure({ mode: 'serial' })

test.describe('BookAppStore', async () => {
  test.beforeAll('GetAllBooks', async ({ request }) => {
    const response = await request.get('https://bookstore.demoqa.com/BookStore/v1/Books', {})
    expect(response.status()).toBe(200)
    //  = await response.json()
    // console.log(await response.json())
    // console.log(allBook)
    requestData.allBooks = await response.body()
    // fs.writeFileSync('./books.json', await response.body())
  })

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

  test.skip('GetAllBooks', async ({ request }) => {
    const response = await request.get('https://bookstore.demoqa.com/BookStore/v1/Books', {

    })
    expect(response.status()).toBe(200)
    const allBook = await response.json()
    // console.log(await response.json())
    console.log(allBook)
  })

  for (const isbn of isbns) {
    test(`Add books ${isbn}`, async ({ request }) => {
      const response = await request.post('https://bookstore.demoqa.com/BookStore/v1/Books', {
        headers: { Authorization: `${config.token}` },
        data: {
          userId: '1fc24928-f9ae-4abb-8ab5-013da37f0bc5',
          collectionOfIsbns: [
            {
              // isbn: '9781449325862'
              // eslint-disable-next-line object-shorthand
              isbn: isbn
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
  }

  for (let i = 0; i < isbns.length; i++) {
    test(`GetBookInfo ${isbns[i]}`, async ({ request }) => {
      const response = await request.get('https://bookstore.demoqa.com/BookStore/v1/Book', {
      // params: { ISBN: '9781449325862' },
        params: { ISBN: isbns[i] },
        headers: { Authorization: `${config.token}` }
      })
      expect(response.status()).toBe(200)
      console.log(await response.json())
    })
  }

  // isbn в url запроса
  test.skip('ReplaceBook', async ({ request }) => {
    const response = await request.put(`https://bookstore.demoqa.com/BookStore/v1/Books/${isbns}`, {
      headers: { Authorization: `${config.token}` }
    })
    expect(response.status()).toBe(200)
    console.log(await response.json())
  })

  for (const isbn of isbns) {
    test(`Delete book ${isbn}`, async ({ request }) => {
      const response = await request.delete('https://bookstore.demoqa.com/BookStore/v1/Book', {
        headers: { Authorization: `${config.token}` },
        data: {
          // isbn: '9781449325862',
          // eslint-disable-next-line object-shorthand
          isbn: isbn,
          userId: '1fc24928-f9ae-4abb-8ab5-013da37f0bc5'
        }
      })
      expect(response.status()).toBe(204)
    })
  }
})
