import React, { Component } from 'react';
import './SelectDish.css';
import Sidebar from '../Sidebar/Sidebar';
import Dishes from '../Dishes/Dishes';


class SelectDish extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filter: '',
      type: '',
      dishes: '',
    };



    //this.fetchDishes = this.fetchDishes.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  fetchDishes() {

    //något blir fel vid inläsningen av dishes, result innehåller inget. 

    this.props.model.getAllDishes().then(dishes => {   //this.state.search
      this.setState({
        status: 'LOADED',
        dishes: dishes.results
      })
            console.log("loaded" +  this.state.type);



    }).catch(() => {
      this.setState({
        status: 'ERROR'
      })
     console.log("error");

    })

    // this.setState({
    //   dishes: resultat
    // })
  }


  // this methods is called by React lifecycle when the 
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to setup model observer
  componentDidMount() {

    this.props.model.addObserver(this);
    this.fetchDishes();
    let type = localStorage.getItem("SelectedType");

    this.setState({
      type: type,
    });
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
      type: Type
    });

  }

  handleSubmit(event){

    this.props.model.setSearchType(this.state.type);
    this.props.model.setInputData(this.state.filter);

    this.setState({
      Uppdate: 'yes'
    });

    event.preventDefault();
    //this.fetchDishes()

  }

  


  render() {
    //const searchTerm = this.state.type + '&query=' + this.state.filter;

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
                    <input className="form-control" type="text" onChange={this.handleInputChange} value={this.state.filter} id="keywords" placeholder="Enter key words"/>
                  </div>
                  <div className="form-group">
                    <select id="selectOption" className="form-control" value={this.state.type} onChange={this.handleSelectChange}>
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
                <div>
                {this.state.typ}</div>
              </div>
            </div>

            <div className="row">
              <Dishes dishes={this.state.dishes} status={this.state.status}/>
            </div>
          </div>
        </div>  
      </div>
    );
  }
}


export default SelectDish;
