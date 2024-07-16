const sql = require('mssql');
const crypto = require('crypto');

module.exports = async function (context, req) {

    //TODO: Create Table Users with columns Username, PasswordHash, Salt, isAdmin in database
    
    // Define SQL connection configuration
    const connectionString = process.env.SqlConnectionString;

    // Create connection pool using connection string
    const pool = new sql.ConnectionPool(connectionString);
    await pool.connect();


    try {
        if (req.method === "POST") {
            const { Username, Password, isAdmin } = req.body;

            if (!Username || !Password) {
                context.res = {
                    status: 400,
                    body: "Please provide username and password."
                };
                return;
            }

            // Generate a Salt
            const Salt = crypto.randomBytes(16).toString('hex');
            
            // Hash the password with the Salt
            const hash = crypto.pbkdf2Sync(Password, Salt, 1000, 64, 'sha512').toString('hex');

            // Define SQL query to insert user/admin. To add admin, while sending request isAdmin should be send as 1
            const query = `
                INSERT INTO Users (Username, PasswordHash, Salt, isAdmin)
                VALUES (@Username, @PasswordHash, @Salt, @isAdmin)
            `;

            // Execute SQL query with parameters
            await pool.request()
                .input('Username', sql.NVarChar, Username)
                .input('PasswordHash', sql.NVarChar, hash)
                .input('Salt', sql.NVarChar, Salt)
                .input('isAdmin', sql.Bit, isAdmin ?? 0)
                .query(query);

            context.res = {
                status: 201,
                body: "User created successfully!"
            };
        } else {
            context.res = {
                status: 400,
                body: { message: 'Please send a POST request' }
            };
        }
    } catch (error) {
        if (error.code === 'EREQUEST' && error.originalError.info.number === 2627) {
            // Handle unique constraint violation (duplicate username)
            context.res = {
                status: 409, // Conflict
                body: { message: 'Username already exists. Please choose a different username.' }
            };
        } else {
            context.log.error('Error creating user:', error);
            context.res = {
                status: 500,
                body: { message: 'Error creating user' }
            };
        }
    } finally {
        // Close the SQL connection
        await pool.close();
    }
};
