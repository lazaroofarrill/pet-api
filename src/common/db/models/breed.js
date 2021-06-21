'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Breed extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Breed.hasMany(models.Pet, {as: 'pets'})
        }
    }

    Breed.init({
        name: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Breed',
    });
    return Breed;
};