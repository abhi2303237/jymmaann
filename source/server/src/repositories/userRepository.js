const sequelize = require('../../sequelize');
const Promise = require('promise');
var bcrypt = require('bcryptjs');

module.exports = {

    getUserById: function (userId) {
        user = sequelize.user.findOne({ where: { user_id: userId } });
        return Promise.resolve(user);
    },
    getUserByUserName: function (userName) {
        user = sequelize.user.findOne({ where: { user_name: userName } });
        return Promise.resolve(user);
    },
    createUser: function(data){
        //console.log(data);
        var hashedPassword = bcrypt.hashSync(data.password, 8);
        var user = sequelize.user.create({
            userName: data.username,
            email: data.email,
            passwordHash:hashedPassword,
            tenantId : data.tenantId,
            userType : 'Administrator'
        });
        return Promise.resolve(user)
    }

}