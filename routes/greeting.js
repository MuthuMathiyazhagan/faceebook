var express = require('express');
var router = express.Router();
const facebookController = require('../controller/facebook');

/* GET users listing. */
router.get('/hello', function (req, res, next) {
    let searchString = "public";
    let postGroup = "The Mind Is Everything, What you think , you become";
    let username = "mugilarasu@divum.in";
    let password = "facebook@123";
    facebookController.runScript(searchString, postGroup, username, password);
    res.json('Greetings from API!');
});

router.post('/hello', function (req, res, next) {

    console.log("Post Method Called");


    let searchString = req.body.searchString;
    let postGroup = req.body.postGroup;
    let username = req.body.username;
    let password = req.body.password;
    facebookController.runScript(searchString, postGroup, username, password);

    res.json('Greetings from API! : Post Method');

});


module.exports = router;