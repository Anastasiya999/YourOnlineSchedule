let LocalStrategy = require('passport-local').Strategy;
let bcrypt = require('bcryptjs');
let models = require('./models');
let User = require('./models/User.js');
const validPassword = function(user, password){
    return bcrypt.compareSync(password, user.password);
}
module.exports = function(passport){
    passport.serializeUser(function(user, done){
        done(null, user.user_id);
    });
    passport.deserializeUser(function(id, done){
        User.findById(id,(err, user)=>{
            if(user==null){
                done(new Error("Wrong user id."));
            }
            done(null,user);
          })

        } );

  
    passport.use(new LocalStrategy({
        usernameField: 'login',
        passwordField: 'password',
        passReqToCallback: true
    }, 
    function(req, login, password, done){
        return User.findByLogin(login,(err, user) =>{
             console.log(user);
           if(user==null)
           {
            req.flash('message', 'Incorrect credentials.')
            return done(null, false)
           }else if(user.password == null || user.password == undefined){
            req.flash('message', 'You must reset your password')
            return done(null, false)
           }
           return done(null, user);
        }).catch(err=>{
            done(err, false);
        })
    }))
}