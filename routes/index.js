var express = require('express');
var router = express.Router();
var uc = require('../controllers/userController');

/* home page */
router.get('/', uc.checkLoginStatus);

/* login */
router.post('/', uc.login);

/* logout */
router.get('/logout', uc.logout);

/* status update */
router.post('/status', uc.updateStatus);

/* practice */
router.get('/practice', uc.practice);

/* get questions */
router.get('/questions/:n', uc.questions)

/* play */
router.get('/play/:username', uc.play);

/* update play */
router.post('/play/status/:username', uc.playStatus);

module.exports = router;
