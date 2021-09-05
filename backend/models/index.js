require('dotenv').config();

const path = require('path');
const fs = require('fs');
const basename = path.basename(__filename);
const db = {};

const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DB, process.env.USER, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: process.env.dialect
});

sequelize.authenticate()
  .then(() =>
    console.log('Connexion OK !') 
  ).catch((error) => console.log('Connexion échouée!',error))

  fs.readdirSync(__dirname).filter(file => { 
  return (file.indexOf('.')!==0) && (file !== basename) && (file.slice(-3)==='.js')
})

.forEach(file => { 
  const Model = require(path.join(__dirname,file)) (sequelize,Sequelize.DataTypes);
  db[Model.name] = Model;
})

Object.keys(db).forEach(modelname => {
  if (db[modelname].associate) {
    db[modelname].associate(db)
  }
})

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;