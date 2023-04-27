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
    SELECT 
    o.fitID,
    o.designerEmail,
    (SELECT bottomName FROM bottoms WHERE bottoms.bottomID = o.bottomID) AS bottomName,
    (SELECT topName FROM tops WHERE tops.topID = o.topID) AS topName,
    (SELECT shoeName FROM shoes WHERE shoes.shoeID = o.shoeID) AS shoeName,
    (SELECT hwName FROM headwear WHERE headwear.hwID = o.hwID) AS hwName,
    (SELECT bagName FROM bags WHERE bags.bagID = o.bagID) AS bagName
FROM 
    outfit o;
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
    (SELECT bagName FROM bags WHERE bagID = o.bagID) as bagName
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