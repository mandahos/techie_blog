const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');

const SequelizeStore = require('connect-session-sequelize')(session.Store);
const helpers = require('./utils/helpers.js')
const hbs = exphbs.create({ helpers });

const sess = {
    secret: 'dont share',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

const app = express();
const PORT = process.env.PORT || 3056;

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//use of routes
app.use(routes);

//connection to db&server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening!'));
})