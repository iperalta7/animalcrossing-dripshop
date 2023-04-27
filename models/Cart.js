const connection = require("../database.js")

class Cart {

    static showCart(custID,callback) {
        const query = "SELECT outfit.*, cart.custID FROM outfit JOIN cart ON outfit.fitID=cart.fitID WHERE cart.custID=?";
        connection.query(query, [custID], (error, result) => {
          if (error) {
            console.error(error);
            return callback(error, null);
          }
          callback(null, result);
        });
      }

    static addFitToCart(custID, fitID, callback) {
      const query = "INSERT INTO cart (custID, fitID) VALUES (?, ?)";
      connection.query(query, [custID, fitID], (error, result) => {
        if (error) {
          console.error(error);
          return callback(error, null);
        }
        callback(null, result);
      });
    }
  }

module.exports = Cart;