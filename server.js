const express = require('express');
const bodyParser = require("body-parser");
const { response } = require('express');
const app = express();
const PORT = process.env.PORT || 3000; 

let FT_API = require('./FT_API.json');

app.use(express.json());
app.use(bodyParser.json());
app.use(express.static("FrontEnd"));


// show all the news 
app.get('/api', function(req, res){
  console.log("first step");
  console.log(FT_API)
  const query = {};
  const news = FT_API
  res.json(FT_API)
  .then((news) => {
    res.json({ news });
  })
  .catch((err) => res.send({ Error: err }));
});
// end  

// search the world 
app.get('/search/:key', (req, res) => {
  console.log("I got it ");
  const {key} = req.params;
  console.log(key)
  const API = FT_API;
  const final = API.collections.filter(
    (el) => {el.name.indexOf === key.indexOf || el.description.indexOf === key.indexOf}
  )
  res.json({final})
  });

app.listen(PORT, () => {
  console.log(`Running at \`http://localhost:${PORT}\`...`);
});
