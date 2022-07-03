window.addEventListener('DOMContentLoaded', function () {
    let check = document.querySelector('.cheсk'),
        restart = document.querySelector('.restart'),
        end = document.querySelector('.end'),
        index = 0,
        i = 1,
        id = `#_${i}`,
        word = '',
        arr = ["АДЕПТ", "АЗАРТ", "АКТЁР", "АКТИВ", "AКЦИЯ", "АЛКАШ", "АМБАР", "АНОНС", "АНФАС", "АРБУЗ", "БАГГИ", "БАГЕТ", "БАКАЛ", "БАЛЕТ", "БАНКА", "БАРОН", "БЕГУН", "БЕДРО", "БЕЛЬЁ", "БРОНЬ", "БРОШЬ", "БУТИК", "БУТОН", "ВАННА", "ВАРКА", "ВЕПРЬ", "ВЕПРЬ", "ВЕНИК", "ВЕСЛО", "ВЕЧЕР", "ВЗВОХ", "ВЛАГА", "ВОЖДЬ", "ВЫГОН", "ВЫПАД", "ГАЙКА", "ГАМАК", "ГАММА", "ГАРАЖ", "ГЕЛИЙ", "ГЕНИЙ", "ГОВОР", "ГОЛОД", "ГРУДА", "ГРУНТ", "ГУЛЯШ", "ДЕБРИ", "ДЕБОШ", "ДЕФИС", "ДЗЮДО", "ДОВОД", "ДОНОС", "ДОСУГ", "ДРОЖЬ", "ДРОЗД", "ДУЭЛЬ", "ДЫМКА", "ДЯТЕЛ", "ЕВРЕЙ", "ЕГЕРЬ", "ЕЗДОК", "ЖЕЛОБ", "ЖЕЛЧЬ", "ЖЕРЛО", "ЖИВОТ", "ЖИЗНЬ", "ЖИЛЕТ", "ЖОКЕЙ", "ЗАБЕГ", "ЗАБОР", "ЗАДОР", "ЗАКАЗ", "ЗАНОС", "ЗАПАХ", "ЗАПАС", "ЗАТЕЯ", "ЗВЕРЬ, ЗЕФИР, ЗЛЮКА, ИВРИТ, ИГРОК, ИЗГИБ, ИЗГОЙ, ИЗНОС, ИСКРА, ИСХОД, КАМИН, КАМЫШ, КАРМА, КВЕСТ, КИШКА, КОВЕР, КОНЮХ, КУЛАК, КУСОК, ЛЕШИЙ, ЛИМОН, ЛИНИЯ, ЛИЦЕЙ, ЛОДКА, МАЙОР, МАССА, МАФИЯ, МЕТЛА, МОРОЗ, МУФТА, НАРЯД, НОЖИК, НОРМА, ОБРЕЗ", "ОКЛАД", "ОКРУГ", "ОСЕНЬ", "ОТПОР", "ПАУЗА", "ПЕВЕЦ", "ПЕСОК", "ПОВОД", "ПОЛОГ", "ПРЫТЬ", "ПУНКТ", "ПУЧОК", "ПШЕНО", "ПЯТКА", "РАЗУМ", "РАНЧО", "РЕГБИ", "РЕПКА", "РУСЛО", "РЫНОК", "СБРОС", "СДАЧА", "СКЛАД", "СЛИЗЬ", "СЛОВО", "СПОРТ", "СТВОЛ", "СТОЛБ", "ТАБЛО", "ТАКСИ", "ТЕПЛО", "ТРОЛЬ", "ТУБУС", "ТЫКВА", "УЩЕРБ", "УДАЧА", "ФИЗИК", "ФИКУС", "ФРАЗА", "ФРУКТ", "ХАЛАТ", "ХВОСТ", "ХИМИЯ", "ХОЛОП", "ЦАПЛЯ", "ЦЕНТР", "ЧЕШУЯ", "ЧУДИК", "ШАЙБА", "ШАМАН", "ШТАМП", "ЩЕТКА", "ЮНОША", "ЮРИСТ", "ЯГОДА", "ЯРЛЫК"],
        hidden = arr[Math.floor(Math.random() * arr.length)],
        indexWin = localStorage.getItem('indexWin'),
        indexGame = localStorage.getItem('indexGame'),
        modal = document.querySelector('.lose_Game'),
        reset = document.querySelector('.reset');

    if (indexWin === null) {
        indexWin = 0;
    }
    if (indexGame === null) {
        indexGame = 0;
    }

    document.querySelector('.value_Win').textContent += indexWin;
    document.querySelector('.value_Game').textContent += indexGame;

    function winGame() {
        if (hidden == word) {
            modal.classList.add('green');
            modal.textContent = 'Отличная работа :)';
            valueWin();
        }
    }

    function loseGame() {
        if (index === 5 && word !== hidden) {
            modal.classList.add('red');
            modal.innerHTML = `Правильный ответ: ${hidden}`;
        }
    }

    function checkLetter() {
        for (k = 0; k < 5; k++)
            if (Array.from(hidden).some(item => item === Array.from(word)[k])) {
                let id = `._${k+1}`;
                document.querySelector(id).classList.add('yellow');
            }

        for (let k = 0; k < 5; k++)
            if (Array.from(hidden)[k] == Array.from(word)[k]) {
                let id = `._${k+1}`;
                document.querySelector(id).classList.add('green');
            }
    }

    function chekWord() {
        fetch(`https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20220618T162931Z.6b075690df294ab4.1a8b6b46322253ded0e43f8bd0ed88ba60220fb4&lang=ru-ru&text=${word}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                let [pos] = data.def;
                console.log(pos.pos);
                modal.textContent = '';
                if (pos.pos === 'noun') {
                    checkLetter();
                    changeClass();
                    index++;
                    loseGame();
                    winGame();
                    i = 1;
                    word = '';

                }
            })
            .catch(modal.textContent = 'Введите другое слово');
    }

    function addText(letter) {
        id = `._${i}`;
        if (i < 6) {
            document.querySelector(id).textContent = letter;
            word += letter;
            i++;
            return word;
        }
    }

    function changeClass() {
        for (let j = 1; j < 6; j++) {
            document.querySelector(`._${j}`).classList.remove(`_${j}`);
        }
    }

    function valueWin() {
        indexWin++;
        localStorage.setItem('indexWin', indexWin);
    }

    function valueGame() {
        indexGame++;
        localStorage.setItem('indexGame', indexGame);
    }

    document.addEventListener('keydown', (event) => {
        if (/^\p{sc=Cyrillic}*$/u.test(event.key)) {
            addText(event.key.toUpperCase());
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Backspace') {
            if (i > 1) {
                i--;
                id = `._${i}`;
                word = word.slice(0, -1);
                document.querySelector(id).textContent = '';
            }
        }
    });

    check.addEventListener('click', () => {
        if (i > 5) {
            chekWord(word);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            if (i > 5) {
                chekWord(word);
            }
        }
    });

    restart.addEventListener('click', () => {
        valueGame();
        window.location.reload();
    });

    reset.addEventListener('click', () => {
        indexWin = 0;
        indexGame = 0;
        localStorage.setItem('indexWin', indexWin);
        localStorage.setItem('indexGame', indexGame);
    });
});