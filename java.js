'use strict';
function Bus(title, src) {
    this.title = title;
    this.src = src;
    this.clickCtr = 0;
    this.shownCtr = 0;
    Bus.all.push(this);
}

Bus.roundCtr = 0;
Bus.roundLimit = 25;

Bus.all = [];

Bus.container = document.getElementById('bus-container');

Bus.leftImage = document.getElementById('left-pro-image');
Bus.rightImage = document.getElementById('right-pro-image');
Bus.centerImage = document.getElementById('center-pro-image');

Bus.leftname = document.getElementById('left-pro-title');
Bus.rightname = document.getElementById('right-pro-title');
Bus.centername = document.getElementById('center-pro-title');

Bus.leftObject = null;
Bus.rightObject = null;
Bus.centerObject = null;
new Bus('bubblegum', 'images/bubblegum.jpg');
new Bus('bag', 'images/bag.jpg');
new Bus('banana', 'images/banana.jpg');
new Bus('bathroom', 'images/bathroom.jpg');
new Bus('boots', 'images/boots.jpg');
new Bus('breakfast', 'images/breakfast.jpg');
new Bus('chair', 'images/chair.jpg');
new Bus('cthulhu', 'images/cthulhu.jpg');
new Bus('dog-duck', 'images/dog-duck.jpg');
new Bus('dragon', 'images/dragon.jpg');
new Bus('pen', 'images/pen.jpg');
new Bus('oet-sweep', 'images/pet-sweep.jpg');
new Bus('scissors', 'images/scissors.jpg');
new Bus('shark', 'images/shark.jpg');
new Bus('sweep', 'images/sweep.png');
new Bus('tauntaun', 'images/tauntaun.jpg');
new Bus('unicorn', 'images/unicorn.jpg');
new Bus('usb', 'images/usb.gif');
new Bus('water-can', 'images/water-can.jpg');
new Bus('wine-glass', 'images/wine-glass.jpg');
function renderNewBus() {

    var forbidden = [Bus.leftObject, Bus.rightObject, Bus.centerObject];

    do {

        Bus.leftObject = getRandomBus();

    } while (forbidden.includes(Bus.leftObject))


    forbidden.push(Bus.leftObject);

    do {

        Bus.rightObject = getRandomBus();

    } while (forbidden.includes(Bus.rightObject));

    forbidden.push(Bus.rightObject);

    do {
        Bus.centerObject = getRandomBus();

    } while (forbidden.includes(Bus.centerObject));



    Bus.leftObject.shownCtr++;
    Bus.rightObject.shownCtr++;
    Bus.centerObject.shownCtr++;

    var leftBusImageElement = Bus.leftImage;
    var rightBusImageElement = Bus.rightImage;
    var centerBusImageElement = Bus.centerImage;

    leftBusImageElement.setAttribute('src', Bus.leftObject.src);
    leftBusImageElement.setAttribute('alt', Bus.leftObject.title);

    rightBusImageElement.setAttribute('src', Bus.rightObject.src);
    rightBusImageElement.setAttribute('alt', Bus.rightObject.title);
    
    centerBusImageElement.setAttribute('src', Bus.centerObject.src);
    centerBusImageElement.setAttribute('alt', Bus.centerObject.title);

    Bus.lefttitle.textContent = Bus.leftObject.title;
    Bus.righttitle.textContent = Bus.rightObject.title;
    Bus.centertitle.textContent = Bus.centerObject.title;
}

function getRandomBus() {
    var index = Math.floor(Math.random() *  Bus.all.length);
    return Bus.all[index];
}

function randomInRange(min, max) {
    var range = max - min + 1;
    var rand = Math.floor(Math.random() * range) + min
    return rand;
}

function updateTotals() {

    var tableBody = document.getElementById('report product');

    tableBody.innerHTML = '';

    for (var i = 0; i <  Bus.all.length ; i++) {
        var pro = Bus.all[i];
        var row = addElement('tr', tableBody);
        addElement('td', row, pro.title);
        addElement('td', row, '' + pro.clickCtr);
        addElement('td', row, '' + pro.shownCtr);
    }
}

function addElement(tag, container, text) {
    var element = document.createElement(tag);
    container.appendChild(element);
    if (text) {
        element.textContent = text;
    }
    return element;
}

function clickHandler(event) {

    var clickedId = event.target.id;
    var busClicked;

    if (clickedId === 'left-pro-image') {
        busClicked = Bus.leftObject;
    } else if (clickedId === 'right-pro-image') {
        busClicked = Bus.rightObject;
    } else if (clickedId === 'center-pro-image') {
        busClicked = Bus.centerObject;
    } else {
        console.log('click in one of the image please', clickedId);
    }

    if (busClicked) {
        busClicked.clickCtr++;
        Bus.roundCtr++;

        updateTotals();
        if (Bus.roundCtr === Bus.roundLimit) {

            alert('sorry,No more clicking !');

            Bus.container.removeEventListener('click', clickHandler);

        } else {

            renderNewBus();
        }
    }
}
Bus.container.addEventListener('click', clickHandler);

updateTotals();

renderNewBus();

