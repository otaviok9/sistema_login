const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Ciclista = db.define('ciclista',{
    codCiclista : {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    senha:{
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    endereco:{
        type: DataTypes.STRING,
        allowNull: false
    },
    celular:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'ciclistas'
})

module.exports = Ciclista