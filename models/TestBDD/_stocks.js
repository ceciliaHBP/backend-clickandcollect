const { DataTypes } = require('sequelize')
const db = require('../../db/db')

const TestStocks = db.define('TestStocks', {
    stockId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantite: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date_reapprovisionnement: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });

  TestStocks.associate = function(models) {
    TestStocks.belongsTo(models.TestProductsV4, { foreignKey: 'productId' });
  };
  //chaque stock appartient à un produit

module.exports = TestStocks