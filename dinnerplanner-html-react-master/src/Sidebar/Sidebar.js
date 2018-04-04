import React, { Component } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

class Sidebar extends Component {

  constructor(props) {
    super(props)
    
    // we put on state the properties we want to use and modify in the component
    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests(),
      menu: this.props.model.getMenu(),
      menuPrice: this.props.model.calcCost()

    }

  }

  // this methods is called by React lifecycle when the 
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to setup model observer
  componentDidMount() {
    this.props.model.addObserver(this)
  }

  // this is called when component is removed from the DOM
  // good place to remove observer
  componentWillUnmount() {
    this.props.model.removeObserver(this)
  }

  // in our update function we modify the state which will
  // cause the component to re-render
  update() {
    this.setState({
      numberOfGuests: this.props.model.getNumberOfGuests(),
      menu: this.props.model.getMenu(),
      cost: this.props.model.calcCost(),
    });
  }
  // our handler for the input's on change event
  onNumberOfGuestsChanged = (e) => {
    this.props.model.setNumberOfGuests(+e.target.value)
  }

  render() {
    let table = null;
          
      table = this.state.menu.map((dishInMenu) =>
        <tr key={dishInMenu.id}>
          <td>{dishInMenu.title}</td>
          <td>{parseInt(dishInMenu.pricePerServing * this.state.numberOfGuests, 10)}</td>
        </tr>
      )
          
    return (
      <div className="Sidebar">
        <h3>This is the sidebar</h3>
        <p>
        People: <input value={this.state.numberOfGuests} onChange={this.onNumberOfGuestsChanged}/>
        <br/>
        Total number of guests: {this.state.numberOfGuests}
        </p>

        <div className="sidebar-module">
          <table className="table">
            <thead>
              <tr>
                <th>Dish Name</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              {table}
            </tbody>
          </table>
          <table>
          <tbody>
            <tr>
              <td>SEK</td>
              <td>{this.state.menuPrice}</td>
            </tr>
          </tbody> 
          </table>


          <Link to="/ConfirmDinner">
            <button id="confirm" className="btn btn-success">Confirm Dinner</button>  
          </Link>
        </div>
      </div>
    );
  }
}

export default Sidebar;
