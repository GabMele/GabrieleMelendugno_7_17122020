const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postsCtrl = require('../controllers/post');

router.get('/getall', postsCtrl.getAllPosts);
router.get('/latestsbypost/:howmany', postsCtrl.getLatestsByPost);
router.get('/getpostsrange/', postsCtrl.getPostsRange);
router.get('/latestsbycomment', postsCtrl.getLatestsByComment);
router.post('/create', multer, postsCtrl.createPost);
router.put('/update', multer, postsCtrl.updatePost);
router.put('/validate/:pid', postsCtrl.validatePost);
router.delete('/delete/:pid', postsCtrl.deletePost);

module.exports = router;