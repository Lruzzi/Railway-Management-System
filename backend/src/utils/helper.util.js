const bcrypt = require('bcrypt');

async function comparePassword(password, hash) {
    if(await bcrypt.compare(password, hash)){
        return true;
    }
    else{
        return false;
    }
}

async function hashPassword(password) {
    hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

module.exports = {
    comparePassword,
    hashPassword
}