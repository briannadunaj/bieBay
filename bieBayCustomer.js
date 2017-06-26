var mysql = require("mysql");
var inquirer = require("inquirer");

var userID = [];

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password:"",
	database: "biebay"
});

connection.connect(function(err){
	console.log("Connected as id: " + connection.threadId);
	getId();
});

var getId = function(){

		inquirer.prompt({
			name: "productId",
			type: "input",
			message: "What is the ID of the product you would like to buy?"
		}).then(function(answer){
			var ID = answer.productId;
			
			connection.query("SELECT `item_id`, `product_name`, `price`, `stock_quantity` FROM `products` WHERE `item_id` = ?", [ID], function(err, results){
				if (err) {
					console.log("Select product ID error");
				} else {
					console.log("Item ID #" + ID + " is " + results[0].product_name);
					userID.push(ID);
					getUnits();
				}

			}) // end of connection.query
		}); // end of product ID question
} // end of getId function

var getUnits = function(){
	inquirer.prompt({
		name: "productUnits",
		type: "input",
		message: "How many units would you like to purchase?"
	}).then(function(answer){
		var units = answer.productUnits;

		connection.query("SELECT `item_id`, `product_name`, `price`, `stock_quantity` FROM `products` WHERE `item_id` = ?", [userID], function(err, results){
			if (err) {
				console.log("Select product units error");
			}

			console.log("You want " + units + " units");
			
			if (units < results[0].stock_quantity){
				console.log("OK");
			} else {
				console.log("Not enough in stock.");
			}
		}) // end of connection.query
	}) //end of product units question
} // end of getUnits function
