var express = require('express');
var router = express.Router();
const ProfileController=require('../controllers/profileController.js')

router.get("/list",ProfileController.getAllProfiles);
router.get("/u-profile/:id",ProfileController.getOneProfile);
router.put("/status", ProfileController.updateStatus);
router.post("/follow", ProfileController.followUpdate);
router.post("/unfollow", ProfileController.unfollowUpdate);


module.exports = router;