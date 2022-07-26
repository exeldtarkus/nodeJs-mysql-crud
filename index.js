const express = require('express');

const app = express()
const port = 3300;


require('./app/routes/index')(app);
const index = app.listen(port, () => {
	console.log(`running node on ${port}`);
});

module.exports = index;