module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("Post", {
      post: {
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.INTEGER
      },
      imageUrl: {
        type: DataTypes.STRING
      }      
    });
   Post.associate = function(models){ 
     
      models.User.hasMany(models.Post, { onDelete: 'cascade' });
      models.User.hasMany(models.Comment, { onDelete: 'cascade' });     
      models.Post.hasMany(models.Comment, { onDelete: 'cascade' });
      models.Post.belongsTo(models.User, { foreignKeyConstraint: true
        , onDelete: 'cascade' });
      models.Comment.belongsTo(models.User, { foreignKeyConstraint: true
        , onDelete: 'cascade' });     
      models.Comment.belongsTo(models.Post, { foreignKeyConstraint: true
        , onDelete: 'cascade' });
      
  };
    return Post;
 
  };
