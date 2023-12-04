/** Функция сохранения токена */

export const safeToken = async (response) => {
  const responseBody = await response.json()
  process.env.TOKEN = 'Bearer ' + responseBody.token
}
