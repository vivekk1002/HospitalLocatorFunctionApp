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
        if (req.method === "GET") {

            // TODO : Define SQL query to select all hospitals
            //// const query = `
            ////     SELECT * FROM Hospitals
            //// `;
            
            // TODO : Execute SQL query and return the result
            //// const result = await pool.request()
            ////     .query(query);

            //// context.res = {
            ////     status: 200,
            ////     body: result.recordset
            //// };
        } else {
            context.res = {
                status: 400,
                body: { message: 'Please send a GET request' }
            };
        }
    } catch (error) {
        context.log.error('Error during fetching data:', error);
        context.res = {
            status: 500,
            body: { message: "Error while fetching hospitals' data" }
        };
    } finally {
        // Close the SQL connection
        await pool.close();
    }
};
