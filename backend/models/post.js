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
 /*   models.Post.belongsTo(models.User,{foreignKey:{allowNull:false}});
      models.Post.hasMany(models.Comment);
    
      */
     
      models.User.hasMany(models.Post, { onDelete: 'cascade' });
      models.User.hasMany(models.Comment, { onDelete: 'cascade' });     
      models.Post.hasMany(models.Comment, { onDelete: 'cascade' });
      models.Post.belongsTo(models.User, { onDelete: 'cascade' });
      models.Comment.belongsTo(models.User, { onDelete: 'cascade' });     
      models.Comment.belongsTo(models.Post, { onDelete: 'cascade' });
      
  };
    return Post;
 
  };
