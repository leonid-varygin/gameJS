/*МЕГАЗАХВАТЫВАЮЩАЯ ИГРА ОТ ЛЕОНИДА!*/

var $start = document.querySelector('#start')  //оживляем кнопку
var $game  = document.querySelector('#game')   //выбираем фон
var $time = document.querySelector('#time')
var $result = document.querySelector('#result')
var $timeHeader = document.querySelector('#time-header')
var $resultHeader = document.querySelector('#result-header')
var $gameTime = document.querySelector('#game-time')

var colors = ['#D32F2F', '#E91E63', '#03A9F4', '#9C27B0', '#009688', '#FFEB3B','#8BC34A', '#FF9800', '#607D8B', '#CDDC39', '#4CAF50', '#03A9F4']
var score = 0 //изначальный счёт
var isGameStarted = false //по умолчанию игра не идёт


$start.addEventListener('click', startGame) //после нажатия на кнопку «старт» вызываем на исполнение фунцию startGame. нахуй она исполняет?:)
$game.addEventListener('click', handleBoxClick) //при клике по блоку game вызываем функцию handleBoxClick
$gameTime.addEventListener('input', setGameTime) 

function show($el) { //функция отображения 
    $el.classList.remove('hide')
}

function hide($el) { //функция сокрытия 
    $el.classList.add('hide')
}

function startGame() {
    score = 0
    setGameTime()
    $gameTime.setAttribute('disabled', 'true') //блокируем возможность менять значение времени в процессе игры
    isGameStarted = true //запущена ли игра?
    $game.style.backgroundColor = '#fff' //меняем фон на белый у дива game
    hide($start)//скрываем кнопку после нажатия на время игры

    var interval = setInterval(function() {
        var time = parseFloat($time.textContent)

        if (time <= 0) {
            clearInterval(interval)
            endGame()
        } else {
            $time.textContent = (time - 0.1).toFixed(1)
        }
    }, 100)
    
    renderBox() //вызываем генерацию рандомных квадратов
}

function setGameScore() {
    $result.textContent = score.toString()
}

function setGameTime() {
    var time = +$gameTime.value //приводим к числу
    $time.textContent = time.toFixed(1)
    show($timeHeader) //в начале игры показываем таймер
    hide($resultHeader) //но прячем результат
}

function endGame() {
    isGameStarted = false //игра заканчивается
    setGameScore()
    $gameTime.removeAttribute('disabled') //блокируем возможность менять значение времени в процессе игры
    show($start) //удаляем свойство Hide в CSS у дива старт(возвращаем кнопку)
    $game.innerHTML = ''
    $game.style.backgroundColor = '#ccc' //в конце игры красим окно игры в серый
    hide($timeHeader) //в конце игры прячем таймер
    show($resultHeader) //показываем результатирующий хэдер
}

function handleBoxClick(event) {
    if (!isGameStarted) {
        return //если игра не запушена, ничего не делаем
    }

    if (event.target.dataset.box) { //если кликнули по квадрату, будет вызываться функция генерации квадратов
        score++ //если попали по квадрату, инкрементируем переменную score
        renderBox()
    }
    
}

function renderBox() { //функция для генерации квадратов
    $game.innerHTML = '' //удаляем нажатый квадрат
    var box = document.createElement('div') //создаём элемент див
    var boxSize  = getRandom(30, 100) //переменная, которая задаёт функции опреденный диапазон
    var gameSize = $game.getBoundingClientRect()
    //console.log(gameSize); //чтобы узнать высоту и ширину поля гейм и мы можем узнать какие максимальные top и left для posion задать
    var maxTop   = gameSize.height - boxSize //зная высоту  и ширину, можем вычислить максимальное отклонение top и left
    var maxLeft  = gameSize.width - boxSize
    var randomColorIndex =  getRandom(0, colors.length)

    box.style.height = box.style.width = boxSize + 'px' //задаём ширину. а так как див квадратный, то указываем только высоту
    box.style.position = 'absolute' //для того, чтобы квадраты позиционировались абсолютно внутри большого квадрата
    box.style.backgroundColor = colors[randomColorIndex]
    box.style.top = getRandom(0, maxTop) + 'px' //рандомно генерируем и вставляем это число в top
    box.style.left = getRandom(0, maxLeft) + 'px'
    box.style.cursor = 'pointer'
    //чтобы определить, что клик прошёл по квадрату
    box.setAttribute('data-box', 'true')

    $game.insertAdjacentElement('afterbegin', box) //добавляет переданный элемент в DOM-дерево относительно элемента, вызвавшего метод. т.е кладём див в див game

}

function getRandom(min, max) { //функция для генерации рандомных значений. принимает как параметры мин и макс значения.
    return Math.floor(Math.random() * (max - min) + min) //возвращаем случайно сгенерированное число и умножаем на разницу параметров + минимальное число
}
