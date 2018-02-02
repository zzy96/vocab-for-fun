var express = require('express');
var router = express.Router();
var uc = require('../controllers/userController');
var ac = require('../controllers/authenticationController');

/* home page */
router.get('/', uc.checkLoginStatus);

/* login */
router.post('/', uc.login);

/* logout */
router.get('/logout', uc.logout);

/* status update */
router.post('/status', uc.updateStatus);

/* practice */
router.get('/practice', ac.checkLoginStatus, uc.practice);

/* invite */
router.get('/invite/:username', ac.checkLoginStatus, uc.invite);

/* play */
router.get('/play/:session', ac.checkLoginStatus, uc.play);

/* update play */
router.get('/play/status/:session', ac.checkLoginStatus, uc.playStatus)

module.exports = router;
