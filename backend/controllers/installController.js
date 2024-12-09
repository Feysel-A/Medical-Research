const fs = require('fs');
const path = require('path');
const installService = require('../services/installService');

const executeSQLFile = async (req, res) => {
    try {
        const sqlFilePath = path.join(__dirname, '/schema.sql');
        const sqlCommands = fs.readFileSync(sqlFilePath, 'utf8');
        await installService.executeSQL(sqlCommands);
        res.status(200).send('Database tables created successfully!');
    } catch (error) {
        console.error('Error during installation:', error);
        res.status(500).send('Failed to create tables.');
    }
};

module.exports = { executeSQLFile };
