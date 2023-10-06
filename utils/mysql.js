const mysql = require('mysql2');

const dbConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

let mysqlInstance;

function startMySQL() {
  mysqlInstance = mysql.createConnection(dbConfig);

  mysqlInstance.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
    } else {
      console.log('Connected to MySQL');
    }
  });
}

module.exports = {
  mysqlInstance,
  startMySQL,
};

