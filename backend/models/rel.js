const Ciclista = require('../models/Ciclista')
const Agendamento = require('../models/Agendamento')
const Bicicleta = require('../models/Bicicleta')

Ciclista.hasMany(Agendamento,{
    foreignKey: 'idCiclista',
    as: 'agendamentoCiclista',
    onDelete: 'CASCADE'
})

Agendamento.belongsTo(Ciclista,{
    foreignKey: 'idCiclista',
    as: 'ciclistaAgendamento',
    allowNull: false
})

Ciclista.hasMany(Bicicleta,{
    foreignKey: 'idCiclista',
    as: 'bicicletaCiclista',
    onDelete: 'CASCADE'
})

Bicicleta.belongsTo(Ciclista,{
    foreignKey: 'idCiclista',
    as: 'ciclistaBicicleta',
    allowNull: false
})

Bicicleta.hasMany(Agendamento,{
    foreignKey: 'idBicicleta',
    as: 'agendamentoBicicleta',
    onDelete: 'CASCADE'
})

Agendamento.belongsTo(Bicicleta,{
    foreignKey: 'idBicicleta',
    as: 'bicicletaAgendamento',
    allowNull: false
})

module.exports = { Ciclista, Agendamento, Bicicleta }