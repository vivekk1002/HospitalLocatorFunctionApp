const sql = require('mssql');
const crypto = require('crypto');

module.exports = async function (context, req) {

    //TODO : Define SQL connection configuration
    ////const connectionString = process.env.SqlConnectionString;

    // TODO : Create connection pool using connection string
    //// const pool = new sql.ConnectionPool(connectionString);
    //// await pool.connect();

    try {
        // Check if the request method is POST
        if (req.method === "POST") {

            //TODO : Extract the username and password from the request body and throw error if not found 
            //// const { Username, Password } = req.body;

            //// if (!Username || !Password) {
            ////     context.res = {
            ////         status: 400,
            ////         body: "Please provide both username and password."
            ////     };
            ////     return;
            //// }

            // TODO : Define SQL query to select the user record by username
            //// const query = `
            ////     SELECT PasswordHash, Salt, isAdmin FROM Users
            ////     WHERE Username = @Username
            //// `;

            // TODO : Execute SQL query with parameters and throw error if no user found
            
            //// const result = await pool.request()
            ////     .input('Username', sql.NVarChar, Username)
            ////     .query(query);

            // Hint : Check if the result.recordset is empty and return 401 status code with a message
            //// if (result.recordset.length === 0) {
            ////     context.res = {
            ////         status: 401,
            ////         body: "Invalid username or password."
            ////     };
            ////     return;
            //// }

            // Extract the user record
            const user = result.recordset[0];

            // Hash the provided password with the stored salt
            const inputHash = crypto.pbkdf2Sync(Password, user.Salt, 1000, 64, 'sha512').toString('hex');

            // TODO : Compare the hashed password with the stored hash and return 401 status code with a message if they don't match
            //// if (inputHash !== user.PasswordHash) {
            ////     context.res = {
            ////         status: 401,
            ////         body: "Invalid username or password."
            ////     };
            //// } else {
            ////     context.res = {
            ////         status: 200,
            ////         body: {
            ////             message: "Valid username and password.",
            ////             isAdmin: user.isAdmin
            ////         }
            ////     };
            //// }
        } else {
            context.res = {
                status: 400,
                body: { message: 'Please send a POST request' }
            };
        }
    } catch (error) {
        context.log.error('Error during login:', error);
        context.res = {
            status: 500,
            body: { message: 'Error during login' }
        };
    } finally {
        // TODO : Close the SQL connection pool
        //// await pool.close();
    }
};
