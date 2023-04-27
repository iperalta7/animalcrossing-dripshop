const connection = require("../database.js")

class Cart {

    static showCart(custID,callback) {
        const query =`SELECT outfit.fitID, outfit.designerEmail, bottoms.bottomName, tops.topName, shoes.shoeName, headwear.hwName, bags.bagName
        FROM outfit
        JOIN bottoms ON outfit.bottomID = bottoms.bottomID
        JOIN tops ON outfit.topID = tops.topID
        JOIN shoes ON outfit.shoeID = shoes.shoeID
        JOIN headwear ON outfit.hwID = headwear.hwID
        JOIN bags ON outfit.bagID = bags.bagID
        JOIN cart ON outfit.fitID = cart.fitID
        WHERE cart.custID = ?;`;
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
  }

module.exports = Cart;