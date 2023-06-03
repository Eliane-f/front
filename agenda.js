function atualizarAgenda(){
    const agendamentos =fetch('http://localhost:3000/agenda')
    .then(resposta => resposta.json())
    .then(agenda =>{
        agenda.forEach(agenda => {
            const li = document.createElement('li')
            li.textContent =  `${agenda.paciente} - ${agenda.profissional} - ${agenda.data} - ${agenda.hora}`
            document.getElementById('listaAgendamentos').appendChild(li)
        });
    })
}

atualizarAgenda()

document.getElementById("formCadastro").addEventListener("submit",function(event){
    event.preventDefault()
    cadastrarAgendamento(event)
});

function cadastrarAgendamento(form){
    const agendamento = {
        paciente: form.target.paciente.value,
        profissional: form.target.profissional.value,
        data: form.target.data.value,
        hora: form.target.hora.value
    }

    fetch('http://localhost:3000/agenda',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(agendamento)
    }).then(resposta =>{
        if(resposta.status != 200 && resposta.status!= 201){
            alert('Erro ao cadastrar')
        }
        alert('cadastro realizado com sucesso')
        form.target.reset()
        atualizarAgenda()
    } )
}