/** Функция сохранения токена */

const { config } = require('../config/config')

const safeToken = async (response) => {
  const responseBody = await response.json()
  // process.env.TOKEN = responseBody.token
  config.token = 'Bearer ' + responseBody.token
}

module.exports = { safeToken }
