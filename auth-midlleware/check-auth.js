require('dotenv').config();
const jwt = require('jsonwebtoken');
const ApiError = require('../error/ApiError.js');


module.exports = (req, res, next) => {
    try {
        const AUTH_HEADER = req.headers['authorization'];
        const token = AUTH_HEADER && AUTH_HEADER.split(" ")[1];
        console.log(token);
        const decodet = jwt.verify(token, process.env.APP_TOKEN_SECRET);
        next();
        req.userData = decodet;
    } catch (error) {
        next(ApiError.authError("Error: You don't have permission to access. Auth failed!"));
        return;
    };
};