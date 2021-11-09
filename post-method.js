const express = require('express');
const app = express();

app.use(express.static('./post'));

// parse form data
app.use(express.urlencoded({ extended: false }));

app.post('/login', (req, res) => {
   const data = req.body;
   console.log(data);

   if(data.username){
      return res.status(200).send(`<h1>Hello ${data.username}</h1>`);
   }
   res.status(401).send('<h1>User didn\'t complete the form</h1>');
})

app.listen(8000, () => {
   console.log('listening on port 8000...');
})