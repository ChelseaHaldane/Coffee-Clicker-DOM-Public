Slice 1
Function updateCoffeeView(coffeeQty)
    As a user, I would like to see my updated coffee quantity, so that I know what my current coffee quantity is. 
Function clickCoffee(data)
    As a user, when I click the coffee icon, I want my coffee quantity to increase by one.

Slice 2
function unlockProducers(producers, coffeeCount)
    As a user, when I click my coffee icon, I want to unlock any producers where my coffee count is at least half of the price of the producer. 
function getUnlockedProducers(data): no interaction w/ this function. This function is 
    not used outside of the test.  
function makeDisplayNameFromId(id)
    As a user, I would like to see human readable names of the producers, so that I can identify them.
function makeProducerDiv(producer)
    As a user, I would like to see the information on the available producers, so that I can better understand my choices. 
function deleteAllChildNodes(parent)
    As a developer, I would like a procedure to clear the producers before each update, so that each update shows the most current information. 
function renderProducers(data)
    As user, I would like to see the available producers refresh with current information, including the name of the producer, the quantity I own, and how much each producer costs, so that I have the most current information to make decisions in my game. 

Slice 3
function getProducerById(data, producerId) 
    As a developer, I would like to get my producer by their Id and return the whole producer object. 
function canAffordProducer(data, producerID)
    As a developer, I need to know if my player can afford a producer with the amount of coffee they have versus the producer prices.
function updateCPSView (cps)
    As a user, I need my a counter to reflect an updated view of the amount of clicks per second i have made, so that I can better make decisions on my gameplay. 
function updatePrice(oldPrice)
    As a developer, I need the old price of the available producers to update with a new price by increasing the old price by 125% rounded down to a the nearest whole number. 
function attemptToBuyProducer(data, producerID)
    As a developer, I need something to increase quantity of the producer, decrease the coffee by the producer's price, update the price shown with the new price for the producer, and update the total clicks by the producer's clicks, so I have the most current information. 