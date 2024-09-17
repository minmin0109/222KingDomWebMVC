const pool = require('./config.js');
module.exports = async (req, res) => {
    const { username, email, password } = req.body; 
    const connection = await pool.getConnection();

    try {
        if (!username || !email || !password) {
            throw new Error('Please provide all required fields.');
        }

        const result = await connection.query(
            'INSERT INTO user_authentication (username, email, password) VALUES (?, ?, ?)',
            [username, email, password]
        );

        console.log('User registered successfully!!');
        return res.redirect('/login');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error: ');
    } finally {
        connection.release();
    }
};
