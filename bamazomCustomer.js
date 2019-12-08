// the npm packages used
const mysql = require("mysql");
const inquirer = require("inquirer");

// creating the connection with the sql database
const connection = mysql.createConnection({
  host: "localhost",

  // My port number
  port: 3306,

  // my username
  user: "root",

  // my password and name of the sql database
  password: "",
  database: "bamazon"
});

// connecting with the sql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  console.log("PLEASE SEE BELOW YOUR LIST OF PRODUCTS AVAILABLE");
  afterConnection();
});

// 
function afterConnection() {
  connection.query("SELECT item_id,product_name,deparment_name, price, stock_quantity FROM products", function (err, res) {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      console.log(`${res[i].item_id} | ${res[i].product_name} | ${res[i].deparment_name} | ${res[i].price} | ${res[i].stock_quantity}`);
    }
    console.log("-----------------------------------");
    customerRequest();
  });
};

//function that ask the questions to the customer
function customerRequest() {

  inquirer

    .prompt([
      // Here we start with the customer's questions.
      {
        name: "idSelected",
        type: "input",
        question: "Please enter the ID number of the product you want to purchase:"
      },
      // Here we create a basic password-protected text prompt.
      {
        name: "quantitytobePurchased",
        type: "input",
        question: "how many items of this product would you like to purchase?"
      }
    ]).
    then(function (inquirerResponse) {
      console.log("YOUR ORDER HAS BEEN PLACED")

      //Variables that reflect the customer's selection

      var productIDSelected = inquirerResponse.idSelected;
      var productQuantitySelected = inquirerResponse.quantitytobePurchased;

      connection.query("SELECT * FROM products WHERE ?",
        [
          {
            item_id: productIDSelected
          }
        ],
        function (err, res) {
          if (err) throw err;

          if (productQuantitySelected > res[0].stock_quantity) {
            //case where there is not enough item's selected in stock
            console.log("THERE IS INSUFFICIENT QUANTITY");
            morePurchase();
          }
          else {
            console.log("YOUR ORDER HAS BEEN PROCESSED");

            //UPDATING SQL DATABASE
            var totalCost = parseFloat(res[0].price * productQuantitySelected);

            var newStock = res[0].stock_quantity - productQuantitySelected;

            var id = res[0].item_id;
            var productName = res[0].product_name;
            var deparmentName = res[0].deparment_name;
            var price = res[0].price;

            connection.query("UPDATE products SET ? WHERE ?",
              [
                {
                  stock_quantity: newStock
                },
                {
                  item_id: productIDSelected
                }
              ],
              function (err, res) {
                console.log("\nItem number:" + id +
                  "\nProduct name:" + productName +
                  "\nDeparment:" + deparmentName +
                  "\nPrice per item:" + price +
                  "\nNumber of item ordered:" + productQuantitySelected +
                  "\nTotal Amount to be paid:" + totalCost + "\n");
                  morePurchase();
              }

            );
          }
        });
    });
}

//FUNCTION THAT ASK THE CUSTOMER IF HE/SHE/THEY WANT TO CONTINUE SHOPPING WITH BAMAZOM
function morePurchase() {
  inquirer.prompt(

    {
      name: "continue",
      type: "confirm",
      question: "Would you like to continue shopping?"
    }
  )
    .then(function (inquirerResponse) {
      if (inquirerResponse.continue === true) {
        customerRequest()
      } else {
        console.log("THANK YOU FOR SHOPPING WITH BAMAZOM");
        connection.end();
      }
    });
}