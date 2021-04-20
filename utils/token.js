require('dotenv').config();
const jwt = require('jsonwebtoken');
const tokenKey =process.env.SECRET_KEY;

function prepareToken(data) {
    return jwt.sign(data, tokenKey, { expiresIn: '60m'});
};


module.exports = { prepareToken };
