const httpOptions = {
  headers: {'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'}
};


const DinnerModel = function () {

  let numberOfGuests = 6;
  let observers = [];
  let searchType = "";
  let inputData = "";
  let menu = [];

  this.setNumberOfGuests = function (num) {
    numberOfGuests = num;
    notifyObservers();
  };

  this.getNumberOfGuests = function () {
    return numberOfGuests;
  };


//sets the type for the seach of dishes in get all dishes.
  this.setSearchType = function(type) {
    searchType = type;
    notifyObservers();
  };
//sets the input from user for the seach of dishes in get all dishes.
  this.setInputData = function(data) {
    inputData = data;
    notifyObservers();
  };

  this.addToMenu = function(dish){
      for (var i = 0; i < menu.length; i++){
        if (menu[i].id === dish.id) {
          return;
        }
      }
      menu.push(dish);
      notifyObservers();

  };

  this.removeDish = function(dishId) {
    //console.log("inside removeDish in model");
    //console.log("id: " + dishId);
    for (var i = 0; i < menu.length; i++){
        if (menu[i].id === dishId) {
          menu.splice(i,1);
        }
      }
      
      notifyObservers();
  }
  
  this.getMenu = function () {
    return menu;
  };
  //calculates the total menu price
  this.calcCost = function () {
    
    var totalCost = 0;
    for (var i = 0; i < menu.length; i++){
      totalCost += parseInt(menu[i].pricePerServing * numberOfGuests, 10);
    }
   return totalCost;
  }



  // API Calls

  this.getAllDishes = function () {
    //alert("getAllDishes - searchTerm: "); // + data);
 
    const searchurl = 'type=' + searchType + "&query=" + inputData;
    const url = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?' + searchurl;
    return fetch(url, httpOptions)
      .then(processResponse)
      .catch(handleError)

  }


  //function that returns a dish of specific ID
  this.getDish = function (id) {
    //console.log("Dish id innan ajax: " + id);
    //alert("getDish - id: " + id); // + data);
    const url = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/' + id + '/information';
    return fetch(url, httpOptions)
      .then(processResponse)
      .catch(handleError)
  }
  
  // API Helper methods

  const processResponse = function (response) {
    if (response.ok) {
      return response.json()

    }
    throw response;
  }
  
  const handleError = function (error) {
    if (error.json) {
      error.json().then(error => {
        console.error('getAllDishes() API Error:', error.message || error)
      })
    } else {
      console.error('getAllDishes() API Error:', error.message || error)
    }
  }

  // Observer pattern

  this.addObserver = function (observer) {
    observers.push(observer);
  };

  this.removeObserver = function (observer) {
    observers = observers.filter(o => o !== observer);
  };

  const notifyObservers = function () {
    observers.forEach(o => o.update());
  };
};

export const modelInstance = new DinnerModel();
