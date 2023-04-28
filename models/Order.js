const connection = require("../database.js");

class Order {
  static getOrdersByCustomer(custID, callback) {
    connection.query(
      `SELECT o.orderID, GROUP_CONCAT(oi.fitID) AS fitIDs, o.price
       FROM \`order\` o
       JOIN order_items oi ON o.orderID = oi.orderID
       WHERE o.custID = ?
       GROUP BY o.orderID`,
      [custID],
      (error, results) => {
        if (error) {
          callback(error, null);
        } else {
          callback(null, results);
        }
      }
    );
}

  static createOrder(custID, fitIDs, total, callback) {
    // Insert a new row into the order table with the custID
    connection.query(
      "INSERT INTO `order` (`custID`,`price`) VALUES (?,?)",
      [custID,total],
      (error, result) => {
        if (error) {
          callback(error, null);
        } else {
          // Get the orderID of the newly inserted row
          const orderID = result.insertId;

          // Loop through the array of fitIDs and insert a new row into the order_items table for each fitID
          for (let i = 0; i < fitIDs.length; i++) {
            connection.query(
              "INSERT INTO `order_items` (`orderID`, `fitID`) VALUES (?, ?)",
              [orderID, fitIDs[i]],
              (error, result) => {
                if (error) {
                  callback(error, null);
                }
              }
            );
          }

          callback(null, "Order created successfully.");
        }
      }
    );
  }
}

module.exports = Order;
