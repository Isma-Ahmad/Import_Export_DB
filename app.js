const express = require('express');
const app = express();
const routes = require('./routes/fileRouter');
const fileUpload = require('express-fileupload');


app.use(express.json());
app.use(fileUpload());

app.use('/', routes);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
