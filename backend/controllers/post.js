const Models = require('../models');
const fs = require('fs');
const { sequelize } = require('../models');


exports.getAllPosts = (req, res, next) => {
  Models.Post.findAll({ 
      limit: 50, order: [['updatedAt', 'DESC']],
      include: [ Models.User ] 
    })
  .then(posts => res.status(200).json({posts}))
  .catch(error => res.status(400).json({ error }));
};


exports.getLatestsByPost = (req, res, next) => {
  Models.Post.findAll(
    { limit: Number(req.params.howmany) , order: [['updatedAt', 'DESC']]  }
  )
  .then(posts => res.status(200).json({posts}))
  .catch(error => res.status(400).json({ error }));
};


exports.getLatestsStartingFrom = (req, res, next) => {
  Models.Post.findAll(
    { limit: Number(req.params.howmany) , order: [['updatedAt', 'DESC']]  }
  )
  .then(posts => res.status(200).json({posts}))
  .catch(error => res.status(400).json({ error }));
};


exports.getPostsRange = (req, res, next) => {
  let howmany = Number(req.query.howmany);
  let start = Number(req.query.start);
  Models.Post.findAll(
    { limit:  howmany,
      offset: start,
      order: [['updatedAt', 'DESC']]  }
  )
  .then(posts => res.status(200).json({posts}))
  .catch(error => res.status(400).json({ error }));
};


exports.getLatestsByComment = (req, res, next) => {
    sequelize.query(`
          SELECT posts.post, posts.id, FROM posts
          INNER JOIN comments ON comments.postId = posts.id
          GROUP BY comments.postId
          ORDER BY comments.updatedAt DESC;
      `)
  .then(posts => res.status(200).json({posts}))
  .catch(error => res.status(400).json({ error }));
  };


exports.createPost = (req, res, next) => {
  const Post = Models.Post.create({
    post: req.body.post,
    status: 0,
    UserId: req.body.userId,
    imageUrl: req.body.imageUrl
  })
    .then(() => res.status(201).json({ message: 'Post enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};


exports.updatePost = (req, res, next) => {
     Models.Post.update(
        { id: req.body.id, 
          post: req.body.post
        },     
        { where: {id: req.body.id} })
    .then(() => res.status(200).json({ message: 'Post modifié !'}))
    .catch(error => res.status(400).json({ error }));
};


exports.validatePost = (req, res, next) => {
  Models.Post.findOne({ where: {id: req.params.pid} })
      .then(post => {
          Models.Post.update(
            { status: 1},
            { where: {id: req.params.pid} 
          })
            .then(() => res.status(200).json({ message: 'Post validé !'}))
            .catch(error => res.status(400).json({ error }));
        })
      .catch(error => res.status(500).json({ error }));
  };


exports.deletePost = (req, res, next) => {
  Models.Post.findOne({ where: {id: req.params.pid} })
      .then(post => {
          Models.Post.destroy({ where: {id: req.params.pid} })
            .then(() => res.status(200).json({ message: 'Post supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        })
      .catch(error => res.status(500).json({ error }));
  };


