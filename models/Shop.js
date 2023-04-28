const connection = require('../database');


/**
 * Shop class for fetching outfits and related data.
 */
class Shop {

/**
   * Fetch all outfits from the database.
   * @param {function} callback - The callback function to handle the results.
   */
  static fetchAllOutfits(callback) {
    const query = `
    SELECT o.fitID, o.designerEmail, b.price AS bottom_price,t.price AS top_price,s.price AS 
      shoe_price,h.price AS hw_price,g.price AS bag_price,b.bottomName,t.topName,
      s.shoeName,h.hwName, g.bagName,
      (b.price + t.price + s.price + h.price + g.price) AS total_price
FROM 
    outfit o
    JOIN bottoms b ON b.bottomID = o.bottomID
    JOIN tops t ON t.topID = o.topID
    JOIN shoes s ON s.shoeID = o.shoeID
    JOIN headwear h ON h.hwID = o.hwID
    JOIN bags g ON g.bagID = o.bagID;
    `;
    connection.query(query, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, results);
    });
  }

  /**
   * Fetch outfits by a specific designer's email.
   * @param {string} designerEmail - The designer's email to filter outfits by.
   * @param {function} callback - The callback function to handle the results.
   */
  static fetchOutfitsByDesigner(designerEmail, callback) {
    const query = `
    SELECT 
    o.fitID,
    o.designerEmail,
    (SELECT bottomName FROM bottoms WHERE bottomID = o.bottomID) as bottomName,
    (SELECT topName FROM tops WHERE topID = o.topID) as topName,
    (SELECT shoeName FROM shoes WHERE shoeID = o.shoeID) as shoeName,
    (SELECT hwName FROM headwear WHERE hwID = o.hwID) as hwName,
    (SELECT bagName FROM bags WHERE bagID = o.bagID) as bagName,
    ((SELECT price FROM bottoms WHERE bottomID = o.bottomID) +
        (SELECT price FROM tops WHERE topID = o.topID) +
        (SELECT price FROM shoes WHERE shoeID = o.shoeID) +
        (SELECT price FROM headwear WHERE hwID = o.hwID) +
        (SELECT price FROM bags WHERE bagID = o.bagID)) AS total_price
FROM outfit o
WHERE o.designerEmail = ?;
    `;
    connection.query(query, [designerEmail], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, results);
    });
  }
}
    

module.exports = Shop;