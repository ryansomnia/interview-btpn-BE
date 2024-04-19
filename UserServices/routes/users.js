// routes/users.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const producerUser = require('../producer/user');

router.post('/login', authController.login);


router.get('/', userController.test);
router.post('/addUser', userController.createUser);
router.post('/register', authController.regist);
router.get('/getAllUser', authController.verifyToken, userController.getAllUser);
router.put('/updateUser', userController.updateUser);
router.delete('/deleteUser', userController.deleteUser);
router.post('/producer/addUser', producerUser.main)

module.exports = router;
