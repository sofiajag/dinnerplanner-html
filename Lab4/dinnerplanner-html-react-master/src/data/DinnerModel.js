const httpOptions = {
  headers: {'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'}
};


const DinnerModel = function () {

  let numberOfGuests = localStorage.getItem('NumberOfGuests');
  let observers = [];
 
  let menu = localStorage.getItem('Menu');
  menu = (menu) ? JSON.parse(menu) : [];

  this.setNumberOfGuests = function (num) {
    numberOfGuests = num;
    localStorage.removeItem('NumberOfGuests');
    localStorage.setItem('NumberOfGuests', num);
    notifyObservers();
  };

  this.getNumberOfGuests = function () {
    let num = localStorage.getItem('NumberOfGuests');

    return num;
  };


  this.addToMenu = function(dish){
      for (var i = 0; i < menu.length; i++){
        if (menu[i].id === dish.id) {
          return;
        }
      }
      menu.push(dish);
      localStorage.removeItem('Menu');
      localStorage.setItem('Menu', JSON.stringify(menu));

      notifyObservers();

  };

  this.removeDish = function(dishId) {

    for (var i = 0; i < menu.length; i++){
        if (menu[i].id === dishId) {
          menu.splice(i,1);
        }
    }
    localStorage.removeItem('Menu');
    localStorage.setItem('Menu', JSON.stringify(menu));
      
     notifyObservers();
  }
  
  this.getMenu = function () {

    let Menu = localStorage.getItem('Menu');
    Menu = (Menu) ? JSON.parse(Menu) : [];
    return Menu;
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

  this.getAllDishes = function (searchurl) {
    //const searchurl = 'type=' + searchType + "&query=" + inputData;
    const url = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?type=' + searchurl;
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
    throw error;
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
