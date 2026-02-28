window.addEventListener("load", function () {


  const countUser = this.document.querySelector(".count-user"),
    countComp = this.document.querySelector(".count-comp"),
    userField = this.document.querySelector(".user-field"),
    compField = this.document.querySelector(".comp-field"),
    sound = this.document.querySelector(".sound"),
    play = this.document.querySelector(".play"),
    fields = this.document.querySelectorAll(".field"),
    res = this.document.querySelector(".result");

    let userStep;
    let compStep;

    //записываем комбинации выбранные компьютором и пользователем
    let countU = 0;
    let countC = 0;
    //счетчики для юзера и компьютера

    let blocked = false;

  function choiceUser(e) {
    if (blocked) return;
    //if (blocked) return что бы после сделанного выбора нельзя было его изменить пока не закончиться раунд
    let target = e.target;
    //в этой переменной будет храниться тот элемент по которому кликнул пользователь

    if (target.classList.contains("field")) {
      //проверка что пользователь кликнул имеенно по кнопкам из предложенных а не куда попало

      userStep = target.dataset.field;
      //записываем в переменную userStep (которая была обьявлена в самом начале)что  пользователь выбрал что то из конкретных вариантов
      fields.forEach((item) => item.classList.remove("active", "error"));
      //удаляем возможность подстветки остальных вариантов после первого нажатия на нужный варивнт
      target.classList.add("active");
      //подствечиваем выбранный вариант пользователем
      choiceComp();
      //запускаем функцию что бы компьютер показал свой рандомный вариант
    }
  }
  //функция для выбора комбинации пользователя
  function choiceComp() {
    blocked = true;
    //запускаем блокеровку выбора пока компьютор делает свой ход
    let rand = Math.floor(Math.random() * 5);
    //запускаем рандомное число что бы компьютор сделал рандомный выбор из предложеных вариантов
    compField.classList.add("blink");
    //добавляем в заранее созданную переменную моргание
    let compFields = compField.querySelectorAll(".field");
    //создаем пременную  в которой будут все кнопки

    setTimeout(() => {
      //фунция для задержки на 3 сек(тоесть он будет думать над своим вариантом в течении 2 сек)
      compField.classList.remove("blink");
      //отключаем моргаение
      compStep = compFields[rand].dataset.field;
      //записываем результат компьютора впеременную compStep
      compFields[rand].classList.add("active");
      //подкрашиваем тот вариант который выбрал компьютор
      winner();
      //выводим результат
    }, 2000);
  }
  //функция для выбора комбинации компьютера

const GAME_RULES = {
  rock: ["scissors", "lizard"],
  paper: ["rock", "spock"],
  scissors: ["paper", "lizard"],
  lizard: ["spock", "paper"],
  spock: ["scissors", "rock"]
};

function winner() {
  blocked = false;

  if (userStep === compStep) {
    updateUI("Draw!", "draw");
  } else if (GAME_RULES[userStep].includes(compStep)) {
    // Юзер победил
    countU++;
    countUser.innerText = countU;
    updateUI("You Win!", "win");
    // Подсвечиваем ошибку у компьютера
    compField.querySelector(`[data-field="${compStep}"]`).classList.add("error");
  } else {
    // Компьютер победил
    countC++;
    countComp.innerText = countC;
    updateUI("You Loss!", "loss");
    // Подсвечиваем ошибку у пользователя
    userField.querySelector(`[data-field="${userStep}"]`).classList.add("error");
  }
}
  //функция для определения победителя на текщий момент


  // Вспомогательная функция, чтобы не дублировать код звуков и текста
function updateUI(message, soundType) {
  res.innerText = message;
  sound.setAttribute("src", `audio/${soundType}.mp3`);
  sound.play();
}
  function playGame() {
    countU = countC = 0;
    //обнуление переменных в которые добавлялись результаты игры
    res.innerText = "Make a Choice";
    //надпись по умольчанию как призыв к действию
    countUser.innerText = "0";
    countComp.innerText = "0";
    //выводим на экран что счетчики обнулились
    fields.forEach((item) => item.classList.remove("active", "error"));
    //удаление всех подсветок на всех кнопках
  }
  //функция для запука игры с начало

  play.addEventListener("click", playGame);
  //слушатель события на нажатие кнопки которая перезапускает игру с начало,она запускает функцию playGame()
  userField.addEventListener("click", choiceUser);
});