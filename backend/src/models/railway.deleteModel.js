const db = require('../configs/db.config');
const helper = require('../utils/helper.util');

async function deleteTarif(req) {
    var id_tarif = req.body.id_tarif;
    if (id_tarif) {
        const query = `delete from tarif where id_tarif = '${id_tarif}';`; //query delete data tarif
        const result = await db.query(query);
        if(result){
            return('deleted');
        }
        else{
            return('faile');
        }
        
    }
    else {
        return ('empty');
    }
}

module.exports = {
    deleteTarif
}