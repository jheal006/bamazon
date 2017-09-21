// List Required Nodes / JS files / Variables
var mysql = require("mysql");
var inquirer = require('inquirer');
require("console.table");
// Decorative Var for Console
var lineBreak = "==========================================";

// Create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3307,
  // Your username
  user: "root",
  // Your password
  password: "",
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
    // After collecting Product ID from User and Quantity of items, check to make sure there are enough items in stock, and update DB accordingly
    .then(function(answers) {
      var id = answers.productID;
      // if the entered productID matches a product then reduce by the answers.units
      var querySearch = "SELECT * FROM products WHERE ?";
      var queryUpdate = "UPDATE products SET ? WHERE ?";
      connection.query(querySearch, { item_id: id },
        function (err, res) {
          var quantity = res[0].stock_quantity;
          if (quantity > answers.units) {
            quantity = quantity - answers.units;
            // console.log("QUANTITY ========= ", quantity);
            // console.log("response ========", res);
            connection.query(
              queryUpdate,
              [
                {
                 stock_quantity: quantity
                },
                {
                  item_id: id
                }
              ],
              function(error) {
                if (error) throw err;
                console.log("Bid placed successfully!");
                var itemCost = answers.units * res[0].price;
                console.log("Your order total is $" + itemCost);
                // loadProducts();
                // orders();
              }
            );
          } else {
            console.log('Not enough items in stock!');
            orders();
          }
          // console.log(res);
          // // re-prompt the user for if they want to bid or post
          // console.log(answers.units)
      });
      // console.log('Sold!');
    });
}

// Load list and Array of Products
loadProducts();
