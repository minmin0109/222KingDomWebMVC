const express = require('express');
const path = require('path');


const app = express();


app.set('view engine','ejs');

app.set('views', path.join(__dirname, 'view'));
app.use(express.static(__dirname + '/view'));
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use(express.json()); // ใช้ middleware เพื่อแปลง JSON ให้เป็น req.body
app.use(express.urlencoded({ extended: true })); // แปลงข้อมูลที่ส่งมาจากฟอร์ม HTML ให้เป็น JavaScript object

// ดึงข้อมูลจาก module ที่ได้ export module ออกมาในแต่ละไฟล์
const loginUserModel = require('./model/loginUserModel'); 
const storeUserModel = require('./model/storeUserModel'); 
const deleteUserModel = require('./model/deleteUserModel');

//method
app.get('/', (req, res) => {
    res.render("index");
});
app.get('/login', (req, res) => {
    res.render("login");
});

app.get('/register', (req, res) => {
    res.render("register");
});

app.get('/loginsuccess', (req, res) => {
    const userID = req.query.userID;
    const username = req.query.username;
    res.render("loginsuccess", { userID: userID , username: username});
});
app.post('/user/login', loginUserModel);
app.post('/user/register', storeUserModel);
app.post('/deleteuser/:userID', async (req, res) => {
    const userID = req.params.userID;
    try {
        await deleteUserModel(userID); 
        console.log(`User with ID ${userID} has been deleted successfully`);
        return res.status(200).send('<script>alert("Account has been deleted successfully"); window.location.href = "/";</script>');
    } catch (error) {
        console.error("Error deleting user:", error);
        console.log('Error deleting user');
    }
});

app.listen(7777, () => {
    console.log('Server is running on port 7777');
});
