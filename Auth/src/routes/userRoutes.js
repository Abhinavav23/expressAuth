const express  = require('express');

const router = express.Router();
const { logIn, signUp, getLoginPage, getSignUpPage} = require('../controllers/userController');

router.get('/login', getLoginPage);
router.get('/signup', getSignUpPage);
router.post('/login', logIn);
router.post('/signup', signUp);

router.all('*', (req, res) => {
    res.send('User page not found')
})
module.exports = router;