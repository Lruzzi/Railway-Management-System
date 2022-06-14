const railway = require('../models/railway.cekModel');

async function cekSuper(username){
    try{
        const result = await railway.cekSuper(username);
        return result;
    }
    catch(err){
        return err;
    }
}

module.exports = {
    cekSuper
}

