const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passport = require('passport');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
var path = require('path');


const app = express();

//set up view engine
app.set('view engine','ejs');

//static files such as css or html
app.use(express.static(path.join(__dirname, '/public')));


app.use(cookieSession({
    maxAge: 24*60*60*1000, //in milliseconds
    keys:[keys.session.cookieKey] //key to encrypt data in the cookie
}));

//initialaze passport
app.use(passport.initialize());
app.use(passport.session());


//connect to mongodb
mongoose.connect(keys.mongoDB.dbURI,()=>{
    console.log('connected to mongodb');
})

//set up routes
app.use('/auth',authRoutes);
app.use('/profile',profileRoutes);

// create home route
app.get('/',(req,res)=>{
    res.render('home',{user: req.user});
})

app.listen(3000, ()=>{
    console.log('app listening for requests on port 3000');
})