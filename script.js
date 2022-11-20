//producers = array that holds producer (singular) objects
/* eslint-disable no-alert */

/***The line below allows us to access the data from the window object.
 * This comes from the data.js file***/
function loadGame() {

  //look for saved game & return it if it exists. 
  const gameState = localStorage.getItem("gameState");
  if (!!gameState) {
    return JSON.parse(localStorage.getItem("gameState"));
  } else {
    return window.data;
  }
}


const data = loadGame();

function saveGame(data) {
  const gameState = JSON.stringify(data);
  localStorage.setItem("gameState", gameState);
}


/***Before we can begin manipulating the DOM we need to gain access to two DOM Nodes***/
// 1. Declare a variable bigCoffee that holds reference to the element with id 'big_coffee'.
// your code here
const bigCoffee = document.getElementById("big_coffee");
// 2. Declare a variable producerContainer that holds reference to the element with id 'producer_container'.
// your code here
const producerContainer = document.getElementById("producer_container");
/***Don't worry about the specifics of the condition in this if statement for now.
 * Just follow the instructions in it to ensure the application has base functionality.
 * We'll discuss in depth later what process is, but it's not necessary just yet.***/
if (typeof process === 'undefined') {
  /********************
   *   Event Listeners
   ********************/

  /* 1. Add a 'click' event listener to the bigCoffee element(giant coffee emoji) you referenced above.
   * It should call the clickCoffee function below and be passed the global data object.*/
  // your code here
  bigCoffee.addEventListener('click', () => {
    clickCoffee(data);
  })
  /* 2. Add a 'click' event listener to the producerContainer(Coffee Producers panel) you referenced above.
   * It should call the buyButtonClick function below and be passed the browser event and global data object.*/
  // your code here
  producerContainer.addEventListener('click', clickP => {
    buyButtonClick(clickP, data);
  })
  // You don't need to edit this line of code. It calls the tick function passing in the data object every 1000ms or 1s.
  setInterval(() => tick(data), 1000);
}

// Now you're ready to start running the tests. Good luck!

/**************
 *   SLICE 1
 **************/

function updateCoffeeView(coffeeQty) {
  // your code here
  const coffeeCount = document.getElementById("coffee_counter");
  coffeeCount.innerText = coffeeQty;
}

function clickCoffee(data) {
  // your code here
  data.coffee++;
  updateUI(data);
}

/**************
 *   SLICE 2
 **************/

function unlockProducers(producers, coffeeCount) {
  // your code here
  //change to true when coffeeCount >= producer.price/2
  producers.forEach(producer => {
    if (coffeeCount >= producer.price / 2) {
      producer.unlocked = true;
    }
  })
}

function getUnlockedProducers(data) {
  // your code here
  const producersArray = [];
  data.producers.forEach(producer => {
    if (producer.unlocked === true) {
      producersArray.push(producer)
    }
  })
  return producersArray;
}

function makeDisplayNameFromId(id) {
  // your code here
  let tempArray = id.split("_");
  let newUpperCaseArray = [];
  tempArray.forEach(word => {
    newUpperCaseArray.push(word.charAt(0).toUpperCase() + word.slice(1));
  })
  return newUpperCaseArray.join(" ");
}

// You shouldn't need to edit this function-- its tests should pass once you've written makeDisplayNameFromId
function makeProducerDiv(producer) {
  const containerDiv = document.createElement('div');
  containerDiv.className = 'producer';
  const displayName = makeDisplayNameFromId(producer.id);
  const currentCost = producer.price;
  const html = `
  <div class="producer-column">
    <div class="producer-title">${displayName}</div>
    <button type="button" id="buy_${producer.id}" data-producer-id="${producer.id}">Buy</button>
  </div>
  <div class="producer-column">
    <div>Quantity: ${producer.qty}</div>
    <div>Coffee/second: ${producer.cps}</div>
    <div>Cost: ${currentCost} coffee</div>
  </div>
  `;
  containerDiv.innerHTML = html;
  return containerDiv;
}

function deleteAllChildNodes(parent) {
  // your code here

  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }


}

function renderProducers(data) {
  // your code here
  unlockProducers(data.producers, data.coffee);
  const producerContainer = document.getElementById("producer_container");
  deleteAllChildNodes(producerContainer);
  data.producers.forEach(producer => {
    if (producer.unlocked) {
      producerContainer.appendChild(makeProducerDiv(producer));
    }
  })
}

/**************
 *   SLICE 3
 **************/

function getProducerById(data, producerId) {
  // your code here
  let producerObject = {}
  data.producers.forEach(producer => {
    if (producer.id === producerId) {
      producerObject = producer;
    }
  })
  return producerObject;
}

function canAffordProducer(data, producerId) {
  // your code here
  let producerPrice = getProducerById(data, producerId).price;
  return data.coffee >= producerPrice;
}

function updateCPSView(cps) {
  // your code here
  const cpsIndicator = document.getElementById('cps');
  cpsIndicator.innerText = cps;
}

function updatePrice(oldPrice) {
  // your code here
  let newPrice = Math.floor(oldPrice * 1.25);
  return newPrice;
}

function attemptToBuyProducer(data, producerId) {
  // your code here
  const canAfford = canAffordProducer(data, producerId);
  if (canAfford) {
    const producerObject = getProducerById(data, producerId);
    producerObject.qty++;
    data.coffee -= producerObject.price;
    let tempPrice = updatePrice(producerObject.price);
    producerObject.price = tempPrice;
    data.totalCPS += producerObject.cps;
  } else {
    window.alert("Not enough coffee!");
  }

  return canAfford;
}

function buyButtonClick(event, data) {
  // your code here
  if (event.target.tagName !== 'BUTTON') {
    return;
  }
  const targetProducerId = event.target.id.slice(4);
  const attempt = attemptToBuyProducer(data, targetProducerId);
  updateUI(data);


}
function updateUI(data) {
  updateCoffeeView(data.coffee);
  renderProducers(data);
  updateCPSView(data.totalCPS);
  saveGame(data);

}
function tick(data) {
  // your code here
  data.coffee += data.totalCPS;
  updateUI(data);

}

/**********************************
 *  Congratulations! You did it!
 **********************************/

// You don't need to edit any of the code below
// If we aren't in a browser and are instead in node
// we'll need to export the code written here so we can import and
// run the tests in Mocha. More on this later.
// Don't worry if it's not clear exactly what's going on here.
if (typeof process !== 'undefined') {
  module.exports = {
    updateCoffeeView,
    clickCoffee,
    unlockProducers,
    getUnlockedProducers,
    makeDisplayNameFromId,
    makeProducerDiv,
    deleteAllChildNodes,
    renderProducers,
    updateCPSView,
    getProducerById,
    canAffordProducer,
    updatePrice,
    attemptToBuyProducer,
    buyButtonClick,
    tick,
  };
}
