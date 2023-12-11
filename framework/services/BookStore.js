const { APIroutes } = require('./routes')
const { config } = require('../config/config')

export const BookStore = (request) => {
  const generateToken = async (body) => {
    const response = await request.post(APIroutes.GenerateToken, {
      data: body
    })
    return response
  }

  const authorized = async (body) => {
    const response = await request.post(APIroutes.Authorized, {
      data: body
    })
    return response
  }

  const addBooks = async (body) => {
    const response = await request.post(APIroutes.Books, {
      headers: { Authorization: `${config.token}` },
      data: body
    })
    return response
  }

  const bookInfo = async (param) => {
    const response = await request.get(APIroutes.Book, {
      headers: { Authorization: `${config.token}` },
      params: param
    })
    return response
  }

  const deleteBook = async (body) => {
    const response = await request.delete(APIroutes.Book, {
      headers: { Authorization: `${config.token}` },
      data: body
    })
    return response
  }

  // const user

  return { generateToken, authorized, addBooks, bookInfo, deleteBook }
}
