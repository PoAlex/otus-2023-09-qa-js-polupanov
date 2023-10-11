function kolobok(namePerson) {
    switch (namePerson) {
        case 'дедушка':
            console.log("Я от дедушки ушел")
            break;
            case 'заяц':
                console.log("Я от зайца ушел")
                break;
                case 'лиса':
                    console.log("Меня съели")
                    break;
        default:
            break;
    }
}

function newYear(name) {
    console.log(`${name}! ${name}! ${name}!`)
}

// Функция возвращает: "Дед Мороз! Дед Мороз! Дед Мороз!" или "Снегурочка! Снегурочка! Снегурочка!";

newYear('Дед Мороз')
newYear('Снегурочка')

