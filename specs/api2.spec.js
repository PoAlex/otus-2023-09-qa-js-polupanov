const { test, expect } = require('@playwright/test')
const { APIroutes } = require('../framework/services/routes')
const { requestData } = require('../framework/services/data')
// const { requestHeaders } = require('../framework/services/headers')

test('Creates a new user account', async ({ request }) => {
  const response = await request.post(APIroutes.CreateAccount, {
    data: requestData.CreateAccountData
  })
  expect(response.status()).toBe(200)
})

test.describe('API tests', async () => {
  test('Logs a user in', async ({ request }) => {
    const response = await request.post(APIroutes.Login, {
      headers: {
        Accept: 'application/json'
      },
      data: requestData.LoginData
    })
    expect(response.status()).toBe(200)
    const responseBody = await response.json()
    process.env.TOKEN = responseBody.token
    console.log(response.status())
  })

  test('Requests the deletion of the current user', async ({ request }) => {
    const response = await request.post(APIroutes.DeleteCurentUser, {
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`
      },
      data: requestData.DeleteCurentUserData
    })
    const responseBody = await response.json()
    try {
      expect(response.status()).toBe(200)
      console.log(response.status() + ' ' + response.statusText())
    } catch (error) {
      console.log(response.status() + ' ' + responseBody.message)
    }
  })

  test('Get user information', async ({ request }, testInfo) => {
    const response = await request.get('https://try.vikunja.io/api/v1/user', {
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`
      }
    })
    const responseBody = await response.json()
    try {
      expect(response.status()).toBe(200)
      console.log(response.status() + ' ' + response.statusText())
    } catch (error) {
      console.log(response.status() + ' ' + responseBody.message)
    }
  })
})
