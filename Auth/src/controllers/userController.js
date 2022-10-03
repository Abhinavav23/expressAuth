const User = require('../db/models/userModel');

const getSignUpPage = (req, res) => {
    res.render('signup/signupForm')
}

const getLoginPage = (req, res) => {
    res.send('Login')
}

const logIn = (req, res) => {
    
    res.send('login post page')
}

const signUp = (req, res) => {
    console.log(req.body);
    const {username, email, password, age} = req.body
    const newUser  = new User({
        username,
        email,
        password,
        age
    })
    newUser.save()
    .then((data) => {
        res.send('<h3>SignUp successful</h3>')
    })
    .catch((e) => {
        res.send(`<h3>error occurred: ${e.message}</h3>`)
    })

    // User.find()
}

module.exports = {
    getSignUpPage,
    getLoginPage,
    signUp,
    logIn
}