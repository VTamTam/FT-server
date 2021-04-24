const router = require('express').Router();
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "zarghani.m@gmail.com",
    pass: process.env.PASS,
  },
});


router.route("/").get((req, res) => {
  console.log(req.query);
  const query = {};
  if (req.query.category) {
    query.category = req.query.category;
  }
  if (req.query.searchValue) {
    let regex = new RegExp(req.query.searchValue, "i");
    query.$or = [{ title: regex }, { question: regex }, { category: regex }];
  }
  Question.find(query)
    .sort({
      createdAt: -1,
    })
    .populate("answers")
    .then((questions) => {
      if (request.query.noAnswer === "true") {
        const filteredQuestions = questions.filter(
          (question) => question.answers.length === 0
        );
        response.json({ questions: filteredQuestions });
      } else {
        response.json({ questions });
      }
    })
    .catch((err) => response.send({ Error: err }));
});

module.exports = router;