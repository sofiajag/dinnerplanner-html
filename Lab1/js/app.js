$(function() {
	//We instantiate our model
	var model = new DinnerModel();

	
	// And create the instance of ExampleView
	var sideView = new SideView($("#sideView"), model);
	var mainPic = new MainPic($("#mainPic"), model);
	var mainView3 = new MainView3($("#mainView3"), model);
	var mainView5 = new MainView5($("#mainView5"), model);



	/**
	 * IMPORTANT: app.js is the only place where you are allowed to
	 * use the $('someSelector') to search for elements in the whole HTML.
	 * In other places you should limit the search only to the children 
	 * of the specific view you're working with (see exampleView.js).
	 */

});