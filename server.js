const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(express.static('FrontEnd'));
const fetch = require('node-fetch');
const bodySend = {
  "queryString": "banks",
  "resultContext" : {
    "aspects" :[  "title","lifecycle","location","summary","editorial" ]
  }
};
// show all the news
app.get('/api', fetchAPI(), (req, res) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    console.log("page:" ,page ,"limit:" , limit)

    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const results = (res.OriginalData).slice(startIndex, endIndex)
    res.json(results)

});
// end

// search the world
app.get('/search/', fetchAPI("search"),(req, res) => {
	  const key = req.query.key;
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    console.log("search :page:" ,page ,"limit:" , limit , "key:" , key)
    const startIndex = (page - 1) * limit
    const endIndex = page * limit

	if (key.length > 0 ) {
		const final = (res.OriginalSearchData).filter(
			(element) =>
				element.title.title.toLowerCase().indexOf(key.toLowerCase()) >= 0 ||
				element.summary.excerpt.toLowerCase().indexOf(key.toLowerCase()) >= 0 ||
        element.editorial.subheading.toLowerCase().indexOf(key.toLowerCase()) >= 0
		);
    const results = (res.OriginalSearchData).slice(startIndex, endIndex)
    res.json(results)
	} else {
		res.send('Search key !');
	}
});
// end
// fetch function
function fetchAPI(props) {
  return (req, res, next) => {
  fetch(`https://api.ft.com/content/search/v1`,{
      method: 'POST',
      body: JSON.stringify(bodySend),
      headers: { 'Content-Type': 'application/json' , 'X-Api-Key' : '59cbaf20e3e06d3565778e7b9758f7892e89468293a48663b98bd1d9' }
  })
    .then((res) => res.json())
    .then(data => {
        const dataAPI = data.results[0].results
      if (!props) {
        res.OriginalData = (dataAPI)
        next()
      } else {
        res.OriginalSearchData = (dataAPI)
        next()
      }
    })
  }}
// end fetch 
app.listen(PORT, () => {
  console.log(`Running at \`http://localhost:${PORT}\`...`);
}); 

// function paginated(params) {
//   return (req, res, next) => {
//     const page = parseInt(req.query.page)
//     const limit = parseInt(req.query.limit)
//     console.log("page:" ,page ,"limit:" , limit)

//     const startIndex = (page - 1) * limit
//     const endIndex = page * limit
//   //  this part its add the next page and pervious page on result and I don't need it now.
//     const results = {}
//     if (startIndex > 0 ) {
//       results.next = {
//         page: page + 1,
//         limit: limit
//       }
//     }
//     if (endIndex < params.length ) {
//       results.previous = {
//       page: page - 1,
//       limit: limit
//       }
//     }
//     const results = params.slice(startIndex, endIndex)
//     res.paginatedResults = (results)
//     next()
//   }
// }