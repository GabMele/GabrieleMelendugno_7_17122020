const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const commentsCtrl = require('../controllers/comment');

router.get('/getallbypost/:pid', auth, commentsCtrl.getAllCommentsByPost);
router.post('/create', auth, commentsCtrl.createComment);
router.put('/update', auth, commentsCtrl.updateComment);
router.put('/validate/:cid', auth, commentsCtrl.validateComment);
router.delete('/delete/:cid', auth, commentsCtrl.deleteComment);

module.exports = router;