const express = require('express');
const router = express.Router();
const homeController = require("../controllers/home_controller");
const aboutController = require("../controllers/about_controller");

router.get('/',homeController.home);
router.use('/users',require('./users'))
router.get('/about',aboutController.about);


// for any further routes access from here
// router.use('/routerName', require('./routerfile'));

console.log("Router Loaded");
module.exports = router;