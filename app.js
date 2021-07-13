const express = require('express');
var cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes/index');

const port = process.env.PORT||2022;
const host = '0.0.0.0';

const app = express();
app.use(cors());
app.use(express.json());

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.use('/', routes);
mongoose.connect("mongodb+srv://newUser:newUserMongodb@cluster0.jklf5.mongodb.net/zomato_march?retryWrites=true&w=majority", {
        useUnifiedTopology: true, useNewUrlParser: true
    })
    .then(() => {
        app.listen(port, host, () => {
            console.log(`server running at ${host}:${port}`)
        });
    })
    .catch()