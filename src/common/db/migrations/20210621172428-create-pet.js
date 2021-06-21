'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Pets', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            BreedId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Breeds',
                    key: 'id'
                }
            },
            OwnerId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'People',
                    key: 'id'
                }
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Pets');
    }
};