const { requestHeaders } = require('./headers')
const { APIroutes } = require('./routes')

export const AuthService = (request) => {
  const createAccount = async (credentials) => {
    const response = await request.post(APIroutes.CreateAccount, {
      data: credentials
    })
    return response
  }

  const login = async (credentials) => {
    const response = await request.post(APIroutes.Login, {
      headers: requestHeaders.LogIn,
      data: credentials
    })
    return response
  }
  return {
    createAccount,
    login
  }
}
