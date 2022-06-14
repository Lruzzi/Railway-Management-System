async function query(id_admin, username, hash) {
    if(username && hash){
        return(`update admin set username = '${username}', password = '${hash}' where id_admin = '${id_admin}';;`);
    }
    else if(username){
        return(`update admin set username = '${username}' where id_admin = '${id_admin}';`);
    }
    else if(hash){
        return(`update admin set password = '${hash}' where id_admin = '${id_admin}'`);
    }
    else{
        return('empty');
    }
}

module.exports = {
    query
}