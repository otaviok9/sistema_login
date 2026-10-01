const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Agendamento = db.define('agendamento',{
    codAgendamento : {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    data:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    hora:{
        type: DataTypes.TIME,
        allowNull: false
    },
    idCiclista:{
        type: DataTypes.INTEGER,
        references: {
            model: 'ciclistas',
            key: 'codCiclista'
        },
        allowNull: false
    },
    idBicicleta:{
        type: DataTypes.INTEGER,
        references: {
            model: 'bicicletas',
            key: 'codBicicleta'
        },
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'agendamentos'
})

module.exports = Agendamento