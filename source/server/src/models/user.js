const bcrypt = require("bcrypt-nodejs");
module.exports = function (sequelize, DataTypes) {
    const user = sequelize.define('user', {
        userId: {
            field: 'user_id',
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        userName: {
            field: 'user_name',
            type: DataTypes.STRING(200)
        },
        userType: {
            field: 'user_type',
            type: DataTypes.STRING(200)
        },
        tenantId: {
            field: 'tenant_id',
            type: DataTypes.STRING(200)
        },
        email: {
            type: DataTypes.STRING(200)
        },
        passwordHash: {
            field: 'password_hash',
            type: DataTypes.STRING(200)
        },
        firstName: {
            field: 'first_name',
            type: DataTypes.STRING(200)
        },
        lastName: {
            field: 'last_name',
            type: DataTypes.STRING(200)
        }
    },
        {
            tableName: 'user_master',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        });
    user.prototype.generateHash = function (password) {
            return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
          };
    user.prototype.validPassword = function (password) {
            return bcrypt.compareSync(password, this.passwordHash)
          }
    return user;
};
