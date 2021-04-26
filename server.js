const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
let API_TV = require('./TV.json');
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static('FrontEnd'));

// show all the news
app.get('/api', paginated(API_TV), (req, res) => {

  res.json(res.paginatedResults);
});
// end

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

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const results = {}
    if (startIndex > 0 ) {
      results.next = {
        page: page + 1,
        limit: limit
      }
    }
    if (endIndex < params.length ) {
      results.previous = {
      page: page - 1,
      limit: limit
      }
    }
    results.results = params.slice(startIndex, endIndex)
    res.paginatedResults = (results)
    next()
  }
}
app.listen(PORT, () => {
	console.log(`Running at \`http://localhost:${PORT}\`...`);
}); 