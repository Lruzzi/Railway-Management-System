const railway = require('../models/railway.model');

async function login(req,res){
    try{
        const result = await railway.login(req.query);
        res.json(result);
    }catch(err){
        res.json(err);
    }
}

async function addAdmin(req,res){
    try{
        const result = await railway.addAdmin(req.body);
        res.json(result);
    }catch(err){
        res.json(err);
    }
}

async function home(req,res){
    try{
        const result = await railway.home(req.query);
        res.json(result);
    }catch(err){
        res.json(err);
    }
}

module.exports = {
    login,
    addAdmin,
    home
}