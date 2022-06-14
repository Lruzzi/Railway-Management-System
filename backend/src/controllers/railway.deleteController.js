const railway = require('../models/railway.deleteModel');

async function deleteTarif(req,res){
    try{
        const result = await railway.deleteTarif(req);
        console.log(result)
        res.json(result);
    }
    catch(err){
        res.json(err);
    }
}

module.exports = {
    deleteTarif
}