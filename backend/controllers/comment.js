//const Comment = require('../models/comment');
const Models = require('../models');
const fs = require('fs');


/*
exports.getOneComment = (req, res, next) => {
  Comment.findOne({
    _id: req.params.id
  }).then(
    (comment) => {
      res.status(200).json(comment);
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

exports.getAllCommentsByPost = (req, res, next) => {
  Models.Comment.findAll({
     where: { postId: req.params.pid },
     order:  [['updatedAt', 'DESC']],
     include: [ Models.User ]

    })
    .then(comments => res.status(200).json({comments}))
    .catch(error => res.status(400).json({ error }));
};


exports.createComment = (req, res, next) => {
  const Comment = Models.Comment.create({
    comment: req.body.comment,
    status: 0,
    PostId: req.body.postId,
    UserId: req.body.userId
    //imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  })
    .then(() => res.status(201).json({ message: 'Commentaire enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};


exports.updateComment = (req, res, next) => {
/*  const commentObject = req.file ?
    {
      ...JSON.parse(req.body.comment),
    } : { ...req.body };
  Comment.save({ _id: req.params.id }, { ...commentObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Commentaire modifié !'}))
    .catch(error => res.status(400).json({ error }));
*/
  Models.Comment.update(
    { id: req.body.id, 
      comment: req.body.comment,
  //    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    },     
    { where: {id: req.body.id} })
  .then(() => res.status(200).json({ message: 'Commentaire modifié !'}))
  .catch(error => res.status(400).json({ error }));
};


exports.validateComment = (req, res, next) => {
  Models.Comment.findOne({ where: {id: req.params.cid} })
      .then(post => {
 //       const filename = post.imageUrl.split('/images/')[1];
  //      fs.unlink(`images/${filename}`, () => {
          Models.Comment.update(
            { status: 1},
            { where: {id: req.params.cid} 
          })
            .then(() => res.status(200).json({ message: 'Commentaire validé !'}))
            .catch(error => res.status(400).json({ error }));
        })
      .catch(error => res.status(500).json({ error }));
  };


/* exports.deleteComment = (req, res, next) => {
    Comment.findOne({ _id: req.params.id })
      .then(comment => {
        const filename = comment.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Comment.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Comment supprimée !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
  };
*/

exports.deleteComment = (req, res, next) => {
    Models.Comment.findOne({ where: {id: req.params.cid} })
    .then(post => {
//       const filename = post.imageUrl.split('/images/')[1];
//      fs.unlink(`images/${filename}`, () => {
        Models.Comment.destroy({ where: {id: req.params.cid} })
          .then(() => res.status(200).json({ message: 'Commentaire supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      })
    .catch(error => res.status(500).json({ error }));
};

  
