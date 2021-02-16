let canvas = document.getElementById("cobrinha");
let context = canvas.getContext("2d"); /* renderiza o desenho do canvas */
let box = 32; /* definição do tamanho de cada caixinha */
let cobrinha = []; /* Criação do array (lista) que vai ser o corpo da cobrinha - ilusão de movimento */
let cobrinhaCor = []; /* Criação da cabeça da cobrinha (lista), de cor diferende do corpo */
cobrinha[0] = {
    x: 8 * box,
    y: 8 * box
}
cobrinhaCor[0] = {
    x: 8 * box,
    y: 8 * box
}

/* Cobrinha começa se movimentado para a direita */
let direction = "right";

/* Função de definição da comida */
let comida = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

/* Função de definição do canvas */
function criarBG() {
    context.fillStyle = "lightblue"; /* elemento 2d, criado pelo "context" */
    context.fillRect(0, 0, 16 * box, 16 * box); /* Desenha o retângulo do jogo */
}

/* Função de criação da cobrinha */
function criarCobrinha() {
    for(i=0; i < cobrinha.length; i++) {
        context.fillStyle = "green";
        context.fillRect(cobrinha[i].x, cobrinha[i].y, box, box);   
    }
    for(i=0; i < cobrinhaCor.length; i++) {
        context.fillStyle = "brown";
        context.fillRect(cobrinha[i].x, cobrinha[i].y, box, box);   
    }
}
/* Inserção da cabeça (de outra cor) no corpo da cobrinha */
cobrinha[1] = cobrinhaCor[0];

/* Função de criação da cobrinha */
function desenharComida() {
    context.fillStyle = "purple";
    context.fillRect(comida.x, comida.y, box, box);
}

/* Definição e função da captura da pressão do teclado e conversão nos movimentos da cobrinha */
document.addEventListener('keydown', update);
function update (event) {
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

/* Definição da função que de fato cria o jogo */
function iniciarJogo() {
    
    if(cobrinha[0].x > 15 * box && direction == "right") cobrinha[0].x = 0;
    if(cobrinha[1].x > 15 * box && direction == "right") cobrinha[1].x = 0;
    if(cobrinha[0].x < 0 && direction == "left") cobrinha[0].x = 16 * box;
    if(cobrinha[1].x < 0 && direction == "left") cobrinha[1].x = 16 * box;
    if(cobrinha[0].y > 15 * box && direction == "down") cobrinha[0].y = 0;
    if(cobrinha[1].y > 15 * box && direction == "down") cobrinha[1].y = 0;
    if(cobrinha[0].y < 0 && direction == "up") cobrinha[0].y = 16 * box;
    if(cobrinha[0].y < 0 && direction == "up") cobrinha[1].y = 16 * box;

    for(i = 2; i < cobrinha.length; i++) {
        if(cobrinha[0].x == cobrinha[i].x && cobrinha[0].y == cobrinha[i].y) {
            clearInterval(jogo);
            alert('AHHHH, NÃO É COMIDA' + '\n' + '😭😭😭😭😭' + '\n' + '\n' + 'FIM DE JOGO' + '\n' + '🎮 ❌');
        } 
    }

    criarBG();
    criarCobrinha();
    desenharComida();

    let cobrinhaX = cobrinha[0].x;
    let cobrinhaY = cobrinha[0].y;

    if(direction == "right") cobrinhaX += box;
    if(direction == "left") cobrinhaX -= box;
    if(direction == "up") cobrinhaY -= box;
    if (direction == "down") cobrinhaY += box;

    if(cobrinhaX != comida.x || cobrinhaY != comida.y) {
        cobrinha.pop();
    } else {
        comida.x = Math.floor(Math.random() * 15 + 1) * box,
        comida.y = Math.floor(Math.random() * 15 + 1) * box
    }

    let newHead = {
        x: cobrinhaX,
        y: cobrinhaY
    }

    cobrinha.unshift(newHead);
}

/* Setando o intervalo, em milissegundos, do movimento da cobrinha, impedindo que o jogo trave */
let jogo = setInterval(iniciarJogo, 150);

