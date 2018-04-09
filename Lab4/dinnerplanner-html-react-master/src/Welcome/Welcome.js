import React, { Component } from 'react';
import './Welcome.css';
import { Link } from 'react-router-dom';

class Welcome extends Component {
  render() {
    return (
<div id="homeView" className="container home">

      <div className="content">
        <h3>
            Welcome to the dinner planner!
        </h3>
        
        <hr></hr>

        <Link to="/search">
            <button className="btn btn-default btn-lg">Start planning</button>
        </Link>
      
      </div>
</div>
    );
  }
}

export default Welcome;

