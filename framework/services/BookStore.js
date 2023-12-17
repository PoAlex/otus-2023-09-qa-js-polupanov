const { APIroutes } = require('./routes')
const { config } = require('../config/config')

export const BookStore = (request) => {
  const generateToken = async (userName, password) => {
    const response = await request.post(APIroutes.GenerateToken, {
      data: {
        userName: `${config.credentials.userName}`,
        password: `${config.credentials.password}`
      }
    })
    return response
  }

  const authorized = async (userName, password) => {
    const response = await request.post(APIroutes.Authorized, {
      data: {
        userName: `${config.credentials.userName}`,
        password: `${config.credentials.password}`
      }
    })
    return response
  }

  // const addBooks = async (body) => {
  //   const response = await request.post(APIroutes.Books, {
  //     headers: { Authorization: `${config.token}` },
  //     data: body
  //   })
  //   return response
  // }

  const addBooks = async (isbn) => {
    const response = await request.post(APIroutes.Books, {
      headers: { Authorization: `${config.token}` },
      data: {
        userId: `${config.userID}`,
        collectionOfIsbns: [
          {
            isbn: `${isbn}`
          }
        ]
      }
    })
    return response
  }

  const bookInfo = async (isbn) => {
    const response = await request.get(APIroutes.Book, {
      headers: { Authorization: `${config.token}` },
      params: {
        ISBN: `${isbn}`
      }
    })
    return response
  }

  const deleteBook = async (isbn) => {
    const response = await request.delete(APIroutes.Book, {
      headers: { Authorization: `${config.token}` },
      data: {
        isbn: `${isbn}`,
        userId: '1fc24928-f9ae-4abb-8ab5-013da37f0bc5'
      }
    })
    return response
  }

  // const user

  return { generateToken, authorized, addBooks, bookInfo, deleteBook }
}
