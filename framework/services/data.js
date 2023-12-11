/** Body для запросов */

const { config } = require('../config/config')

export const requestData = {
  // BookStore
  Data: {
    userName: `${config.credentials.userName}`,
    password: `${config.credentials.password}`
  },
  addBooks: {
    userId: `${config.userID}`,
    collectionOfIsbns: [
      {
        isbn: '9781449325862'
      }
    ]
  },
  Params: {
    ISBN: '9781449325862'
  },
  deleteBookData: {
    isbn: '9781449325862',
    userId: '1fc24928-f9ae-4abb-8ab5-013da37f0bc5'
  }
}
