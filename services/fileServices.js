const User = require('../models/table');
const xlsx = require('xlsx');
const path = require('path');

const userService = {
    async importUsers(filePath) {
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
        await User.bulkCreate(data);
    },

    async exportUsers() {
        const users = await User.findAll();
        const data = users.map(user => user.toJSON());
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, 'Users');
        
        const filePath = path.join(__dirname, '../users.xlsx');
        xlsx.writeFile(wb, filePath);
        return filePath;
    },
};

module.exports = userService;