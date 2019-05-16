module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('appointments', {
    'name': {
      type: DataTypes.STRING,
    },
    'reason': {
      type: DataTypes.STRING,
    },
    'start_date': {
      type: DataTypes.DATE,
    },
    'end_date': {
      type: DataTypes.DATE,
    },
    'created_at': {
      type: DataTypes.DATE,
    },
    'updated_at': {
      type: DataTypes.DATE,
    },
    'status': {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'appointments',
    underscored: true,
    
    schema: process.env.DATABASE_SCHEMA,
  });

  Model.associate = (models) => {
  };

  return Model;
};

