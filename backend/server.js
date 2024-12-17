const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./db');

const bookRoutes = require('./routes/books'); 

const app = express();

app.use(cors());
app.use(bodyParser.json());


app.use('/api/books', bookRoutes); 

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await sequelize.sync({ alter: true });
    console.log('Database synchronized');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
});
