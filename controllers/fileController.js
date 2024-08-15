const ExcelService = require('../services/excelServices');
const PostgresService = require('../services/postgresService');

exports.importExcel = async (req, res) => {
  const file = req.files.file;
  try {
    const data = ExcelService.readExcelFile(file.data);
    await PostgresService.insertData('test', data);
    res.status(200).send('Data imported successfully');
  } catch (err) {
    res.status(500).send('Error importing data: ' + err.message);
  }
};

exports.exportExcel = async (req, res) => {
  try {
    const data = await PostgresService.fetchData('test');
    const buffer = ExcelService.createExcelFile(data);

    res.setHeader('Content-Disposition', 'attachment; filename=export.xlsx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buffer);
  } catch (err) {
    res.status(500).send('Error exporting data: ' + err.message);
  }
};
