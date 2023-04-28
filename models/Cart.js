const connection = require("../database.js")

class Cart {

    static showCart(custID,callback) {
        const query =`SELECT 
        outfit.fitID, 
        outfit.designerEmail, 
        (SELECT bottomName FROM bottoms WHERE bottoms.bottomID = outfit.bottomID) AS bottomName, 
        (SELECT topName FROM tops WHERE tops.topID = outfit.topID) AS topName, 
        (SELECT shoeName FROM shoes WHERE shoes.shoeID = outfit.shoeID) AS shoeName, 
        (SELECT hwName FROM headwear WHERE headwear.hwID = outfit.hwID) AS hwName, 
        (SELECT bagName FROM bags WHERE bags.bagID = outfit.bagID) AS bagName 
      FROM 
        outfit 
      WHERE 
        outfit.fitID IN (SELECT fitID FROM cart WHERE custID = ?);`;
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

    static deleteFromCart(custID, fitID, callback) {
      const query = "DELETE FROM cart WHERE custID = ? AND fitID = ? LIMIT 1";
      connection.query(query, [custID, fitID], (error, result) => {
        if (error) {
          console.error(error);
          return callback(error, null);
        }
        callback(null, result);
      });
    }

    static deleteCartByCustomer(custID, callback) {
      connection.query('DELETE FROM cart WHERE custID = ?', [custID], (error, result) => {
        if (error) {
          callback(error, null);
        } else {
          callback(null, result);
        }
      });
    }
  }

  

module.exports = Cart;