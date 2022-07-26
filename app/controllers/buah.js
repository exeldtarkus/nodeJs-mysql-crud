const {modelBuah} = require('../models/buah')

const buahCRUD = {
  getList: async (req, result) => {
    const getListBuah = await modelBuah.getList()
    console.log('getListBuah :', getListBuah)
    return result(null, getListBuah)
  }
}

module.exports = {
  buahCRUD
}