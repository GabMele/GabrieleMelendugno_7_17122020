//const Post = require('../models/post');
const Models = require('../models');
const fs = require('fs');
const { sequelize } = require('../models');

//var config = require('../config/config');

/*
exports.get = (req, res, next) => {
  Models.Post.findOne({ where: {id: req.params.pid} })
    .then(post => res.status(200).json({ post }))
    .catch(error => res.status(400).json({ error }));
};
*/

/* oookkkkkkkkkk
exports.getAllPosts = (req, res, next) => {
  Models.Post.findAll(
    { order: [['updatedAt', 'DESC']]  }
  )
  .then(posts => res.status(200).json({posts}))
  .catch(error => res.status(400).json({ error }));
};
*/

/* it creates an array of 2 arrays which every record contains
the results of the query 

exports.getAllPosts = (req, res, next) => {
  sequelize.query(`
  SELECT posts.*, users.name FROM posts
  INNER JOIN users ON posts.userId = users.id
  ORDER BY posts.updatedAt DESC;
`)
  .then(posts => res.status(200).json({posts}))
  .catch(error => res.status(400).json({ error }));
};
*/



exports.getAllPosts = (req, res, next) => {
  Models.Post.findAll({ 
      limit: 50, order: [['updatedAt', 'DESC']],
      include: [ Models.User ] 
    })
  .then(posts => res.status(200).json({posts}))
  .catch(error => res.status(400).json({ error }));
};



//    limit: 10, order: [['updatedAt', 'DESC']]

/* ========================ookkkk=============
exports.getLatests5ByPost = (req, res, next) => {
  Models.Post.findAll(
    { limit: 10, order: [['updatedAt', 'DESC']]  }
  )
  .then(posts => res.status(200).json({posts}))
  .catch(error => res.status(400).json({ error }));
};

exports.getLatestsByPost = (req, res, next) => {
  Models.Post.findAll(
    { limit: config.HowManyLatestPost , order: [['updatedAt', 'DESC']]  }
  )
  .then(posts => res.status(200).json({posts}))
  .catch(error => res.status(400).json({ error }));
};
*/


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


// ?????????????????? by updatedAt ON COMMENT ??????????
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


/*
exports.getOnePost = (req, res, next) => {
  Post.findOne({
    where: { _id: req.params.id }
  }).then(
    (post) => {
      res.status(200).json(post);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};
*/

/*
exports.getPostsByUser = (req, res, next) => {
  Post.find({
    where: { userId: req.params.userId }
  }).then(
    (posts) => {
      res.status(200).json(posts);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};
*/

/*
exports.createPost = (req, res, next) => {
  const postObject = JSON.parse(req.body.post);
  delete postObject._id;
  const post = new post({
    ...postObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  post.save()
    .then(() => res.status(201).json({ message: 'post enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};
*/

exports.createPost = (req, res, next) => {
  const Post = Models.Post.create({
    post: req.body.post,
    status: 0,
    UserId: req.body.userId,
    imageUrl: req.body.imageUrl
    //imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  })
    .then(() => res.status(201).json({ message: 'Post enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};



exports.updatePost = (req, res, next) => {
/*  const postObject = req.file ?
    {
      ...JSON.parse(req.body.post),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
 */
     Models.Post.update(
        { id: req.body.id, 
          post: req.body.post,
 //    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        },     
        { where: {id: req.body.id} })
    .then(() => res.status(200).json({ message: 'Post modifié !'}))
    .catch(error => res.status(400).json({ error }));
};


/*
exports.updatePost = (req, res, next) => {
  Models.Post.findOne({ where: {id: req.params.pid} })
      .then(post => {
 //       const filename = post.imageUrl.split('/images/')[1];
  //      fs.unlink(`images/${filename}`, () => {
          Models.Post.update(
            { status: 1},
            { where: {id: req.params.pid} })
            .then(() => res.status(200).json({ message: 'Post modifié !'}))
            .catch(error => res.status(400).json({ error }));
        })
      .catch(error => res.status(500).json({ error }));
  };
*/


exports.validatePost = (req, res, next) => {
  Models.Post.findOne({ where: {id: req.params.pid} })
      .then(post => {
 //       const filename = post.imageUrl.split('/images/')[1];
  //      fs.unlink(`images/${filename}`, () => {
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
 //       const filename = post.imageUrl.split('/images/')[1];
  //      fs.unlink(`images/${filename}`, () => {
          Models.Post.destroy({ where: {id: req.params.pid} })
            .then(() => res.status(200).json({ message: 'Post supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        })
      .catch(error => res.status(500).json({ error }));
  };


