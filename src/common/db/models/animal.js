'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Animal extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Animal.belongsTo(models.Shop, {foreignKey: 'ShopId', as: 'shop'})
            Animal.belongsTo(models.Breed, {foreignKey: 'BreedId', as: 'breed'})
        }
    }

    Animal.init({
        price: DataTypes.DOUBLE,
        amount: DataTypes.INTEGER,
        ShopId: DataTypes.INTEGER,
        BreedId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Animal',
    });
    return Animal;
};