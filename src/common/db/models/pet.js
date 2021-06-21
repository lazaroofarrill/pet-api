'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Pet extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Pet.belongsTo(models.Breed, {foreignKey: 'BreedId', as: 'breed'})
            Pet.belongsTo(models.Person, {foreignKey: 'OwnerId', as: 'owner'})
        }
    }

    Pet.init({
        name: DataTypes.STRING,
        BreedId: DataTypes.INTEGER,
        OwnerId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Pet',
    });
    return Pet;
};