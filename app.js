// app.js
const express = require('express');
const app = express();
const PORT = 4000;
const sequelize = require('./db');
const excelRoutes = require('./routes/fileRouter');

app.use(express.json());
app.use('/', excelRoutes);

sequelize.sync().then(() => {
  console.log('Database & tables created!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
