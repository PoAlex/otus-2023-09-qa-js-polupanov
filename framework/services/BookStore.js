const { APIroutes } = require('./routes')

export const BookStore = (request) => {
  const generateToken = async ({ userName, password }) => {
    const response = await request.post(APIroutes.GenerateToken, {
      data: { userName, password }
    })
    return response
  }

  const authorized = async ({ userName, password }) => {
    const response = await request.post(APIroutes.Authorized, {
      data: { userName, password }
    })
    return response
  }

  const addBooks = async (isbn, token, userID) => {
    const response = await request.post(APIroutes.Books, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        userId: `${userID}`,
        collectionOfIsbns: [
          {
            isbn: `${isbn}`
          }
        ]
      }
    })
    return response
  }

  const bookInfo = async (isbn, token) => {
    const response = await request.get(APIroutes.Book, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        ISBN: `${isbn}`
      }
    })
    return response
  }

  const deleteBook = async (isbn, token, userID) => {
    const response = await request.delete(APIroutes.Book, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        isbn: `${isbn}`,
        userId: `${userID}`
      }
    })
    return response
  }

  return { generateToken, authorized, addBooks, bookInfo, deleteBook }
}
