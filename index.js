const express = require('express')
const app = express()
const cors = require('cors')

const conn = require('./db/conn')

// Controllers disponíveis
const authController = require('./controller/auth.controller')
const ciclistaController = require('./controller/ciclista.controller')

// Middleware de Autenticação
const authMiddleware = require('./middleware/auth.middleware')

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

// ---- Rota de Autenticação / Login ----
app.post('/login', authController.login)

// ---- Rotas do Ciclista ----
app.post('/ciclista', ciclistaController.cadastrar) // Cadastro livre
app.get('/ciclista/:id', authMiddleware, ciclistaController.consultar)
app.get('/ciclistas', authMiddleware, ciclistaController.listar)
app.delete('/ciclista/:id', authMiddleware, ciclistaController.apagar)
app.put('/ciclista/:id', authMiddleware, ciclistaController.atualizar)

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