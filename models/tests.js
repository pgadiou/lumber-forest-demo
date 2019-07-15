module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('tests', {
    'column2': {
      type: DataTypes.STRING,
    },
    'test_field': {
      type: DataTypes.INTEGER,
    },
  }, {
    tableName: 'tests',
    underscored: true,
    timestamps: false,

  });

  Model.associate = (models) => {
  };

  Model.removeAttribute('id');

  return Model;
};

