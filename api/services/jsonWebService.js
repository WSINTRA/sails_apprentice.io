const jwt = require('jsonwebtoken')
const SECRET = 'WillysGog'
module.exports = {
    issuer(payLoad, expiresIn){
        return jwt.sign(payLoad, SECRET, {
            expiresIn
        });
    },

    verify(token){
        return jwt.verify(token, SECRET);
    }
}