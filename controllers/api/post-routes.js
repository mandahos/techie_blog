const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'contents',
            'created_at'
        ],
        order: [['created', 'DESC']],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model:User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id', 'title', 'contents', 'created_at'
        ], 
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model:User,
                attributes: ['username']
            }
        ]
    })
    .then(dbCommentData => { 
        if(!dbCommentData){
            res.status(404).json({ message: 'No post was found, please enter a valid ID'});
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
     Post.create({
        title: req.body.title,
        contents: req.body.contents,
        user_id: req.sessions.user_id
     })
     .then(dbCommentData => res.json(dbCommentData))
     .catch(err => {
         console.log(err);
         res.status(500).json(err);
     }); 
 });

router.put('/:id', (req, res) => {
     Post.update(
         {
            title: req.body.title
         },
         {
             where: {
                 id: req.params.id
             }
         }
     )
     .then(dbCommentData => { 
        if(!dbCommentData){
            res.status(404).json({ message: 'No post was found, please enter a valid ID'});
            return;
        }
        res.json(dbCommentData);
    })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        }); 
 });

 router.delete('/:id', (req, res) => {
    Post.destory({
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentData => { 
    if(!dbCommentData){
        res.status(404).json({ message: 'No post was found, please enter a valid ID'});
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
