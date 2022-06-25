const express = require('express');
const axios = require('axios');
const { param } = require('express/lib/request');
const PORT = require('./config/config').PORT

const app = express();

app.use('/private', require("./routes/private"))
app.use('/public', require("./routes/public"))

app.listen(PORT, err => {
    console.log(`Resource server listening on port ${PORT}`);
})