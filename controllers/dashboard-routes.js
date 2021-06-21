//dashboard
router.get('/dashboard', (req, res) => {
    Post.findAll({
      where: { user_id: req.session.user_id },
      attributes: [
        'id', 'title', 'text', 'created_at'
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