import React, { Component } from 'react';
import './SelectDish.css';
import Sidebar from '../Sidebar/Sidebar';
import Dishes from '../Dishes/Dishes';


class SelectDish extends Component {

  constructor(props) {
    super(props);
    this.state = {
      status: 'INITIAL',
      filter: '',
      type: '',
      search: '',
      dishes: '',
    };



    this.fetchDishes = this.fetchDishes.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  fetchDishes() {
    this.props.model.getAllDishes(localStorage.getItem("SearchTerm")).then(dishes => {   //
      this.setState({
        status: 'LOADED',
        dishes: dishes.results
      });




    }).catch(() => {
      this.setState({
        status: 'ERROR'
      });

    });
  }


  // this methods is called by React lifecycle when the 
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to setup model observer
  componentDidMount() { 
    this.props.model.addObserver(this);
    this.fetchDishes();

  }

  // this is called when component is removed from the DOM
  // good place to remove observer
  componentWillUnmount() {
    this.props.model.removeObserver(this)
  }

  // in our update function we modify the state which will
  // cause the component to re-render
  update() {
    this.fetchDishes();
  
  }

  

  handleInputChange(event){
    //needs to fix that the inputdata is still in the "Box" when returning from ex. showDish and you have searched. 
    localStorage.removeItem('InputData');

    localStorage.setItem('InputData', event.target.value);
    let Filter = localStorage.getItem("InputData");

    this.setState({
        filter: Filter,

    });
    
  }

  handleSelectChange(event) {
  
    localStorage.removeItem('SelectedType');

    localStorage.setItem('SelectedType', event.target.value);
    let Type = localStorage.getItem("SelectedType");

    this.setState({
      type: Type,

    });

  }

  handleSubmit(event){
    localStorage.removeItem('SearchTerm');
    localStorage.setItem('SearchTerm', this.state.type + '&query=' + this.state.filter);
    let searchTerm = localStorage.getItem('SearchTerm');

    this.setState({
      search: searchTerm,

    });


    //event.preventDefault();
  }

  


  render() {

    return (
      <div className="SelectDish">
        <div className="row">

          <div className="col-md-3">
            {/* We pass the model as property to the Sidebar component */}
            <Sidebar model={this.props.model}/>
          </div>

          <div className="col-md-9">
            <div className="row">
              <div>
                <h2>Find a dish</h2>
                <form onSubmit={this.handleSubmit} className="form-inline">
                  <div className="form-group">
                    <input className="form-control" type="text" onChange={this.handleInputChange} placeholder="Enter key words" id="keywords"/>
                  </div>
                  <div className="form-group">
                    <select id="selectOption" className="form-control" value={localStorage.getItem("SelectedType")} onChange={this.handleSelectChange}>
                      <option value="">All</option>
                      <option value="main+dish">Main Course</option>
                      <option value="side+dish">Side Dish</option>
                      <option value="dessert">Dessert</option>
                      <option value="appetizer">Appetizer</option>
                      <option value="salad">Salad</option>
                      <option value="bread">Bread</option>
                      <option value="breakfast">Breakfast</option>
                      <option value="soup">Soup</option>
                      <option value="beverage">Beverage</option>
                      <option value="sauce">Sauce</option>
                      <option value="drink">Drink</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <button type="submit" id="searchButton" value="submit" className="form-control btn btn-default">Search</button>
                  </div>                  
                </form>
              </div>
            </div>

            <div className="row">
              {/* We pass the result: dishes and status as property to the Dishes component */}
              <Dishes dishes={this.state.dishes} status={this.state.status} />
            </div>
          </div>
        </div>  
      </div>
    );
  }
}


export default SelectDish;
