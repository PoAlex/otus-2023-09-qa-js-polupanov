const { test, expect } = require('@playwright/test')
const { APIroutes } = require('../framework/services/routes')
const { requestData } = require('../framework/services/data')
const { safeToken } = require('../framework/fixtures/safeToken')
const { requestHeaders } = require('../framework/services/headers')

test.skip('Creates a new user account', async ({ request }) => {
  const response = await request.post(APIroutes.CreateAccount, {
    data: requestData.CreateAccountData
  })
  expect(response.status()).toBe(200)
})

test.describe('API tests', async () => {
  test('Logs a user in', async ({ request }) => {
    await test.step('Send request', async () => {
      const response = await request.post(APIroutes.Login, {
        headers: requestHeaders.LogIn,
        data: requestData.LoginData
      })
      expect(response.status()).toBe(200)
      safeToken(response)
    })
  })

  test('Get user information', async ({ request }) => {
    const response = await request.get(APIroutes.GetUserInfo, {
      headers: {
        Accept: 'application/json',
        Authorization: `${process.env.TOKEN}`
      }
    })
    expect(response.status()).toBe(200)
  })

  test('Requests the deletion of the current user', async ({ request }) => {
    const response = await request.post(APIroutes.DeleteCurentUser, {
      headers: {
        Accept: 'application/json',
        Authorization: `${process.env.TOKEN}`
      },
      data: requestData.DeleteCurentUserData
    })
    expect(response.status()).toBe(200)
  })
})
