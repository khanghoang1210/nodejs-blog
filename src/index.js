const path = require('path');
const express = require('express');
const app = express();
var { engine } = require('express-handlebars');
var bodyParser = require('body-parser');
const port = 3000;
const SortMiddleware = require('./app/middlewares/SortMiddleware')
app.use(express.static(path.join(__dirname, 'public')));
const methodOverride = require('method-override');
const morgan = require('morgan');
const route = require('./routes');
const db = require('./config/db');
db.connect();

const { send } = require('express/lib/response');
app.use(morgan('combined'));
app.engine('hbs', engine({
    extname: '.hbs',
    helpers: {
        sum: (a, b) => a + b,
        sortAble: (field, sort) => {
            const sortType = field === sort.column ? sort.type : 'default';
            const icons = {
                default: 'sortDef',
                asc: 'sortAsc',
                desc: 'sortDesc',
            };
            const types = {
                default: 'desc',
                asc: 'desc',
                desc:'asc',
            };
            const icon = icons[sortType];
            const type = types[sortType];

            return ` <a href="?_sort&column=${field}&type=${type}">${icon}</a>`;
        }
    },

}));
app.use(express.urlencoded({
    extended: true
}));
app.use(SortMiddleware);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(methodOverride('_method'));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resource', 'views'));
route(app);


app.listen(port, () => console.log(`App listening at http://localhost:${port}`));