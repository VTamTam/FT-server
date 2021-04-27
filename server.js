const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
let API_TV = require('./TV.json');
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static('FrontEnd'));
const fetch = require('node-fetch');
var OriginalData;
// show all the news
app.get('/api', fetchAPI(OriginalData),(req, res) => {
  // res.json(res.OrginalD);
  console.log("Original: " ,OriginalData)
  //res.json(res.paginatedResults);
  console.log("result");
});
// end
function fetchAPI(params) {
  return (req, res, next) => {
    const bodySend = {
      "queryString": "banks",
      "resultContext" : {
        "aspects" :[  "title","lifecycle","location","summary","editorial" ]
      }
    };
  
  fetch(`https://api.ft.com/content/search/v1`,{
      method: 'POST',
      body: JSON.stringify(bodySend),
      headers: { 'Content-Type': 'application/json' , 'X-Api-Key' : '59cbaf20e3e06d3565778e7b9758f7892e89468293a48663b98bd1d9' }
  })
    .then((res) => res.json())
    .then(data => {params = data.results[0].results ; console.log("resuold orginal paroms is ok " , params)})
    .catch((error) => console.log(error));
    //res.OrginalD(params); 
    next()
  }}
// search the world
app.get('/search/:key', paginated(API_TV),(req, res) => {
	const key = req.params.key;
	console.log(key);
	if (key.length > 0 ) {
		const final = API_TV.filter(
			(element) =>
				element.name.toLowerCase().indexOf(key.toLowerCase()) >= 0 ||
				element.description.toLowerCase().indexOf(key.toLowerCase()) >= 0
		);
    console.log(final);
		res.json(final);
		console.log("final");
	} else {
		res.send('Search key !');
	}
});
// end

function paginated(params) {
  return (req, res, next) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    console.log("page:" ,page ,"limit:" , limit)

    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    // this part its add the next page and pervious page on result and I don't need it now.
    // const results = {}
    // if (startIndex > 0 ) {
    //   results.next = {
    //     page: page + 1,
    //     limit: limit
    //   }
    // }
    // if (endIndex < params.length ) {
    //   results.previous = {
    //   page: page - 1,
    //   limit: limit
    //   }
    // }
    const results = params.slice(startIndex, endIndex)
    res.paginatedResults = (results)
    next()
  }
}
app.listen(PORT, () => {
	console.log(`Running at \`http://localhost:${PORT}\`...`);
}); 