const express = require('express');
const path = require('path');

const hostname = '192.168.1.3';

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req, res) => {

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.sendFile(path.join(__dirname, 'public', 'index.html'));

});


app.listen(port, hostname, () => {

    console.log(`Server running at http://${hostname}:${port}/`);

});