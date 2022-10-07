const express  = require('express');

const router = express.Router();
const { logIn, signUp, getLoginPage, getSignUpPage, getProfile, validateUser} = require('../controllers/userController');

router.get('/login', getLoginPage);
router.get('/signup', getSignUpPage);
router.post('/login', logIn);
router.post('/signup', signUp);
router.get('/profile', validateUser, getProfile);

router.all('*', (req, res) => {
    res.send('User page not found')
})
module.exports = router;