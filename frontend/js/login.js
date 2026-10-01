let resposta = document.getElementById('resposta')
let btn_login = document.getElementById('btn_login')

btn_cadastrar.addEventListener('click', (e)=>{
    e.preventDefault()

    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value

    if( !email || !senha){
        alert('todos os campos são obrigatórios')
        return
    }

    const valores = {
        email: email,
        senha: senha
    }

    fetch(`http://localhost:3000/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(valores)
    })
    .then(resp => resp.json())
    .then(dados =>{
        console.log(dados)

        resposta.innerHTML = ''
        resposta.innerHTML += `<p>${dados.message}</p><br>`

        if(dados.token){
            localStorage.setItem('token',dados.token)
            localStorage.setItem('nome',dados.nome)
            location.href = '../index.html'
        }
    })
    .catch((err) => {
            console.error('Erro ao cadastrar o ciclista', err)
            resposta.innerHTML = ''
            resposta.innerHTML += 'Erro ao fazer login do ciclista'
            resposta.style.color = 'orangered'
            resposta.style.fontSize = '1.4rem'
            resposta.style.fontWeight = 'bold'
    })

})