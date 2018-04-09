import React, { Component } from 'react';
import './Print.css';
import { Link } from 'react-router-dom';

class Print extends Component {

  constructor(props) {
    super(props)
    
    // we put on state the properties we want to use and modify in the component
    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests(),
      menu: this.props.model.getMenu(),
      menuPrice: this.props.model.calcCost()
    }

  }


  render() {
  	let dishes = null;
  	dishes = this.state.menu.map((dish) =>
  	<div key={dish.id} className="well">
  		<div className="row">
	  		<div className="col-sm-12">
	    		<h3>{dish.title}</h3>
	    	</div>
    	</div>
    	<div className="row">
    		<div className="col-sm-4 col-xs-12 margin img">
	  			<img src={dish.image} alt=""/>
    		</div>
    		<div className="col-sm-7 col-xs-12 ">
    			<h3>Preparation</h3>
    			<p>{dish.instructions}</p>
    		</div>		
    			
    	</div>
	</div>	


  	)
    return (
   	<div className="printView row">
   		<div className="row">
	      <div className="col-sm-9" >
	      	<h2>My dinner: {this.state.numberOfGuests} people</h2> 
	      </div>
	      <div className="col-sm-3">
	      	<Link to="/search">
	        	<button className="btn btn-default">Go back and edit dinner</button>
	        </Link>
	      </div>
	    </div>


	  <div className="row">
	  	{dishes}
	  </div>

	</div>



    );
  }
}

export default Print;
