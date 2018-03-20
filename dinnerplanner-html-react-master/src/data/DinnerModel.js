const httpOptions = {
  headers: {'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'}
};


const DinnerModel = function () {

  let numberOfGuests = 6;
  let observers = [];
  let searchType = "";
  let menu = [];

  this.setNumberOfGuests = function (num) {
    numberOfGuests = num;
    notifyObservers();
  };

  this.getNumberOfGuests = function () {
    return numberOfGuests;
  };



  this.setSearchType = function(type) {
    searchType = type;
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
  this.getMenu = function () {
    return menu;
  };
  //calculates the total menu price
  this.calcCost = function () {
    var totalCost = 0;
    for (var i = 0; i < menu.length; i++){
      totalCost += parseInt(menu[i].pricePerServing * numberOfGuests);
    }
   return totalCost;
  }


  // API Calls

  this.getAllDishes = function () {
    //kom ihåg att lägga till filter och type som input. 
    //alert("getAllDishes - searchTerm: "); // + data);
    
    const typeurl = 'type=' + searchType;
    const url = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?' + typeurl; //?type=' + data;
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
