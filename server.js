const express = require('express');
const bodyParser = require("body-parser");
const { response } = require('express');
const app = express();
const PORT = process.env.PORT || 3000; 

let FT_API = require('./FT_API.json');

app.use(express.json());
app.use(bodyParser.json());
//app.use(express.static("FrontEnd"));


// show all the news 
app.get('/', function(req, res){
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
  const search = req.body;
  console.log(search)
      FT_API.find(search).toArray(function(error, result) {
        if(error){
          response.status(500).send(error);
            }else if (result) {
              response.status(200).send(result);
            } else {
              response.sendStatus(404)
            }
  //const searchNews = FT_API.filter(newss => newss.name === search || newss.description === search)
  
  });
});




app.listen(PORT, () => {
  console.log(`Running at \`http://localhost:${PORT}\`...`);
});
