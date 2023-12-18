const express = require("express");
const axios = require("axios");
const router = express.Router();
const Plagiarism = require("../models/plagiarism.model");
const User = require("../models/user.models");
const { checkUser, checkAdmin } = require("../middlewares/auth");
const ObjectId = require('mongodb').ObjectId
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
      user: res.locals.user,
      matric: res.locals.user.matric
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
  }).catch((error) => {
    return res.status(500).json({ errorMessage: error.message });
  });
});

router.get('/plagarism-history/:matric', checkUser, async (req, res) => {
  const matric = req.params.matric;
  try {
    if(!matric){
      return res.status(404).json({errorMessage : `User does not exist`});
    }

    const history = await Plagiarism.find({ matric })
    res.status(200).json(history);
  } catch (error) {
    return res.status(500).json({errorMessage : "OOPS!!!, Something went wrong7"});
  }
});


router.get('/profile/:id', checkUser, async(req, res) => {
  const _id = req.params.id;
  try {
      const user = await User.findOne({_id});
      if(!user){ return res.status(400).json({errorMessage : 'User does not exist'}); }

      return res.status(200).json(user)
  } catch (error) {
      return res.status(500).json({errorMessage : 'Something went wrong, Please try again.'});
  }
})

router.get('/plagarism-history', checkAdmin, async (req, res) => {
  try {
    const history = await Plagiarism.find()
    res.status(200).json(history);
  } catch (error) {
    return res.status(500).json({errorMessage : "OOPS!!!, Something went wrong"});
  }
});

module.exports = router;

