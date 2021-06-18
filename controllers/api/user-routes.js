const router = require('express').Router();
const sequelize = require("../../config/connection");
const { User, Post, Comment } = require('../../models');


router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password']}
    })
    .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        },
        attributes: { exclude: ['password']},
    })
    .then(dbCommentData => { 
        if(!dbCommentData){
            res.status(404).json({ message: 'No user was found, please enter a valid ID'});
            return;
        }
        res.json(dbCommentData);
    })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
 });

 router.post('/', (req, res) => {
     User.create({
        username: req.body.username,
        password: req.body,password
     })
     .then(dbUserData => {
         req.session.save(() => {
             req.session.user_id = dbUserData.id;
             req.session.username = dbUserData.username;
             req.session.logIn = true;
             
             res.json(dbUserData);
         });
     })
     .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
 

router.put('/:login', (req, res) => {
     User.findOne({
        where: {
            id: req.params.username
            }
        })
     .then(dbUserData => { 
        if(!dbUserData){
            res.status(404).json({ message: 'No user was found, please enter a valid ID'});
            return;
        }
        const validPassword = dbUserData.checkPassword(req.body.password);

        if(!validPassword) {
            res.json(400).json({ message: 'Incorrect Password, try again.'});
            return;
        }
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
      
            res.json({ user: dbUserData, message: 'Successful log in!' });
        });
    }); 
 });

 router.post('/logout', (req, res) => {
    if(req.session.loggedIn){
        req.session.destroy(() => {
            res.sendStatus(204).end();
        });
    } else{
        res.status(404).end();
    }
});

module.exports = router;
