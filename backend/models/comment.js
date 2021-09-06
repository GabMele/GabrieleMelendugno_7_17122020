module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("Comment", {
      comment: {
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.INTEGER
      }
    });
    Comment.associate = function(models){ 
 
      
      models.User.hasMany(models.Post, { onDelete: 'cascade' });
      models.User.hasMany(models.Comment, { onDelete: 'cascade' });     
      models.Post.hasMany(models.Comment, { onDelete: 'cascade' });
      models.Post.belongsTo(models.User, { foreignKeyConstraint: true
        , onDelete: 'cascade' });
      models.Comment.belongsTo(models.User, { foreignKeyConstraint: true
        , nDelete: 'cascade' });     
      models.Comment.belongsTo(models.Post, { foreignKeyConstraint: true
        , onDelete: 'cascade' });
      
      
  };
    return Comment;
  };
