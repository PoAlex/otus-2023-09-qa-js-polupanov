const allBook = require('../../books.json')

const element = []

function listIsbn () {
  for (let i = 0; i < allBook.books.length; i++) {
    element.push(allBook.books[i].isbn)
  }
  return element
}

module.exports = listIsbn()
// console.log(element)
// export default element
