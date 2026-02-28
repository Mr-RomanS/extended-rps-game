window.addEventListener("load", function () {


  let countUser = this.document.querySelector(".count-user"),
    countComp = this.document.querySelector(".count-comp"),
    userField = this.document.querySelector(".user-field"),
    compField = this.document.querySelector(".comp-field"),
    sound = this.document.querySelector(".sound"),
    play = this.document.querySelector(".play"),
    fields = this.document.querySelectorAll(".field"),
    res = this.document.querySelector(".result"),

    userStep,
    compStep,

    //записываем комбинации выбранные компьютором и пользователем
    countU = 0,
    countC = 0,
    //счетчики для юзера и компьютера
    blocked = false;

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

  function winner() {
    blocked = false;
    //сново блокировка снята и пользователь может делать свой выбор
    let comb = userStep + compStep;
    //добавляем результат компьютора и пользователя что бы понимать какой это результат выиграшный ничейный или проиграшный(тоесть сумма выбранного)
    switch (comb) {
      //передаем результат сложение выбранного пользователем и компьютером
      case "rockrock":
      case "scissorsscissors":
      case "paperpaper":
      case "lizardlizard":
      case "spockspock":
        //варианты ничьей
        res.innerText = "Draw!";
        //выводим надпись что получилась ничья
        sound.setAttribute("src", "audio/draw.mp3");
        //добавляем музыку которая подходит для ничьей
        sound.play();
        //и включаем музыку(она вкуючиться только когда будет ничья)
        break;
      //прерываем процесс что бы остральной код не выполнялся
      case "scissorspaper":
      case "scissorslizard":
      case "paperrock":
      case "paperspock":
      case "rockscissors":
      case "rocklizard":
      case "lizardpaper":
      case "lizardspock":
      case "spockrock":
      case "spockscissors":
        //варианты моего выиграша
        res.innerText = "You Win!";
        //вывводим текст с победой
        sound.setAttribute("src", "audio/win.mp3");
        //добавляем музыку
        sound.play();
        //включаем музыку при победе
        countU++;
        //добавляем в счетчик побед на +1
        countUser.innerText = countU;
        //добавляем результат на экран
        compField
          .querySelector("[data-field=" + compStep + "]")
          //здесь я достаю вариан компьютора через обращение селектора в котором занчение равно тому что храниться в переменной compStep
          .classList.add("error");
        //достаем именно тот вариант который выбрал компьютор и добавляем включение проиграшной подстветки

        break;
      //прерываем остальной код
      case "scissorsrock":
      case "scissorsspock":
      case "paperlizard":
      case "paperscissors":
      case "rockpaper":
      case "rockspock":
      case "lizardrock":
      case "lizardscissors":
      case "spockpaper":
      case "spocklizard":
        //варианты выиграша компьютора
        res.innerText = "You Loss!";
        //вывводим текст с проиграшем
        sound.setAttribute("src", "audio/loss.mp3");
        //добавляем музыку
        sound.play();
        //включаем музыку при проиграша
        countC++;
        //добавляем в счетчик побед на +1 компьютору
        countComp.innerText = countC;
        //добавляем результат на экран со стороны компьютора
        userField
          .querySelector("[data-field=" + userStep + "]")
          //здесь я достаю свой вариант через обращение селектора в котором занчение равно тому что храниться в переменной userStep
          .classList.add("error");
        //достаем именно тот вариант который выбрал пользователь и добавляем включение проиграшной подстветки

        break;
      //прерываем остальной код
    }
  }
  //функция для определения победителя на текщий момент

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
