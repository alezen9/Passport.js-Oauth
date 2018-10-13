const passport  = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const GithubStrategy = require('passport-github2');
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user);
    })
});


passport.use(
    new GoogleStrategy({
        //options for the strategy
        callbackURL:'/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret:keys.google.clientSecret
    },(accessToken,refreshToken,profile,done)=>{
        //passport callback function
        //check if user exists in database
        User.findOne({
            googleId: profile.id
        }).then((currentUser)=>{
            if(currentUser){
                //already have user
                //console.log('user is: ' + currentUser);
                done(null, currentUser);
            }else{
                //create new user and save it
                new User({
                    username: profile.displayName,
                    provider: 'google',
                    githubId: '',
                    googleId: profile.id,
                    thumbnail: profile._json.image.url
                }).save().then((newUser)=>{
                    //console.log('new user created: ' + newUser);
                    done(null, newUser);
                })     
            }
        });
    })
);

passport.use(
    new GithubStrategy({
        //options for the strategy
        callbackURL:'/auth/github/redirect',
        clientID: keys.github.clientID,
        clientSecret:keys.github.clientSecret
    },(accessToken,refreshToken,profile,done)=>{
        //passport callback function
        //check if user exists in database
        //console.log(profile);
        User.findOne({
            githubId: profile.id
        }).then((currentUser)=>{
            if(currentUser){
                //already have user
                //console.log('user is: ' + currentUser);
                done(null, currentUser);
            }else{
                //create new user and save it
                new User({
                    username: profile.displayName,
                    provider: 'github',
                    githubId: profile.id,
                    googleId: '',
                    thumbnail: profile.photos[0].value
                }).save().then((newUser)=>{
                    //console.log('new user created: ' + newUser);
                    done(null, newUser);
                })     
            }
        });
    })
);