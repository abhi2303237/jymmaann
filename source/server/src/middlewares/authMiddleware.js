var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const sequelize = require('../../sequelize');
const errors = require('../utils/Errors');
const userRepository = require('../repositories/userRepository');
const tenantRepository = require('../repositories/tenantRepository');
const Promise = require('promise');

module.exports = {
    validateUser: function(req,res,next){
        var token = req.headers['x-access-token'];
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
        jwt.verify(token, process.env.JYMMAANN_SECRET_KEY, function(err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            userRepository.getUserById(decoded.userId)
            .then(function(user){
                if(!user){
                    res.status(404).send('No user found');
                }
                else {
                    req.user = user;
                    res.send(user);
                    //next();
                }
            })
        });
    }
}