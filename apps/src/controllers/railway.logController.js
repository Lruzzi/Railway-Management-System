railway = require('../models/railway.logModel');

async function login(req,res){
    try{
        const result = await railway.login(req);
        res.json(result);
    }catch(err){
        res.json(err);
    }
}

async function getUser(req,res){
    try{
        temp = req.session;
        res.end('<p style="color:white; border-style:solid ;border-color: white;border-radius:25px;width:100px;margin:20px" class="text-center">Hello ' + temp.username + '!</p>');
    }catch(err){
        res.json(err);
    }
}


module.exports = {
    login,
    getUser
}