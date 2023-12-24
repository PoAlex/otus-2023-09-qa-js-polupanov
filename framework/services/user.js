const { APIroutes } = require('./routes')

export const UserService = (request) => {
  const getUserInfo = async () => {
    const response = await request.get(APIroutes.GetUserInfo, {
      headers: {
        Accept: 'application/json',
        // Authorization: `${process.env.TOKEN}`
        Authorization: `Bearer ${process.env.TOKEN}`
      }
    })
    return response
  }
  // return { getUserInfo }

  const deleteCurentUser = async (password) => {
    const response = await request.post(APIroutes.DeleteCurentUser, {
      headers: {
        Accept: 'application/json',
        // Authorization: `${process.env.TOKEN}`
        Authorization: `Bearer ${process.env.TOKEN}`
      },
      data: password
    })
    return response
  }

  const confirmDeleteCurentUser = async (token) => {
    const response = await request.post(APIroutes.ConfirmDeleteCurentUser, {
      headers: {
        Accept: 'application/json',
        // Authorization: `${process.env.TOKEN}`
        Authorization: `Bearer ${process.env.TOKEN}`
      },
      data: { token: `${process.env.TOKEN}` }
      // data: token
    })
    return response
  }

  return {
    getUserInfo,
    deleteCurentUser,
    confirmDeleteCurentUser
  }
}
