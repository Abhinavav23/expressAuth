const User = require('../db/models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getSignUpPage = (req, res) => {
    // let info = {
    //     formType: 'signup',
    //     url: 'http://localhost:5050/user/signup',
    //     method: 'POST'
    // }
    res.render('signup/signupForm');
}

const getLoginPage = (req, res) => {
    // let info = {
    //     formType: 'signup',
    //     url: 'http://localhost:5050/user/login',
    //     method: 'POST'
    // }
    res.render('login/login')
}
const secretKey = 'NewtonSchoolNodeBatch2022';

// takes a user for which we are creating the token
const createToken = (user) => {
    const userData = {
        id: user._id
    }
    const options = {
        expiresIn: '600s'
    }

    const token = jwt.sign(userData,secretKey, options);
    return token
}


const logIn = async (req, res) => {
    const {email, password} = req.body
    try{
        const user = await User.findOne({email})
        const comparePassword = await bcrypt.compare(password, user.password);

        const token = createToken(user);

        if(comparePassword){
            res.cookie('AuthToken', token)
            res.send(`<h3>Logged in successfully</h3>`)
        } else{
            res.send(`<h3>Password not correct</h3>`)
        }
    } catch(e){
        res.json({error: e.message})
    }
}

const signUp = (req, res) => {
    console.log(req.body);
    const {username, email, password, age} = req.body

    const salt = bcrypt.genSaltSync(10);
    // console.log(salt);

    const securedPwd = bcrypt.hashSync(password, 10);
    // console.log(securedPwd);

    const newUser  = new User({
        username,
        email,
        password: securedPwd,
        age
    })
    newUser.save()
    .then((newUser) => {
        console.log('new user');
        console.log(newUser);
        const token = createToken(newUser);
        res.cookie('AuthToken', token)
        res.send('<h3>SignUp successful</h3>')
    })
    .catch((e) => {
        res.send(`<h3>error occurred: ${e.message}</h3>`)
        // res.json({error: e.message})
    })

    // User.find()
}

const getProfile = async (req, res) => {
    const {AuthToken} = req.cookies;
        jwt.verify(AuthToken, secretKey, async (err, decodedToken) => {
            try{
                if(err){
                    res.json({error: err});
                } else{
                    const user = await User.findById(decodedToken.id);
                    res.send(`<h3>Profile page --- UserName: ${user.username} --- Email: ${user.email} Age: ${user.age}</h3>`)
                }
            } catch(e){
                res.json({error: e})
            }
        })
}

const getOrders = (req, res) => {
    console.log(req.user.age);
    res.send(`<h3>this is orders page for ${req.user.username}</h3>`);
}

const validateUser = (req, res, next) => {
    console.log('userMiddleware');
    next();
}

module.exports = {
    getSignUpPage,
    getLoginPage,
    signUp,
    logIn,
    getProfile,
    validateUser,
    getOrders
}

const arr = [1,2,3,45]; //--> 5

const arr1 = [1,3,4]; // ---> 3

arr1.push(34);

// arr should have 4 elements. --> true ---> fail
// arr1 should have 4 elements. --> true --> fail

