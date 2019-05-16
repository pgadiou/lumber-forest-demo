module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('products', {
    'created_at': {
      type: DataTypes.DATE,
    },
    'updated_at': {
      type: DataTypes.DATE,
    },
    'price': {
      type: DataTypes.DOUBLE,
    },
    'label': {
      type: DataTypes.STRING,
    },
    'picture': {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'products',
    underscored: true,
    
    schema: process.env.DATABASE_SCHEMA,
  });

  Model.associate = (models) => {
  };

  return Model;
};

