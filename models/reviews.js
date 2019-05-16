module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('reviews', {
    'grade': {
      type: DataTypes.INTEGER,
    },
  }, {
    tableName: 'reviews',

    timestamps: false,

  });

  Model.associate = (models) => {
    Model.belongsTo(models.orders, {
      foreignKey: 'order_ref',

      as: '_order',
    });
  };

  return Model;
};

