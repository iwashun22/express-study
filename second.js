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

// you can add middleware function by this

// app.get('/', logger, (req, res) => {
//    res.status(200).send('<h1>Home</h1>')
// })



// But you might noticed that if the function will be use everytime, its still a long code
// You can simply use app.use() to extends all of the method to include the middleware

app.use(logger);

app.get('/', (req, res) => {
   res.status(200).send('<h1>Home</h1>')
})

app.get('/about', (req, res) => {
   res.status(200).send('<h1>About</h1>');
})

app.listen(3000, () => {
   console.log('listening on port 3000...')
})