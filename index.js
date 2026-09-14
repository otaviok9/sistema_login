const express = require('express')
const app = express()
const cors = require('cors')

const conn = require('./db/conn')

// Controllers 
const ciclistaController = require('./controller/ciclista.controller')
const bicicletaController = require('./controller/bicicleta.controller')
const agendamentoController = require('./controller/agendamento.controller')

const hostname = 'localhost' // 127.0.0.1
const PORT = 3000

// ---- Middleware ---------
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
// -------------------------

// Rota inicial de verificação
app.get('/', (req, res) => {
    res.json({ message: 'Aplicação rodando!' })
})

// ---- Rotas do Ciclista ----
app.post('/ciclista', ciclistaController.cadastrar)
app.get('/ciclista/:id', ciclistaController.consultar)
app.get('/ciclistas', ciclistaController.listar)
app.delete('/ciclista/:id', ciclistaController.apagar)
app.put('/ciclista/:id', ciclistaController.atualizar)

// ---- Rotas da Bicicleta ----
app.post('/bicicleta', bicicletaController.cadastrar)

// ---- Rotas do Agendamento ----
app.post('/agendamento', agendamentoController.cadastrar)
app.get('/agendamentos/ordenados', agendamentoController.listarOrdenado)
app.put('/agendamento/:id', agendamentoController.atualizar)

// --------------------------
conn.sync()
.then(() => {
    app.listen(PORT, hostname, () => {
        console.log(`Servidor rodando em http://${hostname}:${PORT}`)
    })
})
.catch((err) => {
    console.error('Erro ao sincronizar com o BD:', err)
})