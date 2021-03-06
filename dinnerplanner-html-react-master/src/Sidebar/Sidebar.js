import React, { Component } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, Button, Collapse } from 'react-bootstrap';

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

  handleRemove(dishId) {
    this.props.model.removeDish(dishId);
  }

  // in our update function we modify the state which will
  // cause the component to re-render
  update() {
    this.setState({
      numberOfGuests: this.props.model.getNumberOfGuests(),
      menu: this.props.model.getMenu(),
      menuPrice: this.props.model.calcCost(),
    });
  }
  // our handler for the input's on change event
  onNumberOfGuestsChanged = (e) => {
    this.props.model.setNumberOfGuests(+e.target.value);
  }

  render() {
    if (localStorage.getItem('NumberOfGuests') === null){
      localStorage.setItem('NumberOfGuests', 2); //sets start value of Number of guests.

    };
    let table = null;
    table = this.state.menu.map((dishInMenu) =>
        <tr key={dishInMenu.id}>
          <td>{dishInMenu.title}</td>
          <td>{parseInt(dishInMenu.pricePerServing * this.state.numberOfGuests, 10)}</td>
          <td>
            <p onClick={() => this.handleRemove(dishInMenu.id)}><i className="fa fa-trash" aria-hidden="true"></i>
            </p>
          </td>
        </tr>
      )
    
     
    return (


      <div className="Sidebar well">
        <div className="sidebar-module sidebar-module-inset">
            <div className="container-fluid">
              <Navbar>
                <Navbar.Header>
                  <Navbar.Brand>
                    <h4>My Dinner: {this.state.menuPrice} SEK</h4>
                  </Navbar.Brand>
                  <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                  <Nav>
                    <NavItem>
                      <p>Number of Guests: <input id="Input" value={this.state.numberOfGuests} onChange={this.onNumberOfGuestsChanged}/></p>
                    </NavItem>
                    <NavItem>
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
                    </NavItem>
                    <NavItem>
                    <table>
                    <tbody>
                      <tr>
                        <td>SEK</td>
                        <td>{this.state.menuPrice}</td>
                      </tr>
                    </tbody> 
                    </table>
                    </NavItem>
                    <NavItem href="/ConfirmDinner">
                      <button id="confirm" className="btn btn-success">Confirm Dinner</button>  
                    </NavItem>

                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            
          </div>   
        </div>
      </div>
    );
  }
}

export default Sidebar;
