const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const app = express();
const session = require('express-session');
const railwayRouter = require('./src/routes/railway.route');
const cors = require('cors');
const alert = require("alert");

const corsOptions = {
    origin: '*',
    Credentials: true,
    optionSuccessStatus: 200
};

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 6000 }
    }));

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the backend railway API' });
    });

app.use('/railway', railwayRouter);

app.listen(port, () => {
    console.log(`Railway API is running on port ${port}`);
});