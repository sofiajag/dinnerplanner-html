import React, { Component } from 'react';
import './ConfirmDinner.css';
import { Link } from 'react-router-dom';

class ConfirmDinner extends Component {

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
	  		<div className="col-sm-3" key={dish.id}>
	  			<div className="thumbnail">
	  				<img src={dish.image} alt=""/>
	  				<div className="caption">
	  					<h3>{dish.title}</h3>
	  				</div>
	  			</div>
	  			<h4 className="pull-right "> {parseInt(dish.pricePerServing * this.state.numberOfGuests, 10)} SEK </h4>
	  		</div>


  	)
    return (
    	<div className="container-fluid" id="confirm">
		  <div className="row-fluid">
		  	<div className="col-lg-12 page-header">
		    	<div className="col-sm-9" >
		    	<h2>My dinner: {this.state.numberOfGuests} people</h2> 
		    	</div>
	    		<div className="col-sm-3">
	    			<Link to="/search">
	      				<button id="back" className="btn btn-default knapp">Go back and edit dinner</button>
	      			</Link>
	    		</div>
		    </div>  
		   
		  </div>
	  	<div className="row-fluid">
	  		<div className="col-sm-9 col-xs-12">
	  		{dishes}
	  		</div>
	  		<div className="col-sm-3 col-xs-12" > 
		      <ul>
		        <h4>Total: </h4>
		      </ul>
		      <ul>
		        <h4>{this.state.menuPrice}</h4>
		      </ul>
		    </div>
		</div> 
	  	<div className="row-fluid caption">
	    	<div className="col-xs-12">
	    		<Link to="/print">
	      			<button id="print" className="btn btn-default knapp">Print full recipe</button>
	      		</Link>
	    	</div>
	  	</div>
	</div>



    );
  }
}

export default ConfirmDinner;
