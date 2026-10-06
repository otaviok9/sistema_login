// Status inicial do localStorage ao carregar a página
let statusLog = localStorage.getItem('statusLog')
let nomeUsuario = localStorage.getItem('nomeUsuario')


if(!statusLog){
    alert('Para ter acesso faça o Login')
    location.href = '../index.html'
}

let resposta = document.getElementById('resposta')
let btn_consultar = document.getElementById('btn_consultar')

btn_consultar.addEventListener('click', (e)=>{
    e.preventDefault()

    let codUsuario = Number(document.getElementById('codUsuario').value)
    console.log('codUsuario = ',codUsuario)

    if(!codUsuario){
        resposta.innerHTML = ''
        resposta.innerHTML += 'Todos os campos são Obrigatórios'
        alert('Campos Obrigatórios!')
        return
    }

    let statusLogAtual = localStorage.getItem('statusLog')

    fetch(`${API_URL}/usuario/${codUsuario}?statusLog=${statusLogAtual}`)
    .then(res => res.json())
    .then(dados =>{
        console.log(dados)
        resposta.innerHTML = ''
        resposta.innerHTML += `<div class="card">${criarCard(dados)}</div>`
    })
    .catch((err) => {
            console.error('Erro ao consultar o usuário', err)
            resposta.innerHTML = ''
            resposta.innerHTML += 'Erro ao consultar o usuário'
            resposta.style.color = 'orangered'
            resposta.style.fontSize = '1.4rem'
            resposta.style.fontWeight = 'bold'
    })
})

function criarCard(dados){
    let card = ''

    card += `    
        <h2>Nome: ${dados.nome}</h2>
        <hr>
        <br>
        <p><strong>Código: ${dados.codUsuario}</strong></p>
        <p><strong>email: ${dados.email}</strong></p>
        <p><strong>senha: ${dados.senha}</strong></p>        
    `
    return card
}