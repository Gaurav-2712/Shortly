const shortid = require("shortid");
const URL = require("../models/url");
const user = require('../models/user');
const mongoose = require('mongoose');

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({message : "URL is required" , error : 1});
  }
  let shortID = shortid();

  const url = await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });

  try {
    const userData = await user.findOneAndUpdate(
      { _id: req.user._id },
      {
        $push: {
          shortenedUrls: url._id, // Directly use the ObjectId here
        },
      },
      { new: true }
    );
  } catch (error) {
      console.log("User is Not Found And the Url is Not Store in any User Data");
  }
  
   return res.json({message : shortID , error : 0})
  // return res.render('index',{ id: shortID , redirectURL: body.url }) 
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

async function deleteURL(req,res){
  const { shortId } = req.body;
  const userId = req.user._id;
    try {
      const url = await URL.findOne({shortId : shortId});

      const data = await user.updateOne(
        {_id : userId},
        { $pull : {shortenedUrls : url._id }}
      )
      res.status(200).json({message : data , error : 0})
      
    } catch (err) {
      res.json({message : err , error : 1})
    }

}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  deleteURL,
};
