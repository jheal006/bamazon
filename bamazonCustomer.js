// List Required Nodes / JS files / Variables
var mysql = require("mysql");
var inquirer = require('inquirer');
// Decorative Var for Console
var lineBreak = "==========================================";

// Create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3307,
  // Your username
  user: "root",
  // Your password
  password: "Zaq!2wsxcv",
  database: "bamazon_db"
});

// Connect to the mysql server and sql database
// connection.connect(function(err) {
//   if (err) throw err;
//   // run the start function after the connection is made to prompt the user
//   start();
// });

// Var to check and see if product does in fact exist
var isProduct = function(){
    connection.query("SELECT item_id FROM products",
    function(err){
      if (err) throw err;
      console.log(results);
    }
    );
  };


// function which first prompts the user for which item they would like to purchase
function start() {
  inquirer
    .prompt([
    {
      name: "productID",
      type: "input",
      message: "Please input the productID for the item you would like to purchase: \n",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    },
    {
    name: "units",
    type: "input",
    message: "How many units would you like to purchase? \n",
    validate: function(value) {
      if (isNaN(value) === false) {
        return true;
      }
      return false;
    }
  }])
    .then(function(answers) {
      // if the entered productID matches a product then reduce by the answers.units
      var query = "SELECT stock_quantity FROM products WHERE item_id = '2'";
      connection.query(query,
      function(err, res) {
          console.log(res[0].stock_quantity);
          // // re-prompt the user for if they want to bid or post
          // start();
          console.log(answers.units)
        }
      );
      // console.log('Sold!');
    });
}

start();
