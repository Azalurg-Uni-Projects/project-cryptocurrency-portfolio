const express = require('express');
const { PORT } = require('./config/config')
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json())

app.use('/private', require("./routes/private"))
app.use('/public', require("./routes/public"))
app.use('/integration', require("./routes/integration"))
app.use('/spa', require("./routes/spa"))

app.listen(PORT, _err => {
    console.log(`Resource server listening on port ${PORT}`);
})