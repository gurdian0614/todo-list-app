const express = require('express');
const port = process.env.port || 8080;
const app = express();

app.use(express.static(__dirname + '/dist/'));
app.get(/.*/, function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.listen(port);
console.log('Vue Server started...')