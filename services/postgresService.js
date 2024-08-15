const pool = require('../db');



class PostgresService {
  static async insertData(tableName, data) {
    const promises = data.map(async (row) => {
      const query = `INSERT INTO ${tableName} (id,name,age) VALUES ($1, $2, $3)`;
      const values = [row.id, row.name, row.age]; 
      return pool.query(query, values);
    });

    await Promise.all(promises);
  }

  static async fetchData(tableName) {
    const result = await pool.query(`SELECT * FROM ${tableName}`);
    return result.rows;
  }
}

module.exports = PostgresService;
