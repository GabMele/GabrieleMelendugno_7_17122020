//const Comment = require('../models/comment');
const Models = require('../models');
const fs = require('fs');


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
  })
    .then(() => res.status(201).json({ message: 'Commentaire enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};


exports.updateComment = (req, res, next) => {
  Models.Comment.update(
    { id: req.body.id, 
      comment: req.body.comment,
    },     
    { where: {id: req.body.id} })
  .then(() => res.status(200).json({ message: 'Commentaire modifié !'}))
  .catch(error => res.status(400).json({ error }));
};


exports.validateComment = (req, res, next) => {
  Models.Comment.findOne({ where: {id: req.params.cid} })
      .then(post => {
          Models.Comment.update(
            { status: 1},
            { where: {id: req.params.cid} 
          })
            .then(() => res.status(200).json({ message: 'Commentaire validé !'}))
            .catch(error => res.status(400).json({ error }));
        })
      .catch(error => res.status(500).json({ error }));
  };

exports.deleteComment = (req, res, next) => {
    Models.Comment.findOne({ where: {id: req.params.cid} })
    .then(post => {
        Models.Comment.destroy({ where: {id: req.params.cid} })
          .then(() => res.status(200).json({ message: 'Commentaire supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      })
    .catch(error => res.status(500).json({ error }));
};

  
