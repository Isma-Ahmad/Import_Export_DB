const xlsx = require('xlsx');

class ExcelService {
  static readExcelFile(fileBuffer) {
    const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    return xlsx.utils.sheet_to_json(sheet);
  }

  static createExcelFile(data) {
    const worksheet = xlsx.utils.json_to_sheet(data);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    return xlsx.write(workbook, { bookType: 'xlsx', type: 'buffer' });
  }
}

module.exports = ExcelService;

