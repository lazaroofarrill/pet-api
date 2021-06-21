'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Animals', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            price: {
                type: Sequelize.DECIMAL
            },
            amount: {
                type: Sequelize.INTEGER
            },
            ShopId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Shops',
                    key: 'id'
                }
            },
            BreedId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Breeds',
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
        await queryInterface.dropTable('Animals');
    }
};