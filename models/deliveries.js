module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('deliveries', {
    'phone': {
      type: DataTypes.STRING,
    },
    'lng': {
      type: DataTypes.DOUBLE,
    },
    'lat': {
      type: DataTypes.DOUBLE,
    },
    'is_delivered': {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
    'created_at': {
      type: DataTypes.DATE,
    },
    'updated_at': {
      type: DataTypes.DATE,
    },
  }, {
    tableName: 'deliveries',
    underscored: true,

    schema: process.env.DATABASE_SCHEMA,
  });

  Model.associate = (models) => {
    Model.hasMany(models.orders);
  };

  return Model;
};

