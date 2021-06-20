const { Comment } = require('../models');

const comments = [
    {
        comment_text: 'Lorem ipsum',
        user_id: 1,
        post_id: 1,
    },
    {
        comment_text: 'Lorem ipsum dolor sit amet.',
        user_id: 2,
        post_id: 1,
    },
    {
        comment_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        user_id: 2,
        post_id: 2,
    },
]

sequelize
    .sync({ force: true })
    .then(() => {
        return Comment.bulkCreate(comments);
    })
    .then(() => {
        console.log('---COMMENT ADDED---');
        process.exit(0);
    })
    .catch(err => {
        console.log(err);
        process.exit(1);
    });