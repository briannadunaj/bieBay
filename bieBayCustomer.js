var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password:"",
	database: "biebay"
});

connection.connect(function(err){
	console.log("Connected as id: " +connection.threadId);
	start();
});

var start = function(){


		inquirer.prompt({
			name: "productId",
			type: "input",
			message: "What is the ID of the product you would like to buy?"
		}).then(function(answer){
			var userId = answer.productId;
			
			connection.query("SELECT `item_id`, `product_name`, `price`, `stock_quantity` FROM `products` WHERE `item_id` = ?", [userId], function(err, results){
				if (err) {
					console.log("select products error");
				} else {
					console.log("Item ID #" + userId + " is " + results[0].product_name);
				}

			}) // end of connection.query
		}); // end of product ID question


} // end of start function

