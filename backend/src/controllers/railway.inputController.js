const railway = require('../models/railway.inputModel');

async function inputTarif(req,res){
    try{
        const result = await railway.inputTarif(req);
        console.log(result)
        res.json(result);
    }
    catch(err){
        res.json(err);
    }
}

async function inputAdmin(req,res){
    try{
        const result = await railway.inputAdmin(req);
        console.log(result)
        res.json(result);
    }
    catch(err){
        res.json(err);
    }
}

module.exports = {
    inputTarif,
    inputAdmin
}