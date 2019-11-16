
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
  // we use this fun to make the random pic that will appear not the same of 3 previos one and not the same of the 2 beside 

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

    Bus.leftname.textContent = Bus.leftObject.title;
    Bus.rightname.textContent = Bus.rightObject.title;
    Bus.centername.textContent = Bus.centerObject.title;
}
// fun to take arandom pic from the 20 
function getRandomBus() {
    var index = Math.floor(Math.random() * Bus.all.length);
    return Bus.all[index];
}

function randomInRange(min, max) {
    var range = max - min + 1;
    var rand = Math.floor(Math.random() * range) + min
    return rand;
}

   

function addElement(tag, container, text) {
    var element = document.createElement(tag);
    container.appendChild(element);
    if (text) {
        element.textContent = text;
    }
    return element;
}
//which will appear in screen after 25 check 
function renderview() {
    var container = document.getElementById('report_product')
    
    for (let i = 0; i < Bus.all.length; i++) {
        var LastProduct = Bus.all[i];
        var Products = LastProduct.title + ' had ' + LastProduct.clickCtr + ' voted and had shown ' + LastProduct.shownCtr + ' times. ';
        addElement('li', container, Products);

    }
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


        if (Bus.roundCtr === Bus.roundLimit) {

            alert('sorry,No more clicking !');
            renderview();
            renderChart();
            
            Bus.container.removeEventListener('click', clickHandler);
            var itemString = JSON.stringify(Bus.all);
            localStorage.setItem('items', itemString);
      
        } else {

            renderNewBus();
        }
    }
}

Bus.container.addEventListener('click', clickHandler);



function makeChart() {

    var productsTitleArray = [];
    var productLikesArray = [];

    for (var i = 0; i < Bus.length; i++) {
        var picName = Bus[i].title;
        productsTitleArray.push(picName);
    }

    for (var i = 0; i < Bus.length; i++) {
        var PicLikes = Bus.clicks;
        productLikesArray.push(PicLikes);
    }
}
//chart that repessent the total shows and checked after checked stop 
function renderChart() {

    // Modified from https://jsfiddle.net/nagix/bL8hpk6n/

    var productsTitle= [];
    var productsClick = [];
    var productsShown = [];

    for(var i = 0; i < Bus.all.length; i++) {
        var NewProduct =Bus.all[i];
        productsTitle.push(NewProduct.title);
        productsClick.push(NewProduct.clickCtr);
        productsShown.push(NewProduct.shownCtr);

    }

    var data = {
        labels: productsTitle,
        datasets: [{
          label: "Clicked",
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderWidth: 1,
          data: productsClick,
          xAxisID: "bar-x-axis1",
        }, {
          label: "Shown",
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          borderWidth: 1,
          data: productsShown,
          xAxisID: "bar-x-axis2",
        }]
      };
      
      var options = {
        scales: {
          xAxes: [{
            stacked: true,
            id: "bar-x-axis1",
            barThickness: 20,
          }, {
            display: false,
            stacked: true,
            id: "bar-x-axis2",
            barThickness: 40,
        
            type: 'category',
            categoryPercentage: 0.8,
            barPercentage: 0.9,
            gridLines: {
              offsetGridLines: true
            },
            offset: true
          }],
          yAxes: [{
            stacked: false,
            ticks: {
              beginAtZero: true
            },
          }]
      
        }
      };
      
      var ctx = document.getElementById("Mychart").getContext("2d");
      var myBarChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
      });



}
function getStoredItems() {

    var itemString = localStorage.getItem('items');
  
    if(itemString) {
      
      var newObjectArray = JSON.parse(itemString);
  
      for(var i=0; i < newObjectArray.length; i++) {
        var newObject = newObjectArray[i];
        var currentInstance = Bus.all[i];
        currentInstance.clickCtr = newObject.clickCtr;
        currentInstance.shownCtr = newObject.shownCtr;
      }
    }
  }
  
  getStoredItems();
  renderNewBus();