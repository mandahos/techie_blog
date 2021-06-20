const { User } = require('../models');

const users = [
    {
        username: 'janeStars',
        password: 'password1'
    },
    {
        username: 'doeRicky',
        password: 'password2'
    },
]

sequelize
  .sync({ force: true })
  .then(() => {
    return User.bulkCreate(users);
  })
  .then(() => {
    console.log('---COMMENT ADDED---');
    process.exit(0);
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });