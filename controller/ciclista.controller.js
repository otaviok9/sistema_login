const Ciclista = require('../models/Ciclista')

const cryptoJs = require('crypto-js')
const CHAVE_SECRETA = 'gremio'

const cadastrar = async (req,res)=> {
   const valores =  req.body
    console.log(valores)

    if(!valores.nome || !valores.email || !valores.senha || !valores.cpf || !valores.endereco || !valores.celular){
        return res.status(400).json({message: 'Todos os campos são obrigatórios'})
    }

    if(!valores.cpf.length !== 11 ){
        res.status(400).json({message: 'CPF inválido'})
    }

         try{
    const cpfCripto = cryptoJs.AES.encrypt(valores.cpf, CHAVE_SECRETA).toString()
    const senhaCripto = cryptoJs.AES.encrypt(valores.senha, CHAVE_SECRETA).toString()

    await Ciclista.create({
        nome: valores.nome,
        email:valores.email,
        senha: senhaCripto,
        cpf: cpfCripto,
        endereco: valores.endereco,
        celular: valores.celular
    })

    res.status(201).json({message: 'ciclista cadastrado com sucesso'})

    }catch(err){
        console.error('erro ao cadastrar o ciclista',err)
        res.status(500).json({message: 'erro ao cadastrar o ciclista'})
  }
}


const listar = async (req,res)=> {
    try{
        const dados = await Ciclista.findAll()
        res.status(201).json(dados)
    }catch(err){
        res.status(500).json({message: "erro ao cadastrar os dados"})
    }
}
const consultar = async (req,res)=> {
    const id = req.params.id
    console.log(id)
    try{
        const dados = await Ciclista.findByPk(id)
        res.status(200).json(dados)
    }catch(err){
        res.status(500).json({message: "erro ao cadastrar os dados"})
    }
}

const apagar = async (req,res)=> {
    const id = req.params.id
    console.log(id)
    try{
        const dados = await Ciclista.findByPk(id)
        if(!dados){
            res.status(404).json({message: "Usuário não encontrado"})
        }else{
            await Ciclista.destroy({where : { codUsuario: id}})
            res.status(200).json({message: "Usuário excluído com sucesso!"})
        }
    }catch(err){
        res.status(500).json({message: "erro ao cadastrar os dados"})
    }
}

const atualizar = async (req,res)=> {
    const id = req.params.id
    const valores =  req.body
    console.log(valores)
    console.log(id)
    try{
        const dados = await Ciclista.findByPk(id)
        if(!dados){
            res.staus(404).json({message: "Usuário não encontrado"})
        }else{
            await Ciclista.update(valores,{where : { codUsuario: id}})
            const dados2 = await Ciclista.findByPk(id)
            res.status(200).json(dados2)
        }
    }catch(err){
        res.status(500).json({message: "erro ao cadastrar os dados"})
    }
}

module.exports = { cadastrar, listar, consultar, apagar, atualizar }