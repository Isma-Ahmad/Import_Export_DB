// controllers/excelController.js
const ExcelJS = require('exceljs');
const multer = require('multer');
const User = require('../models/table');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


const upload = multer({ dest: 'uploads/' });

const importFromExcel = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).send('No file uploaded.');
      }
  
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(req.file.path);
      const worksheet = workbook.getWorksheet(1);
  
      worksheet.eachRow({ includeEmpty: true }, async (row, rowNumber) => {
        if (rowNumber === 1) return; 
  
        const [name, emailCell, age] = row.values.slice(1); 
        const email = typeof emailCell === 'object' ? emailCell.text : emailCell;
        const trimmedEmail = typeof email === 'string' ? email.trim() : '';
        const parsedAge = Number.isInteger(age) ? age : null;

        const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!trimmedEmail || !isValidEmail(trimmedEmail)) {
          console.error(`Invalid email at row ${rowNumber}:`, trimmedEmail);
          return;
        }

        try {
          await User.create({ name, email: trimmedEmail, age: parsedAge });
        } catch (err) {
          console.error(`Error saving row ${rowNumber}:`, err);
        }
      });

      res.status(200).send('File imported successfully.');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  

const exportAndGenerateLink = async (req, res) => {
  try {

    const users = await User.findAll();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Users');


    worksheet.columns = [
      { header: 'Name', key: 'name', width: 30 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Age', key: 'age', width: 10 },
    ];


    users.forEach(user => {
      worksheet.addRow(user.toJSON());
    });

    const filename = `users_${uuidv4()}.xlsx`;
    const filePath = path.join(__dirname, '..', 'downloads', filename);

    if (!fs.existsSync(path.dirname(filePath))) {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
    }

    await workbook.xlsx.writeFile(filePath);

    const downloadUrl = `${req.protocol}://${req.get('host')}/downloads/${filename}`;

    res.json({ downloadUrl });
  } catch (error) {
    console.error('Error exporting data to Excel:', error);
    res.status(500).json({ error: 'Failed to export data' });
  }
};


module.exports = { 
    importFromExcel,
     exportAndGenerateLink, 
     upload
     };
