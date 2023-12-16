const express = require("express");
const axios = require("axios");
const router = express.Router();
router.post("/check-text-plagarism", (req, res) => {
  const {data} = req.body;
  axios.post(
    "https://www.prepostseo.com/apis/checkSentence",
    new URLSearchParams({
      key: process.env.PLAGARISM_API_KEY,
      query: data
    }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" }}
  ).then((result) => {
    res.status(200).json(result.data) 
  }).catch((error) => {
    return res.status(500).json({ errorMessage: error.message });
  });
});

router.post("/check-article-plagarism", (req, res) => {
  const { payload } = req.body;
  axios.post(
    "https://www.prepostseo.com/apis/checkPlag",
    new URLSearchParams({
      key: process.env.PLAGARISM_API_KEY,
      data: payload
    }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" }}
  ).then((result) => {
    res.status(200).json(result.data) 
  }).catch((error) => {
    return res.status(500).json({ errorMessage: error.message });
  });
});

module.exports = router;

