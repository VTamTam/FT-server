const express = require('express');
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000; 


app.use(express.json());
app.use(bodyParser.json());

const uri = process.env.ATLAS_URI;

app.get('/', function (req, res) {
  res.send('Hello World hhhh')
})


app.listen(port, () => {
  console.log(`Running at \`http://localhost:${port}\`...`);
});