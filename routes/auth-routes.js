const router = require('express').Router();
const passport  = require('passport');
const express = require('express');
const path = require('path');

//static files such as css or html
router.use(express.static(path.join(__dirname, '../public')));

//auth login
router.get('/login',(req,res)=>{
    res.render('login',{user: req.user});
});


//auth logout
router.get('/logout',(req,res)=>{
    //handle with passport
    req.logout();
    res.redirect('/');
});


//auth google
router.get('/google',passport.authenticate('google',{
    scope:['profile']
}));

//callback route for google to redirect to
router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
    //res.send(req.user);
    res.redirect('/profile/');
});


//auth github
router.get('/github',passport.authenticate('github',{
    scope:['profile']
}));

//callback route for github to redirect to
router.get('/github/redirect',passport.authenticate('github'),(req,res)=>{
    //res.send(req.user);
    res.redirect('/profile/');
});

module.exports = router;