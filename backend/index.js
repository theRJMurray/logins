const express = require('express');
const cors = require('cors');
// const path = require('path');

const app = express();

app.use(express.json(), cors())

app.post('/api/login', (req, res) => {
    console.log('get request received')
    console.log(req.body)
    res.send('response from the server', req.body.username, req.body.password)
})

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);