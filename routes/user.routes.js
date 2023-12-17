const express = require("express");
const axios = require("axios");
const router = express.Router();
const Plagiarism = require("../models/plagiarism.model");
const { checkUser } = require("../middlewares/auth");
router.post("/check-text-plagarism", (req, res) => {
  const {data} = req.body;
  axios.post(
    "https://www.prepostseo.com/apis/checkSentence",
    new URLSearchParams({
      key: 'c6443e8354fa97bad24c783b8820449a',
      query: data
    }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" }}
  ).then((result) => {
    res.status(200).json(result.data) 
  }).catch((error) => {
    return res.status(500).json({ errorMessage: error.message });
  });
});

router.post("/check-article-plagarism", checkUser, (req, res) => {
  const { payload, author, title } = req.body;
  axios.post(
    "https://www.prepostseo.com/apis/checkPlag",
    new URLSearchParams({
      key: 'c6443e8354fa97bad24c783b8820449a',
      data: payload
    }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" }}
  ).then((result) => {
    const newPlagiarism = new Plagiarism({
      author, 
      title,
      sources: result?.data?.sources,
      plagPercent: result?.data?.plagPercent,
      user: res.locals.user
    });
    newPlagiarism.save()
    .then(() => {
      return res.status(200).json({
        successMessage: "Plagiarism content was successfully saved to database.",
        result: result.data
      });
    }).catch(() => {
      return res.status(500).json({
        successMessage: "Something went wrong when Plagiarism saving content to database."
      });
    })
    // return res.status(200).json(result.data) 
  }).catch((error) => {
    return res.status(500).json({ errorMessage: error.message });
  });
});

module.exports = router;

