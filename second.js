const express = require('express');
const app = express();

// middleware function
const logger = (req, res, next) => {
   const { method, url } = req;
   const time = new Date();
   const year = time.getFullYear();
   const month = time.getMonth();
   const day = time.getDate();
   const stringify = year + '-' + month + '-' + day;
   console.log(method, url, stringify);
   
   next(); // you need this callback to execute the third parameter of get()
}

app.get('/', logger, (req, res) => {
   res.status(200).send('<h1>Home</h1>')
})

app.listen(3000, () => {
   console.log('listening on port 3000...')
})