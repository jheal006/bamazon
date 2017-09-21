var queryUpdate = "UPDATE stock_quantity SET ? WHERE ?";
connection.query(querySearch, { item_id: id },
  function (err, res) {
    var quantity = res[0].stock_quantity;
    if (res[0].stock_quantity > answers.units) {
      quantity = quantity - answers.units;
        //If enough items instock, udpate the database
        connection.query(queryUpdate,
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
            console.log("Update complete");
            loadProducts();
          }
        );