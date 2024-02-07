const express = require("express");
const {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  deleteURL
} = require("../controllers/url");

const router = express.Router();

router.post("/",handleGenerateNewShortURL);

router.delete('/delete',deleteURL);



router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
