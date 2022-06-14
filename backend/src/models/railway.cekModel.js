const db = require('../configs/db.config');
const helper = require('../utils/helper.util');

async function cekSuper(username) {
    const query = `Select super_admin from admin where username like '${username}'`;
    const result = await db.query(query);
    if(result.rowCount === 0){
        return {
            status: false,
            message: 'Data not found'
        }
    }
    if(result.rows[0].super_admin === true){
        return ('super')
    }
    else{
        return ('notsuper')
    }
}

module.exports = {
    cekSuper
}