
const mysql = require('mysql2');


exports.buah = mysql.createPool({
  connectionLimit: 100,
  host: 'localhost',
  port: 3309,
  user: 'root',
  password: '',
  database: 'nodeJsTesting',
  enableKeepAlive: true,
  keepAliveInitialDelay:1000  
});


exports.checkConnection = (db) => {
  return new Promise((resolve, reject) => {
    db.getConnection(function (err, connection) {
      if (err) {
        console.error({ status: 'error', err, rollback: false });
        return reject(err);
      } else {
        return resolve('database terkoneksi');
      }
    })
  });
};

exports.executeSingleNonTransaction = (db, sql, args) => {
  return new Promise((resolve, reject) => {
    db.query(sql, args, (error, results, fields) => {
      if (error)
      { 
        console.error({ status: 'error -59', error, rollback: false });
        reject(error);
      }
      else resolve(results);
    });
  });
};

exports.execute = (db, sql, args) => {
  return new Promise((resolve, reject) => {
    db.getConnection(function (err, connection) {
      if (err) {
        console.error({ status: 'error', err, rollback: false });
        return reject(err);
      }

      connection.query(sql, args, (err, result) => {
        if (err) {
          connection.release();
          return reject(err);
        }
        connection.commit((err) => {
          if (err) {
            connection.rollback(() => {
              console.error({ status: 'error', err, rollback: true });
              connection.release();
              return reject(err);
            });
          }
          connection.release();
          return resolve(result);
        });
      });
    })
  });
}