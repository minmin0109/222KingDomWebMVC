const pool = require('./config.js');
const deleteUserModel = async (userId) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("DELETE FROM user_authentication WHERE user_id = ?", [userId]);
        console.log("Deleted user:", rows);
    } catch (err) {
        throw err;
    } 
};
module.exports = deleteUserModel;
