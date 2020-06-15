const bcrypt = require('bcrypt');
//Number of times to salt the password,
const SALT_ROUNDS = 10;
module.exports = {
    //Created a hash for basic login functionality
    async hashPassword(password){
        return await bcrypt.hash(password, SALT_ROUNDS);
    },
    async comparePassword(){

    }
}