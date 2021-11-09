const express = require('express');
const app = express();

app.use(express.static('./post'));

// parse form data
app.use(express.urlencoded({ extended: false }));

app.post('/login', (req, res) => {
   const data = req.body;
   console.log(data);
   res.send('POST');
})

app.listen(8000, () => {
   console.log('listening on port 8000...');
})