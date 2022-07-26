const database = require('../config/databases')
const { buah } = require('../config/databases')


let modelBuah = (modelBuah) => {
	this.modelBuah = modelBuah.modelBuah;
	this.status = modelBuah.status
	this.created_at = new Date();
}

modelBuah.getList = () => {
  const query = `
    SELECT * FROM buah;
  `
  return database.executeSingleNonTransaction(buah, query)
}

module.exports = {
  modelBuah
};