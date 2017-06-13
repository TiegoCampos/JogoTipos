var game = new Phaser.Game(1200, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

Enemy = function(){
    this.x = game.world.randomX;
    this.y = 0;
    this.numeroInimigo = 2; //pra comparar com numeroEstagio e dizer se o jogador acertou
    this.acertado; //diz se o objeto foi acertado

    this.minSpeed = -75;
    this.maxSpeed = 75;
    this.vy = Math.random()*(this.maxSpeed - this.minSpeed+1)-this.minSpeed;

    this.enemySprite = game.add.sprite(this.x,this.y,"enemy");
    this.enemySprite.anchor.setTo(0.5, 0.5);
    this.enemySprite.scale.setTo(4,4)

    game.physics.enable(this.enemySprite, Phaser.Physics.ARCADE);
    this.enemySprite.body.collideWorldBounds = false;
    this.enemySprite.body.velocity.y = this.vy;
    this.enemySprite.body.immovable = false;

    this.enemySprite.inputEnabled = true;
    this.enemySprite.events.onInputDown.add(this.conferirAcerto, this);
}
Enemy.prototype.conferirAcerto = function(){ //os prototype são como adicionar métodos ou atributos à classe
    if(this.numeroInimigo == numeroEstagio && !this.acertado){
        console.log("acertou pvt");
        this.acertado = true;
    }
}
Enemy.prototype.atualiza = function(){
}

var enemies = []; //vetor de inimigos
var numOfEnemies = 10; //quantidade de posições do vetor de inimigos
var numeroEstagio = 2; //pra dizer se é fonte romantica, de terror etc 

function preload(){
    game.load.image('enemy', 'games/invaders/invader.png');
}
function create() {
    // for (var i=0; i<numOfEnemies; i++) {
    //     enemies.push( new Enemy() );
    // }
    setInterval(function(){enemies.push(new Enemy())}, 1500); //gerando inimigo a cada 1.5s, FALTA APAGAR ESSES INIMIGOS QUANDO MORREREM
}
function update() {
    for (var i=0; i<enemies.length; i++) {
        if(enemies[i].acertado){
            enemies.splice(i, 1);
            console.log("TAMANHO ARRAY DE INIMIGOS: "+enemies.length);
            //AQUI DEVE VIR TIPO UMA TROCA DE SPRITE COM O ÚLTIMO SPRITE TRANSPARENTE PRO INIMIGO DESAPARECER
            //TÁ COM UM BUG DE CLICAR EM UM OBJETO INEXISTENTE, TALVEZ SE RESOLVA COM CONDIÇÃO BÁSICA
        }
		if(enemies[i].enemySprite.body.y > game.world.height){ //tem que ser "body.y" porque é o objeto com a física que possui y, não o sprite
			enemies.splice(i, 1);
    		console.log("SAIU DA TELA E MORREU");
		}
    }
}