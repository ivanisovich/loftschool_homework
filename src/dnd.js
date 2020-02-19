/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
    function GetRandomColor() {
        return '#'+((1<<24)*Math.random()|0).toString(16);
    }

    function getRandomInteger(min, max) {
        let result = min - 0.5 + Math.random() * (max - min + 1);

        result = Math.round(result);

        return result;
    }

    let result = document.createElement('div');

    result.className = 'draggable-div';
    result.style.backgroundColor = GetRandomColor();
    result.style.top = getRandomInteger(10, 100) + 'px' ;
    result.style.width = getRandomInteger(10, 100) + 'px';
    result.style.left = getRandomInteger(10, 100) + 'px';
    result.style.height = getRandomInteger(10, 100) + 'px';
    result.style.position = 'absolute';

    result.style.cursor = 'pointer';

    result.draggable = true; 

    return result;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {

    var shiftX, shiftY;
    
    function getCoords(elem) {
        var box = elem.getBoundingClientRect();
      
        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    
    }
    
    function handleDragStart(e) {
        shiftX = e.pageX - getCoords(target).left;
        shiftY = e.pageY - getCoords(target).top;
    }
    
    function handleDragEnd(e) {
    
        target.style.left = e.pageX - shiftX + 'px';
        target.style.top = e.pageY - shiftY + 'px';
    }
    
    target.addEventListener('dragend', handleDragEnd);
    target.addEventListener('dragstart', handleDragStart);
  
}
  
let addDivButton = homeworkContainer.querySelector('#addDiv');
  
addDivButton.addEventListener('click', function() {
    // создать новый div
    let div = createDiv();
  
    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации d&d
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
