const railway = require('../models/railway.updateModel');

async function updateTarif(req,res){
    try{
        const result = await railway.updateTarif(req);
        console.log(result)
        res.json(result);
    }
    catch(err){
        res.json(err);
    }
}

module.exports = {
    updateTarif
}