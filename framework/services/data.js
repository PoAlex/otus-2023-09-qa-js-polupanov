/** Body для запросов */

export const requestData = {
  CreateAccountData: {
    email: `${process.env.EMAIL}`,
    id: 0,
    password: `${process.env.PASSWORD}`,
    username: `${process.env.USERNAME}`
  },
  LoginData: {
    long_token: true,
    password: `${process.env.PASSWORD}`,
    totp_passcode: '',
    username: `${process.env.USERNAME}`
  },
  DeleteCurentUserData: {
    password: `${process.env.PASSWORD}`
  }
}
