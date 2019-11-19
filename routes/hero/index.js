var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.json({
      api_ok:true
    })
})

module.exports = router
