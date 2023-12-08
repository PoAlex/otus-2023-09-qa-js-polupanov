const { test, expect } = require('@playwright/test')
const { requestData } = require('../framework/services/data')
const { safeToken } = require('../framework/fixtures/safeToken')
const { AuthService } = require('../framework/services/auth')
const { UserService } = require('../framework/services/user')

test.describe.configure({ mode: 'serial' })

test.describe('', async () => {
  test.skip('Creates a new user account', async ({ request }) => {
    const authService = AuthService(request)
    const response = await authService.createAccount(requestData.CreateAccountData)

    expect(response.status()).toBe(200)
  })

  test('Logs a user in', async ({ request }) => {
    const authService = AuthService(request)
    const response = await authService.login(requestData.LoginData)
    safeToken(response)

    expect(response.status()).toBe(200)
  })

  test('Get user information', async ({ request }) => {
    const userService = UserService(request)
    const response = await userService.getUserInfo()

    expect(response.status()).toBe(200)

    const responseBody = await response.json()
    console.log(responseBody)
  })

  test('Request the deletion of the user', async ({ request }) => {
    const userService = UserService(request)
    const response = await userService.deleteCurentUser(requestData.DeleteCurentUserData)

    expect(response.status()).toBe(200)
  })

  test('Confirm a user deletion request', async ({ request }) => {
    const userService = UserService(request)
    const response = await userService.confirmDeleteCurentUser(requestData.ConfirmDeleteCurentUserData)

    expect(response.status()).toBe(200)
  })
})
