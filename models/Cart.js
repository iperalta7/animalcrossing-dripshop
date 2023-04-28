const connection = require("../database.js")

class Cart {

  static showCart(custID, callback) {
    const query = `
      SELECT 
        outfit.fitID, 
        outfit.designerEmail, 
        (SELECT bottomName FROM bottoms WHERE bottoms.bottomID = outfit.bottomID) AS bottomName, 
        (SELECT topName FROM tops WHERE tops.topID = outfit.topID) AS topName, 
        (SELECT shoeName FROM shoes WHERE shoes.shoeID = outfit.shoeID) AS shoeName, 
        (SELECT hwName FROM headwear WHERE headwear.hwID = outfit.hwID) AS hwName, 
        (SELECT bagName FROM bags WHERE bags.bagID = outfit.bagID) AS bagName,
        cart.price
      FROM 
        outfit 
        JOIN cart ON outfit.fitID = cart.fitID
      WHERE 
        cart.custID = ?`;
    connection.query(query, [custID, custID], (error, result) => {
      if (error) {
        console.error(error);
        return callback(error, null);
      }
      callback(null, result);
    });
  }

static getCartTotal(custID, callback) {
  const query = 'SELECT SUM(price) AS cartTotal FROM cart WHERE custID = ?';
  connection.query(query, [custID], (error, result) => {
    if (error) {
      console.error(error);
      return callback(error, null);
    }
    const cartTotal = result.length > 0 ? result[0].cartTotal : 0;
    callback(null, cartTotal);
  });
}

    static addFitToCart(custID, fitID, price, callback) {
      const query = "INSERT INTO cart (custID, fitID, price) VALUES (?, ?, ?)";
      connection.query(query, [custID, fitID, price], (error, result) => {
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