if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');

const PORT = process.env.PORT || 3001;

const indexRouter = require('./routes/index')

app.use(morgan('dev'));


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts)
app.use(express.static('public'));

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to mongo'));

app.use('/', indexRouter);

app.listen(PORT, () => {
    console.log(`Server listten alt+click http://localhost:${PORT}/`)
})