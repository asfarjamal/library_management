const { Sequelize } = require('sequelize');
require('dotenv').config();  


const sequelize = new Sequelize({
  dialect: 'mysql', 
  host: process.env.DB_HOST, 
  username: process.env.DB_USER,  
  password: process.env.DB_PASSWORD,  
  database: process.env.DB_NAME, 
  logging: false,  
});
sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
