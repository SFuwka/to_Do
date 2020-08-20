if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const path = require('path')
const methodOverride = require('method-override')

const PORT = process.env.PORT || 3004;



app.use(morgan('dev'));

app.use(methodOverride('_method'))

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts)
app.use(express.static('public'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(bodyParser.urlencoded({ extended: false }));

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to mongo'));


const indexRouter = require('./routes/index')
app.use('/', indexRouter);

const projectsRouter = require('./routes/projects');
app.use('/projects', projectsRouter);

app.use((req, res, next) => {
    res.status(404).render('404.ejs')
})
app.listen(PORT, () => {
    console.log(`Server listten alt+click http://localhost:${PORT}/`)
})