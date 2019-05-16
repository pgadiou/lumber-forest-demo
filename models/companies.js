module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('companies', {
    'name': {
      type: DataTypes.STRING,
    },
    'industry': {
      type: DataTypes.STRING,
    },
    'headquarter': {
      type: DataTypes.STRING,
    },
    'status': {
      type: DataTypes.STRING,
    },
    'description': {
      type: DataTypes.STRING,
    },
    'created_at': {
      type: DataTypes.DATE,
    },
    'updated_at': {
      type: DataTypes.DATE,
    },
    'certificate_of_incorporation_id': {
      type: DataTypes.UUID,
    },
    'proof_of_address_id': {
      type: DataTypes.UUID,
    },
    'bank_statement_id': {
      type: DataTypes.UUID,
    },
    'passport_id': {
      type: DataTypes.UUID,
    },
  }, {
    tableName: 'companies',
    underscored: true,
    
    schema: process.env.DATABASE_SCHEMA,
  });

  Model.associate = (models) => {
  };

  return Model;
};

