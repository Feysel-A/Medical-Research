const db = require('../config/db'); // Your database connection

const executeSQL = async (sqlCommands) => {
    try {
        const commands = sqlCommands.split(';').filter(cmd => cmd.trim()); // Split by ';' to get individual queries
        for (const command of commands) {
            await db.query(command); // Execute each query
        }
    } catch (error) {
        throw new Error('Error executing SQL commands: ' + error.message);
    }
};

module.exports = { executeSQL };
