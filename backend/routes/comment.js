const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
//const multer = require('../middleware/multer-config');

const commentsCtrl = require('../controllers/comment');


//router.get('/getone/:cid', auth, commentsCtrl.getOneComment);
//router.get('/getallbyuser/:userid', auth, commentsCtrl.getCommentsByUser);
router.get('/getallbypost/:pid', commentsCtrl.getAllCommentsByPost);
router.post('/create', commentsCtrl.createComment);
router.put('/update', commentsCtrl.updateComment);
router.put('/validate/:cid', commentsCtrl.validateComment);
router.delete('/delete/:cid', commentsCtrl.deleteComment);

module.exports = router;