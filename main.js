const express = require('express');
const { users } = require('./data');

const app = express();

app.get('/', (req, res) => {
   console.log(req.method); // Get or Post
   res.status(200).send(
      `
         <h1>Home page</h1>
         <a href="/api/users">API</a>
      `
   )
})

app.get('/api/users', (req, res) => {
   res.status(200);

   const shortenUserInfo = users.map(user => {
      const { id, name, email } = user;
      return { id, name, email };
   })

   res.json(shortenUserInfo);
})

// after /: is called a request parameter
app.get('/api/users/:id', (req, res) => {
   console.log(req.params);
   const { id } = req.params;

   const getUser = users.find(user => user.id === +id);

   if(getUser){
      res.status(200).json(getUser);
   }
   else {
      res.status(404).send('<h1>Could not find the user</h1>');
   }
})

/* 
try to type 
=>   /api/query?name=ANY 
on the url 
*/
app.get('/api/query', (req, res) => {
   const option = req.query;
   console.log(option);
   if(option.name){
      res.send('<h2>Hello '+option.name+'</h2>');
   }
   else {
      res.status(404).send('<h1>Error: you need to give the query? \'name\'</h1>')
   }
})

app.get('/api/search', (req, res) => {
   const { char } = req.query;
   console.log(char);
   let sortedAPI = [...users];
   if(char){
      sortedAPI = sortedAPI.filter(user => {
         return user.name.toLowerCase().startsWith(char.toLowerCase());
      });
   }

   if(sortedAPI.length){
      res.json(sortedAPI);
   }
   else {
      res.send(`<h2>Could not find the users\' name start with \"${char}\"</h2>`);
   }
})

app.all('*', (req, res) => {
   res.status(404).send('<h1>Could not find the page</h1>');
})

app.listen(3000, () => {
   console.log('listening on port 3000...')
})