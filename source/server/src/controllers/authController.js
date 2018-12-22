var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const sequelize = require('../../sequelize');
const errors = require('../utils/Errors');
const userRepository = require('../repositories/userRepository');
const Promise = require('promise');

module.exports = {
    postSignIn: function (req, res, next) {
        userRepository.getUserByUserName(req.body.username)
        .then(function(user){
            if(!user)res.status(404).send('No user found');
            else{
                if(user.validPassword(req.body.password)){
                    var token = jwt.sign({ userName: user.userName,userId: user.userId }, process.env.JYMMAANN_SECRET_KEY, {
                        expiresIn: 86400 // expires in 24 hours
                      });
                    res.status(200).send({ auth: true, token: token });
                }
            }
        })
    },
    register: function (req, res, next) {
        var data = Object.assign({}, req.body);
        userRepository.createUser(data)
            .then(function(user){
                var token = jwt.sign({ userName: user.userName,userId: user.userId }, process.env.JYMMAANN_SECRET_KEY, {
                              expiresIn: 86400 // expires in 24 hours
                            });
                res.status(200).send({ auth: true, token: token });
        });
    },
};