var express = require('express');
var router = express.Router();
const config = require('../../config')
const md5 = require('js-md5');
const ts = 1;
var request = require('request');

const hash = md5(ts + config.marvel_api_secret + config.marvel_api_key)

router.get('/', (req, res, next) => {
    request(`https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${config.marvel_api_key}&hash=${hash}`, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        body = JSON.parse(body);
        console.log('body:', body.data.results);
        if (error) {
            res.json({
                error
            })
        } else {
          res.json({
              characters : body.data.results
          })
        }
    });

})

module.exports = router
