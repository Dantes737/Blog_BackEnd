var express = require('express');
var router = express.Router();
const ProfileController = require('../controllers/profileController.js')
const checkAuth = require('../auth-midlleware/check-auth.js')

router.get("/list", checkAuth, ProfileController.getAllProfiles);
router.get("/u-profile/:id", checkAuth, ProfileController.getOneProfile);
router.put("/status", checkAuth, ProfileController.updateStatus);
router.post("/follow", checkAuth, ProfileController.followUpdate);
router.post("/unfollow", checkAuth, ProfileController.unfollowUpdate);


module.exports = router;