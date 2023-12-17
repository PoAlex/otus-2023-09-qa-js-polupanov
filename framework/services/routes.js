/** API роуты */

const { config } = require('../config/config')

const url = config.url

const APIroutes = {
  // BookStore
  User: `${url}`,
  Authorized: `${url}/Account/v1/Authorized`,
  GenerateToken: `${url}/Account/v1/GenerateToken`,
  Books: `${url}/BookStore/v1/Books`,
  Book: `${url}/BookStore/v1/Book`
}

module.exports = { APIroutes }
