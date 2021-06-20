const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

//homepage
router.get('/', (req, res) => {
  Post.findAll({
    attributes: [
      'id', 'title', 'post_text', 'created_at'],
    order: [['created_at', 'DESC']],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id'],
        include: { model: User, attributes: ['username'] },
      },
      { model: User, attributes: ['username'] },
    ],
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//dashboard
router.get('/dashboard', (req, res) => {
  Post.findAll({
    where: { user_id: req.session.user_id },
    attributes: [
      'id', 'title', 'contents', 'created_at'
    ],
    order: [['created_at', 'DESC']],
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
        moder: User,
        attributes: ['username']
      }
    ]
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render('dashboard', {
        posts,
        loggedIn: req.session.loggedIn
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//login
router.get('login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login')
})

//post single
router.get('/posts/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'post_url', 'title', 'created_at',
      [sequelize.literal('(SELECT COUNT (*) FROM vote WHERE postid = vote.post_id)'), 'vote_count']],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        },
      },
      {
        model:
          User,
        attributes: ['username']
      }
    ]
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "Sorry no post found with this ID" });
        return;
      }
      const post = dbPostData.get({ plain: true });
      res.render('single-post', {
        post,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;