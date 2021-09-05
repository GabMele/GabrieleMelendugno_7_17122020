const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postsCtrl = require('../controllers/post');

//router.get('/get/:pid', auth, postsCtrl.get);
router.get('/getall', auth, postsCtrl.getAllPosts);
router.get('/latestsbypost/:howmany', auth, postsCtrl.getLatestsByPost);
router.get('/getpostsrange/', auth, postsCtrl.getPostsRange);
router.get('/latestsbycomment', auth, postsCtrl.getLatestsByComment);
//router.get('/getone/:pid', auth, postsCtrl.getOnePost);
//router.get('/getallbyuser/:userid', auth, postsCtrl.getPostsByUser);
router.post('/create', multer, postsCtrl.createPost);
router.put('/update', auth, multer, postsCtrl.updatePost);
router.put('/validate/:pid', postsCtrl.validatePost);
router.delete('/delete/:pid', postsCtrl.deletePost);

module.exports = router;