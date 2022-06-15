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

async function matchPattern(username, password) {
    const pattern = /^\S*$/;
    if(pattern.test(username) && pattern.test(password)){
        return 'false';
    }
    else if(pattern.test(username)){
        return 'ptrue';
    }
    else if(pattern.test(password)){
        return 'utrue';
    }
    else{
        return 'uptrue';
    }
}

module.exports = {
    comparePassword,
    hashPassword,
    matchPattern
}