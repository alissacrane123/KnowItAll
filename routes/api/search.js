const express = require("express");
const router = express.Router();
const axios = require("axios");
const keys = require("../../config/keys");


router.get("/:searchQuery", (req, res) => {
  const processedQuery = req.params.searchQuery.split(" ").join("+");
  console.log("test")

    const queryToUse = processedQuery;

    axios({
      method: "get",
      url: `https://serpapi.com/search.json?q=${
        queryToUse}&location=Austin%2C+Texas%2C+United+States&hl=en&gl=us&google_domain=google.com&api_key=419667a803b08fa08d7dacfd8149f6cc5069990de3c495d91debe1f9d8ac1dbc`
    })
      .then(result => {
        debugger
        console.log(result)
       res.send(JSON.stringify(result.data));
      })
      .catch(err => {
       res.status(400).json(err);
      });
});

module.exports = router;