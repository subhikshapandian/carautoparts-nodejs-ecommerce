const sql = require("mssql");

var config = {
    "user": 'sa',
    "password": 'sa123',
    "server": 'localhost',
    "database": 'Task',
    "trustServerCertificate": true,
};

module.exports ={
    connection : sql.connect(config)
} 