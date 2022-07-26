const mysql = require('mysql2');
const response = require('../lib/response')
const databases = require('../config/databases')
const {buahCRUD} = require('../controllers/buah');
const e = require('express');


module.exports = (app) => {
  app.get('/checkManualConnection', (req, res) => {
    const pool = mysql.createPool({ 
      connectionLimit: 100,
      host: 'localhost',
      port: 3309,
      user: 'root',
      password: '',
      database: 'nodeJsTesting',
      enableKeepAlive: true,
      keepAliveInitialDelay:1000  
    })

    pool.getConnection((err, connection) => {
      if(err) {
        return response.forbidden('database tidak terkoneksi', res)
      } else {
        return response.custom(200, {message: 'databases terkoneksi'}, res)
      }
    })
  })

  app.get('/checkDatabaselConnection', (req, res) => {
    const connect = databases.checkConnection(databases.buah)
    console.log('connect :', connect)
  })

  app.get('/buah', (req, res) => {
    buahCRUD.getList(req, (error, data) => {
      if (error) {
        return response.error('error', res)
      } else {
        return response.custom(200, data, res)
      }
    })
  })
}