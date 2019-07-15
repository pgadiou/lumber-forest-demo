module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('untitled_table', {
    'test': {
      type: DataTypes.STRING,
    },
    'untitled_id': {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    'json': {
      type: DataTypes.JSON,
    },
  }, {
    tableName: 'untitled_table',
    underscored: true,
    timestamps: false,
    hooks: {
      afterCreate: async (untitled_table, options) => {
        const isFindOne = !untitled_table.length;
        const limit = isFindOne ? 1 : untitled_table.length;
        // test
        if (isFindOne) { untitled_table = [untitled_table] }
        console.log(untitled_table)
        // const orders = await sequelize.models.orders.findAll({ limit })
        // const products = await sequelize.query(`
        //   SELECT id, label
        //   FROM products
        //   LIMIT ${limit}
        // `)
      }
    }
  });

  Model.associate = (models) => {
  };

  return Model;
};

