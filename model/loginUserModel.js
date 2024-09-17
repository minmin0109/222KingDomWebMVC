const pool = require('./config.js');
const loginUserModel = async (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT user_id, username, password FROM user_authentication WHERE username = ?';

    const connection = await pool.getConnection();
    try {
        const result = await connection.query(query, [username]);

        if (result.length === 0) {
            return res.status(401).send('<script>alert("User not Found"); window.location.href = "/login";</script>');
        }

        const user = result[0];
        if (password === user.password) {
           return res.redirect(`/loginsuccess?userID=${user.user_id}&username=${user.username}`)
        } else {
            return res.status(401).send('<script>alert("Wrong password"); window.location.href = "/login";</script>');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('<script>alert("Internal Server Error"); window.location.href = "/login";</script>');
    } finally {
        connection.release();
    }
};

module.exports = loginUserModel;
