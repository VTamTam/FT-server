const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000; 
let API_TV = require('./TV.json');
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static("FrontEnd"));


// show all the news 
app.get('/api', function(req, res){
  res.json(API_TV)
});
// end  

// search the world 
app.get('/search/:key', (req, res) => {
  const key = req.params.key;
  console.log("Search key is :" ,key);
  if(key) {
    const final = API_TV.TV.filter(
      element => { 
        element.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
         element.description.toLowerCase().indexOf(key.toLowerCase()) !== -1
        
        // element.name.indexOf === key.indexOf || 
        // element.description.indexOf === key.indexOf
      });
      res.json(final);
      console.log(final);
    } else {
      res.send( "Search key !");
    }
})

app.listen(PORT, () => {
  console.log(`Running at \`http://localhost:${PORT}\`...`);
});
