const express = require('express');
const { PORT } = require('./config/config')

const app = express();

app.use('/private', require("./routes/private"))
// app.use('/public', require("./routes/public"))

app.listen(PORT, _err => {
    console.log(`Resource server listening on port ${PORT}`);
})