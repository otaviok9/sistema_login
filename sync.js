const conn = require('./db/conn')
const { Agendamento, Bicicleta, Ciclista } = require('./models/rel')

async function syncDatabase() {
    try {
        await conn.sync({force: true})
        console.log('Sincronizando as tabelas!')
    } catch (err) {
        console.error('Erro ao conectar com BD!')
    } finally {
        await conn.close()
        console.log('Fechando o BD!')
    }
}
syncDatabase()