const express = require('express');
const morgan = require('morgan'); // this is a middleware function
const { users } = require('./data');
const app = express();

const apiLogger = (req, res, next) => {
   const { method, url } = req;
   console.log(method, url);
   next();
}

// this will includes all of the url that start with /api
// /api => included
// /api/home/users => included
// /api/id/:id => included
// /home/api => not included
app.use('/api', apiLogger);

// you can also use multiple functions by put them into an array
// app.use('path', [function1, function2, ...])

app.use(morgan('tiny'));

app.get('/home', (req, res) => {
   res.send('<h1>Home</h1>');
})

app.get('/home/api', (req, res) => {
   res.send('<h1>API</h1>');
})

app.get('/api', (req, res) => {
   const json = users.map(user => { 
      const { id, name, email } = user;
      return { id, name, email }
   });
   res.json(json);
})

app.get('/api/id/:id', (req, res) => {
   const id = req.params.id;
   const getUser = users.find(user => user.id === +id);
   delete getUser.description;
   if(getUser){
      return res.json(getUser);
   }
   res.send('<h1>Could not find the user</h1>');
})

app.all('*', (req, res) => {
   res.status(404).send('<h1>Could not find the page</h1>');
})

app.listen(3000, () => {
   console.log('listening on port 3000...');
})