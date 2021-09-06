const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Models = require('../models');

var passwordValidator = require('password-validator');
const { use } = require('../routes/user');
 
// Create a schema
var schema = new passwordValidator();
 
// Add properties to it
schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces();                           // Should not have spaces


exports.signup = (req, res, next) => {
  if (schema.validate(req.body.password)) {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const User = Models.User.create({ 
          email: req.body.email,
          name: req.body.name,
          password: hash,
          status: 0,
          admin: 0 })
          .then((User) => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ 
            message: "Error 400 - Il doit avoir un autre usager déjà enregistré avec ce même mail"
           }));
      })
      .catch(error => res.status(500).json({ error }));
  }
};


  exports.login = (req, res, next) => {
    console.log(req.body.email);
    Models.User.findOne({ where: {email: req.body.email } })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              token  : jwt.sign(
                { userId: user.id, name: user.name, admin: user.admin, status: user.status },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }

              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(501).json({ error }));
  };


  exports.get = (req, res, next) => {
    Models.User.findOne({ where: {id: req.params.uid} })
      .then(user => res.status(200).json({ user }))
      .catch(error => res.status(400).json({ error }));
  };


  exports.getAllToValidate = (req, res, next) => {
    Models.User.findAll({ 
      where: { status: false },
      order: [['updatedAt', 'DESC']] 
    })
      .then(users => res.status(200).json({ users }))
      .catch(error => res.status(400).json({ error }));
  };


  exports.getAll = (req, res, next) => {
    Models.User.findAll({ 
      order: [['updatedAt', 'DESC']] 
    })
      .then(users => res.status(200).json({ users }))
      .catch(error => res.status(400).json({ error }));
  };


  exports.delete = (req, res, next) => {
    Models.User.findOne({ where: {id: req.params.uid} })
      .then(user => {
        Models.User.destroy({ where: {id: req.params.uid} })
            .then(() => res.status(200).json({ message: 'Usager supprimée !'}))
            .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };


  exports.validate = (req, res, next) => {
    Models.User.findOne({ where: {id: req.params.uid} })
      .then(user => {
        Models.User.update(
          { status: 1},
          { where: {id: req.params.uid} })
            .then(() => res.status(200).json({ message: 'Usager supprimée !'}))
            .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };


  exports.updateAdmin = (req, res, next) => {
    Models.User.findOne({ where: {id: req.query.userId} })
      .then(user => {
              Models.User.update( 
                { admin: req.query.admin},
                { where: {id: req.query.userId} })        
            .then(() => res.status(200).json({ message: 'Role actualisé !'}))
            .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };


  exports.updateStatus = (req, res, next) => {
    Models.User.findOne({ where: {id: req.query.userId} })
      .then(user => {
              Models.User.update( 
                { status: req.query.status},
                { where: {id: req.query.userId} })        
            .then(() => res.status(200).json({ message: 'Role actualisé !'}))
            .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };
