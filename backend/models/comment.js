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
   /*   models.Comment.belongsTo(models.User,{foreignKey:{allowNull:false}});
      models.Comment.belongsTo(models.Post,{foreignKey:{allowNull:false}});
   */

      
      models.User.hasMany(models.Post, { onDelete: 'cascade' });
      models.User.hasMany(models.Comment, { onDelete: 'cascade' });     
      models.Post.hasMany(models.Comment, { onDelete: 'cascade' });
      models.Post.belongsTo(models.User, { onDelete: 'cascade' });
      models.Comment.belongsTo(models.User, { onDelete: 'cascade' });     
      models.Comment.belongsTo(models.Post, { onDelete: 'cascade' });
      
      
  };
    return Comment;
  };
