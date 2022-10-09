const { ExtractJwt } = require('passport-jwt');
const User = require('../db/models/userModel');

// stored strategy instance
const JwtStrategy = require('passport-jwt').Strategy
// stored extract jwt methods


// token is already present
// key is also present

const initPassport = (passport) => {
    console.log('init passport');
    passport.use(
        new JwtStrategy({
            secretOrKey: "NewtonSchoolNodeBatch2022",
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        },
        (payload, next) => {
            console.log('inside callback');
            User.findById(payload.id)
            .then((user) => {
                console.log('inside next');
                next(null, user);
            })
            .catch((err) => {
                next(err, false);
            })
        })
    )
}

module.exports = initPassport

