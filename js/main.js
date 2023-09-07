const form = document.querySelector('#novoItem');
const lista = document.querySelector('.lista');
const itens = JSON.parse(localStorage.getItem('itens')) || [];

itens.forEach((elemento) => {
    criaElemento(elemento);
});

form.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const nome = evento.target.elements['nome']
    const qtd = evento.target.elements['quantidade']

    const existe = itens.find(elemento => elemento.nome === nome.value);

    const itemAtual = {
        'nome': nome.value,
        'qtde': qtd.value
    };

    if (existe) {
        itemAtual.id = existe.id;
        atualizaElemento(itemAtual);
        itens[existe.id] = itemAtual;
        
    } else {
        itemAtual.id = itens.length;

        criaElemento(itemAtual);

        itens.push(itemAtual);
    }

    localStorage.setItem('itens', JSON.stringify(itens));

    nome.value = '';
    qtd.value = '';
    nome.focus();
})

function criaElemento(item) {
    const novoItem = document.createElement('li')
    novoItem.classList.add('item');

    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.qtde;

    numeroItem.dataset.id = item.id;

    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += item.nome;
    novoItem.appendChild(botaoDeleta());

    lista.appendChild(novoItem);

}

function atualizaElemento (item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.qtde;
}

function botaoDeleta() {
    const elementoBotao = document.createElement('button');
    elementoBotao.innerText = 'X';

    elementoBotao.addEventListener('click', function() {
        deletaElemento(this.parentNode);
    })

    return elementoBotao;
}

function deletaElemento(tag) {
    tag.remove();
}