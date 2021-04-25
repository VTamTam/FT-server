//const router = require('express').Router();
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "zarghani.m@gmail.com",
    pass: process.env.PASS,
  },
});
app.get('/', function(req, res){
    res.send('Hello World');
});

router.route("/").get((req, res) => {
  const api_url =process.env.APP_URL;
  console.log(req.query);
  const query = {};
  if (req.query.name) {
    query.name = req.query.name;
  }
  if (req.query.searchValue) {
    let regex = new RegExp(req.query.searchValue, "i");
    query.$or = [{ name: regex }, { description: regex }];
  }
  News.find(query)
    .populate("requests")
    .then((news) => {
        res.json({ news });
      }
    )
    .catch((err) => res.send({ Error: err }));
});

module.exports = router;