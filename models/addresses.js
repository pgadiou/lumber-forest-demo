module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('addresses', {
    'io': {
      type: DataTypes.STRING,
    },
    'long': {
      type: DataTypes.INTEGER,
    },
    'lat': {
      type: DataTypes.INTEGER,
    },
    'address_line_1': {
      type: DataTypes.STRING,
    },
    'address_line_2': {
      type: DataTypes.STRING,
    },
    'address_city': {
      type: DataTypes.STRING,
    },
    'country': {
      type: DataTypes.STRING,
    },
    'created_at': {
      type: DataTypes.DATE,
    },
    'updated_at': {
      type: DataTypes.DATE,
    },
  }, {
    tableName: 'addresses',
    underscored: true,

    schema: process.env.DATABASE_SCHEMA,
  });

  Model.associate = (models) => {
    Model.belongsTo(models.customers, {
      foreignKey: 'customer_id',
      as: '_customer',
    });

  };

  return Model;
};

