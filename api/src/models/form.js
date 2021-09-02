const { DataTypes } = require('sequelize')


module.exports = (sequelize) => {

    sequelize.define('Form', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descriptions: {
            type: DataTypes.STRING,
        },
    });

    sequelize.define('Question', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        question_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        text: {
            type: DataTypes.STRING,
        }
    });

    sequelize.define('Option', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        option: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
}
