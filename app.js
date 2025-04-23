let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'UK English Male', {rate: 1.2});
}

function exibirMensagemIncial(){
    exibirTextoNaTela('h1', 'Discover The Number');
    exibirTextoNaTela('p', 'Choose a number between 1 and 10');
}

exibirMensagemIncial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto){
        exibirTextoNaTela('h1', 'YOU WIN!');
        let palavraTentativa = tentativas > 1 ? 'attempts' : 'attempt';
        let mensagemTentavivas = `You discovered the secret number with ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentavivas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto){
            exibirTextoNaTela('p', 'The number is less than the guess');
        } else {
            exibirTextoNaTela('p', 'The number is bigger than the guess');
        }
        tentativas++;
        limparCampo();

    }
}

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementos = listaDeNumerosSorteados.length;

    if (quantidadeDeElementos == numeroLimite){
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemIncial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
