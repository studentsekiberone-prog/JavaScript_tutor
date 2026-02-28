// Анатомия функции

function greet(name){
    return `Привет, ${name}!`;
}

const message = greet('Сергей');
console.log(message);

function add(a, b){
    return a + b;
}

console.log(add(5, 3));

const factorial = function fact(n){
    return n <= 1 ? 1 : n * fact(n - 1);
}

console.log(factorial(5));

// Стрелочные функции

// Обычная функция
function square(x){
    return x * x;
}

// Стрелочная функция
const squareArrow = x => x * x;

console.log(squareArrow(6));

// Стрелочная функция с несколькими параметрами
const sum = (a, b) => a + b;
console.log(sum(10, 15));

// Без параметров
const greetWorld = () => 'Привет, мир!';
console.log(greetWorld());

// Стрелочная функция с блоком кода
const greetPerson = name => {
    const greeting = `Привет, ${name}!`;
    return greeting;
}
console.log(greetPerson('Вася'));

// return в скобках
const getUser = () => ({
    name: 'Иван',
    age: 30
});
console.log(getUser());

// Параметры и аргументы
// Параметры - это переменные, указанные в определении функции
// Аргументы - это реальные значения, передаваемые функции при вызове

// 1. Параметры по умолчанию
function createWorld(nameWorld = 'Пустыня', size = 1000, timeOfDay = 'день'){
    return `Создан мир "${nameWorld}" размером ${size} и временем суток "${timeOfDay}".`;
}
console.log(createWorld());

// 2. Rest-параметры - неопределенное количество аргументов в виде массива

function sumAll(...numbers){
    return numbers.reduce((acc, num) => acc + num, 0);
}
console.log(sumAll(1, 2, 3, 4, 5));

// 3. Hoisting - поднятие функций и переменных в верхнюю часть области видимости

sayHi(); 
sayBay();

function sayHi(){
    console.log('Привет из hoisting функции!');
}
function sayBay(){
    console.log('Пока из hoisting функции!');
}

// IIFE - немедленно вызываемые функциональные выражения. 
// Используется для изоляции области видимости

// Пример IIFE
(function(){
    const secret = 'Секретная информация';
    console.log(secret);
})();

// Стрелочная IIFE
const result = (()=>{
    const a = 5;
    const b = 10;
    return a + b;
})();
console.log(result);