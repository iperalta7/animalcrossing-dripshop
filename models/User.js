const connection = require("../database.js")

class User {
    /**
     * Creates a new User instance.
     * @param {string} username - The username of the user.
     * @param {string} password - The password of the user.
     */
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    /**
     * Finds a user by the provided username.
     * @param {string} username - The username to search for.
     * @param {function} callback - A callback function to handle the result.
     */
    static findOne(username, callback) {
        const query = "SELECT * FROM customers WHERE username = ? LIMIT 1";

        connection.query(query, [username], (error, rows) => {
            if (error) {
                return callback(error, null);
            }

            if (rows.length > 0) {
                const { username, password } = rows[0];
                return callback(null, new User(username, password));
            }

            return callback(null, null);
        });
    }
}


module.exports = User;
