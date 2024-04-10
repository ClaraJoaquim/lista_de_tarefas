const input = document.querySelector('.input-tarefa');
const botao = document.querySelector('.btn-tafera');
const tarefas = document.querySelector('.tarefas');

function criaLi () {
    const li = document.createElement('li');
    return li;

}

function criaBotaoApagar (li) {
    li.innerHTML += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerHTML = 'Apagar';
    // botaoApagar.classList.add('apagar'); - Forma de adicionar uma classe ao elemento;
    botaoApagar.setAttribute('class', 'apagar');
    botaoApagar.setAttribute('title', 'Apagar esta tarefa');
    li.appendChild(botaoApagar);
}

function limpaInput () {
    input.value = '';
    input.focus();
}

function criaTarefa (textoInput) {
    const li = criaLi();
    li.innerHTML = textoInput;
    tarefas.appendChild(li);
    limpaInput();
    criaBotaoApagar(li);
    salvarTarefas();
}

function pressionarBotao () {

    botao.addEventListener('click', function() {
        if (!input.value) return;
        criaTarefa(input.value);
    })

    input.addEventListener('keypress', function(e) {
        if (e.keyCode === 13) {
            if (!input.value) return;
            criaTarefa(input.value);
        }
    })

    document.addEventListener('click', function(e) {
        const elemento = e.target;
    
        if (elemento.classList.contains('apagar')){
            elemento.parentElement.remove();
            salvarTarefas();
        }
    })

}

function salvarTarefas() {
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listaDeTarefas.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}

function addTarefasSalvas () {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);

    for (let tarefa of listaDeTarefas) {
        criaTarefa(tarefa);
    }
}

pressionarBotao();
addTarefasSalvas();