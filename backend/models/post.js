module.exports = (sequelize, DataTypes) => {
  //creem si definim modelul POST
  const Post = sequelize.define(
    "Post", //numele modelului
    {
      //proprietatile modelului
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      title: { type: DataTypes.STRING, allowNull: false },
      content: { type: DataTypes.TEXT, allowNull: false },
      userId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {}
  );

  //definesc asociatiile lui POST
  Post.associate = function (models) {
    // associations can be defined here

    //contine
    Post.hasMany(models.Comment, {
      foreignKey: "postId",
      as: "comments",
      onDelete: "cascade",
    });

    //apartine
    Post.belongsTo(models.User, {
      foreignKey: "userId",
      as: "author",
      onDelete: "cascade",
    });
  };
  return Post;
};
