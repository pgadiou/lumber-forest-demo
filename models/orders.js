module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('orders', {
    'ref': {
      type: DataTypes.STRING,
      primaryKey: true 
    },
    'shipping_status': {
      type: DataTypes.STRING,
    },
    'created_at': {
      type: DataTypes.DATE,
    },
    'updated_at': {
      type: DataTypes.DATE,
    },
    'being_processed_at': {
      type: DataTypes.DATE,
    },
    'ready_for_shipping_at': {
      type: DataTypes.DATE,
    },
    'in_transit_at': {
      type: DataTypes.DATE,
    },
    'shipped_at': {
      type: DataTypes.DATE,
    },
  }, {
    tableName: 'orders',
    underscored: true,
    
    schema: process.env.DATABASE_SCHEMA,
  });

  Model.associate = (models) => {
    Model.belongsTo(models.products, {
      foreignKey: 'product_id',
      
      as: '_product_id',
    });
    
    Model.belongsTo(models.customers, {
      foreignKey: 'customer_id',
      
      as: '_customer_id',
    });
    
    Model.belongsTo(models.deliveries, {
      foreignKey: 'delivery_id',
      
      as: '_delivery_id',
    });
    
  };

  return Model;
};

