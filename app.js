// app.js
const express = require('express');
const sequelize = require('./db');
const excelRoutes = require('./routes/fileRouter');

const app = express();
const PORT = 4000;

sequelize.sync().then(() => {
  console.log('Database & tables created!');
});


app.use(express.json());
app.use('/', excelRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
