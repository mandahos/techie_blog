const { Post } = require('../models');

const posts = [
    {
        title: 'Do coders sleep?',
        text: 'Ha, not while learning new skills',
        user_id: '1'
    },
    {
        title: 'Looking for a new hobby?',
        text: 'Try coding',
        user_id: '2'
    },
]

sequelize
    .sync({ force: true })
    .then(() => {
        return Post.bulkCreate(posts);
    })
    .then(() => {
        console.log('---POSTS ADDED---');
        process.exit(0);
    })
    .catch(err => {
        console.log(err);
        process.exit(1);
    });