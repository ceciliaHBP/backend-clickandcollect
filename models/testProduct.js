const { DataTypes } = require('sequelize')
const db = require('../db/db')
// const TestOrder = require('./testOrder')

const Product = db.define('Products', {
    
    id_produit: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    id_famille_produit: {
        //foreign key
        type: DataTypes.INTEGER,
      },
    id_marque: {
        //foreign key
        type: DataTypes.INTEGER,
      },
    libelle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    reference: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    prix:{
      //donne un string - penser à 
      //convertir en nombre si utilisé dans le code
        type: DataTypes.DECIMAL(10,2),
        allowNull:false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    image: {
      type: DataTypes.STRING,
      allowNull:true,
      },
    categorie:{
      type: DataTypes.STRING,
      allowNull:true,
    },
    type_produit: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    type_assemblage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    menu_avec_remise: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
    poids_net: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
    poids_brut: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
    commercialise: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    vente_a_distance: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    elligible_titre_repas: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    bio: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    gere_a_lentrepot: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    reference_fournisseur: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    produit_a_peser: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    jours_dlc: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    domaine: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    millesime: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    chateau: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    cuvee: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    appellation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    id_rayon: {
        //foreign key
        type: DataTypes.INTEGER,
      },
    libelle_rayon: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    allergenes: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    date_derniere_mise_a_jour: {
        type: DataTypes.DATE,
        allowNull: true,
      }

})

// relation
// a rajouter
// Un produit (Products) peut être inclus dans plusieurs commandes (Orders) via la table OrderProducts.

/**Product.associate = function(models) {
  Product.belongsToMany(models.TestOrder, { 
    through: 'TestOrderProduct', 
    foreignKey: 'id_produit', //productId
    otherKey: 'id' //orderId
  });
};
*/


module.exports = Product

