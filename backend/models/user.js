module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    admin: {
      type: DataTypes.INTEGER
    },
    status: {
      type: DataTypes.INTEGER
    }
  });
  User.associate = function(models){ 
 /*   models.User.hasMany(models.Post);
    models.User.hasMany(models.Comment);
 */

    
    models.User.hasMany(models.Post, { onDelete: 'cascade' });
    models.User.hasMany(models.Comment, { onDelete: 'cascade' });     
    models.Post.hasMany(models.Comment, { onDelete: 'cascade' });
    models.Post.belongsTo(models.User, { onDelete: 'cascade' });
    models.Comment.belongsTo(models.User, { onDelete: 'cascade' });     
    models.Comment.belongsTo(models.Post, { onDelete: 'cascade' });
 
  };
  return User;
};
