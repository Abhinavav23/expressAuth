const express  = require('express');
const passport = require('passport');

const initPassport = require('../middlewares/passportJWT');
initPassport(passport);

const router = express.Router();
const { logIn, signUp, getLoginPage, getSignUpPage, getProfile, validateUser, getOrders} = require('../controllers/userController');

router.get('/login', getLoginPage);
router.get('/signup', getSignUpPage);
router.post('/login', logIn);
router.post('/signup', signUp);
// protected route ---> needs a logged in user
router.get('/profile', validateUser, getProfile);
router.get('/orders', passport.authenticate('jwt', {session: false}), getOrders);


router.all('*', (req, res) => {
    res.send('User page not found')
})
module.exports = router;