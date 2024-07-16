const sql = require('mssql');

module.exports = async function (context, req) {

    //TODO : Define SQL connection configuration
    ////const connectionString = process.env.SqlConnectionString;

    // TODO : Create connection pool using connection string
    //// const pool = new sql.ConnectionPool(connectionString);
    //// await pool.connect();

    try {
        if (req.method === "POST") {

            //TODO : Extract the hospital details (Name, Longitude, Latitude, SpecialitiesAvailable, Address) from the request body and throw error if not found
            //// const { Name, Longitude, Latitude, SpecialitiesAvailable, Address } = req.body;

            //// if (!Name || !Longitude || !Latitude || !SpecialitiesAvailable || !Address) {
            ////     context.res = {
            ////         status: 400,
            ////         body: "Please provide all hospital details (Name, Latitude, Longitude, SpecialitiesAvailable, and Address)."
            ////     };
            ////     return;
            //// }

            // TODO : Define SQL query to insert hospital data into Hospitals table (ID, Name, Longitude, Latitude, SpecialitiesAvailable, Address)
            //// const query = `
            ////     INSERT INTO Hospitals (Name, Longitude, Latitude, SpecialitiesAvailable, Address)
            ////     VALUES (@Name, @Longitude, @Latitude, @SpecialitiesAvailable, @Address)
            //// `;
            
            // Execute SQL query with parameters
            await pool.request()
                .input('Name', sql.NVarChar, Name)
                .input('Longitude', sql.Float, Longitude)
                .input('Latitude', sql.Float, Latitude)
                .input('SpecialitiesAvailable', sql.NVarChar, SpecialitiesAvailable)
                .input('Address', sql.NVarChar, Address)
                .query(query);

            context.res = {
                status: 201,
                body: "Hospital data added successfully!"
            };
        } else {
            context.res = {
                status: 400,
                body: { message: 'Please send a POST request' }
            };
        }
    } catch (error) {
        context.log.error('Error adding record:', error);
        context.res = {
            status: 500,
            body: { message: 'Error adding hospital record' }
        };
    } finally {
        // TODO: Close the SQL connection
        //// await pool.close();
    }
};
