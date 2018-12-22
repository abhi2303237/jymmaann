const db        = {};
const Sequelize = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize(process.env.JYMMAANN_DB_DATABASE, process.env.JYMMAANN_DB_USER, process.env.JYMMAANN_DB_PASSWORD, {
  host: process.env.JYMMAANN_DB_HOST,
  dialect: 'postgres',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

/////////////////////////////////////loading Models/////////////////////////////////
db.user = require('./src/models/user')(sequelize, Sequelize);
/////////////////////////////////////database constrains/////////////////////////////


/////////////////////////////////////////////////////////////////////////////////////


//db.user.hasOne(db.trackHistory, { foreignKey: 'user_id' });
////Below option has to be used carefully////
//setting 'force : true' will drop the existing
//database and re-create.
// alter: true is not working as expected
//because of some bugs in sequalize

    /////////////////////////////////////
    //  sequelize.sync({
    //   force: true,
    //   //alter: false
    //  });
    /////////////////////////////////////


    module.exports = db;