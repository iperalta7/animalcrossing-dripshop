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
    b.bottomName as bottomName,
    t.topName as topName,
    s.shoeName as shoeName,
    h.hwName as hwName,
    bg.bagName as bagName
  FROM outfit o
  JOIN bottoms b ON o.bottomID = b.bottomID
  JOIN tops t ON o.topID = t.topID
  JOIN shoes s ON o.shoeID = s.shoeID
  JOIN headwear h ON o.hwID = h.hwID
  JOIN bags bg ON o.bagID = bg.bagID;
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
    b.bottomName as bottomName,
    t.topName as topName,
    s.shoeName as shoeName,
    h.hwName as hwName,
    bg.bagName as bagName
  FROM outfit o
  JOIN bottoms b ON o.bottomID = b.bottomID
  JOIN tops t ON o.topID = t.topID
  JOIN shoes s ON o.shoeID = s.shoeID
  JOIN headwear h ON o.hwID = h.hwID
  JOIN bags bg ON o.bagID = bg.bagID
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