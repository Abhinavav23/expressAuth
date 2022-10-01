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
    res.send('signup post page')
}

module.exports = {
    getSignUpPage,
    getLoginPage,
    signUp,
    logIn
}