module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('documents', {
    'file_id': {
      type: DataTypes.STRING,
    },
    'is_verified': {
      type: DataTypes.BOOLEAN,
    },
  }, {
    tableName: 'documents',
    underscored: true,
    timestamps: false,
    schema: process.env.DATABASE_SCHEMA,
  });

  Model.associate = (models) => {
  };

  return Model;
};

