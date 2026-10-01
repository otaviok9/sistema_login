let resposta = document.getElementById('resposta_cad_ciclista')
let btn_cadastrar = document.getElementById('btn_cadastrar')

btn_cadastrar.addEventListener('click', (e)=>{
    e.preventDefault()

    const nome = document.getElementById('nome').value
    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value
    const cpf = document.getElementById('cpf').value
    const celular = document.getElementById('celular').value

    if(!nome || !email || !senha ||!cpf ||!endereco ||!celular){
        alert('todos os campos são obrigatórios')
        return
    }

    const valores = {
        nome: nome,
        email: email,
        senha: senha,
        cpf: cpf,
        celular:celular
    }

    fetch(`http://localhost:3000/ciclista`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(valores)
    })
    .then(resp => resp.json())
    .then(dados =>{
        console.log(dados)

        resposta.innerHTML = ''
        resposta.innerHTML += `<p>${dados.message}</p><br>`
    })
    .catch((err) => {
            console.error('Erro ao cadastrar o ciclista', err)
            resposta.innerHTML = ''
            resposta.innerHTML += 'Erro ao cadastrar o ciclista'
            resposta.style.color = 'orangered'
            resposta.style.fontSize = '1.4rem'
            resposta.style.fontWeight = 'bold'
    })

})