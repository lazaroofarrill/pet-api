'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Person extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Person.hasMany(models.Pet, {foreignKey: 'OwnerId', as: 'pets'})
        }
    }

    Person.init({
        name: DataTypes.STRING,
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        photo: DataTypes.BLOB
    }, {
        sequelize,
        modelName: 'Person',
    });
    return Person;
};