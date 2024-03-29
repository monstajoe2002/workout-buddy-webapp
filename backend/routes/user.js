const express=require('express');
const router=express.Router();

//controller functions
const {loginUser,signupUser}=require('../controllers/userController');

//login
router.post('/login',loginUser)
//register
router.post('/signup', signupUser)

module.exports = router;