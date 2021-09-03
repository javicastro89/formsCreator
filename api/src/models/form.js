const { DataTypes } = require('sequelize')


module.exports = (sequelize) => {

    sequelize.define('Form', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
        },
    });

    sequelize.define('Question', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        question_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    sequelize.define('Option', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        option: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
}
