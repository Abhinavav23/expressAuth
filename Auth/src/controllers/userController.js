const User = require('../db/models/userModel');
const bcrypt = require('bcrypt');

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

const logIn = async (req, res) => {
    console.log(req.body);
    const {email, password} = req.body
    try{
        const user = await User.findOne({email})
        const comparePassword = bcrypt.compare(password, user.password);

        if(user.password === password){
            res.send(`<h3>Logged in successfully</h3>`)
        } else{
            res.send(`<h3>Password not correct</h3>`)
        }
    } catch(e){
        res.json({error: e})
    }
}

const signUp = (req, res) => {
    console.log(req.body);
    const {username, email, password, age} = req.body

    const salt = bcrypt.genSaltSync(10);
    console.log(salt);

    const securedPwd = bcrypt.hashSync(password, 10);
    console.log(securedPwd);

    const newUser  = new User({
        username,
        email,
        password: securedPwd,
        age
    })
    newUser.save()
    .then((data) => {
        res.send('<h3>SignUp successful</h3>')
    })
    .catch((e) => {
        res.send(`<h3>error occurred: ${e.message}</h3>`)
        // res.json({error: e.message})
    })

    // User.find()
}

module.exports = {
    getSignUpPage,
    getLoginPage,
    signUp,
    logIn
}
