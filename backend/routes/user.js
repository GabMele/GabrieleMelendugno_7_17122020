const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/get/:uid', userCtrl.get);
router.get('/getalltovalidate', userCtrl.getAllToValidate);
router.get('/getall', userCtrl.getAll);
router.delete('/delete/:uid', userCtrl.delete);
//router.put('/validate/:uid', userCtrl.validate);
//router.put('/makeadmin/:uid', );
router.get('/updateadmin', userCtrl.updateAdmin);
router.get('/updatestatus', userCtrl.updateStatus);

//router.get('/getUser/:id', auth, userCtrl.getUser);
//router.put("/updateUser/:id", auth, usersCtrl.updateUser);

module.exports = router;