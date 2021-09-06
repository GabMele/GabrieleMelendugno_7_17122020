const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/get/:uid', auth, userCtrl.get);
router.get('/getalltovalidate', auth, userCtrl.getAllToValidate);
router.get('/getall', auth, userCtrl.getAll);
router.delete('/delete/:uid', auth, userCtrl.delete);
router.get('/updateadmin', auth, userCtrl.updateAdmin);
router.get('/updatestatus', auth, userCtrl.updateStatus);

module.exports = router;