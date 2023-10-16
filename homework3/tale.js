function kolobok(namePerson1) {
  switch (namePerson1) {
    case "дедушка":
      console.log("Я от дедушки ушел");
      break;
    case "заяц":
      console.log("Я от зайца ушел");
      break;
    case "лиса":
      console.log("Меня съели");
      break;
    default:
      break;
  }
}

function newYear(namePerson2) {
  return `${namePerson2}! ${namePerson2}! ${namePerson2}!`;
}

kolobok("дедушка");

const message = newYear("Снегурочка");
console.log(message);
