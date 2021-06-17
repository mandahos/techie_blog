const router = require('express').Router();
const { Comment, Post, User } = require('../../models');
const sequlize = require('../../config/connection.js');

router.get('/', (req, res) => {
    Comment.findAll()
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
    if(req.session) {
        Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        })
     .then(dbCommentData => res.json(dbCommentData))  
     .catch(err => {
        console.log(err);
        res.status(400).json(err);
    }); 
    }
});

router.delete('/:id', withAuth, (req, res) => {
    Comment.destory({
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentData => { 
    if(!dbCommentData){
        res.status(404).json({ message: 'No comment was found, please enter a valid ID'});
        return;
    }
    res.json(dbCommentData);
})
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;
