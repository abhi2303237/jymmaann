sequelize = require('../../sequelize');
db = require('../../database');
var fs = require('fs');
const path = __dirname + '/../../../sms-tool/files/testFile.csv';

db.connect();
const getText = (req,res,next) => {
    sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

    res.send("This is a dummy api");
}

const saveFile = (req,res,next) => {
fs.writeFile(path,req.files.file.data,function(err){
  if(err)return console.log(err);
  console.log("The file is saved");
})

  
res.status(200).send('File Saved Successfully...');
}

module.exports = {
    getText : getText,
    saveFile: saveFile
};