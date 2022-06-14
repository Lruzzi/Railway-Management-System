const db = require('../configs/db.config');
const helper = require('../utils/helper.util');
const quer = require('../middleware/railway.tarifquery');

async function updateTarif(req) {
    var id_tarif = req.body.id_tarif;
    var id_rute = req.body.id_rute;
    var harga = req.body.harga;
    const query = await quer.query(id_tarif, id_rute, harga);
    if(query=== 'empty'){
        return ('empty');
    }
    const result = await db.query(query);
    if(result){
        return('updated');
    }
    else{
        return('faile');
    }
}

module.exports = {
    updateTarif
}