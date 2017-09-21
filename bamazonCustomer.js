// List Required Nodes / JS files / Variables
var mysql = require("mysql");
var inquirer = require('inquirer');
require("console.table");
// Decorative Var for Console
var lineBreak = "==========================================";

// Create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "hkg36c",
  database: "bamazon_db"
});

//Load product table
function loadProducts() {
  connection.query("SELECT * FROM products",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      orders();
    });
};


// function which first prompts the user for which item they would like to purchase
function orders() {
  inquirer
    .prompt([
      {
        name: "productID",
        type: "input",
        message: "Please input the productID for the item you would like to purchase: \n",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          console.log("Please enter a item ID!");
          return false;
        }
      },
      {
        name: "units",
        type: "input",
        message: "How many units would you like to purchase? \n",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          console.log("Please enter a item ID!");
          return false;
        }
      }])
    .then(function (answers) {
      var id = answers.productID;

      // Alert if what entered is not a number!
      if (isNaN(id)) {
        console.log("Please enter a item ID!");
        orders();
      }
      // if the entered productID matches a product then reduce by the answers.units
      var querySearch = "SELECT * FROM products WHERE ?";
      var queryUpdate = "UPDATE stock_quantity SET ? WHERE ?";
      connection.query(querySearch, { item_id: id },
        function (err, res) {
          var quantity = res[0].stock_quantity;
          if (quantity > answers.units) {
            quantity = quantity - answers.units;
            
            console.log(quantity);
          } else {
            console.log('Not enough items in stock!');
            orders();
          }
          // console.log(res);
          // // re-prompt the user for if they want to bid or post
          // console.log(answers.units)
        }
      );
      // console.log('Sold!');
    });
}


loadProducts();