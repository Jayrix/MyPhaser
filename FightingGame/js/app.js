import Enemy from './Enemy.js';
import Player from './Player.js';
import Floor from './Floor.js';
import FightingEvents from './FightingEvents.js';

window.addEventListener('load', function(){



var mainState = {
    preload: function() {
        game.load.image('background', 'assets/background.jpg');
        game.load.spritesheet('player', 'assets/player.png', 46, 50);
        game.load.spritesheet('enemy', 'assets/enemy.png', 221, 212);
    },

    create: function() {
        // This function is called after the preload function
        // Here we set up the game, display sprites, etc.

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0, 0, 'background');

        //inicjalizacja podlogi i aktorow
        this.invisibleFloor = Floor.loadInvisibleFloor(game);
        this.player = Player.add(game);
        this.enemy = Enemy.add(game);
        this.enemy.scale.x *= -1; //konieczne wyciagniecie na po inicjalizacji zeby uniknac ujemnego body.width



        //stworzenie obiektu z klawiszami
        this.inputControls = {
            wKey: game.input.keyboard.addKey(Phaser.Keyboard.W),
            sKey: game.input.keyboard.addKey(Phaser.Keyboard.S),
            aKey: game.input.keyboard.addKey(Phaser.Keyboard.A),
            dKey: game.input.keyboard.addKey(Phaser.Keyboard.D),
            spaceKey: game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
        };

        //Obiekt zawierajacy metody zwiazane z logiką gry
        this.FightingEventsLibrary = new FightingEvents(this.player, this.enemy, this.inputControls);



        this.keyboardIsBeingPressed = false;
        game.input.keyboard.onDownCallback =  () => {
            if (this.keyboardIsBeingPressed === false) this.keyboardIsBeingPressed = true;
        };

        //restart stanu playera po puszczeniu klawiszy
        game.input.keyboard.onUpCallback =  () => {
            this.keyboardIsBeingPressed = false;
            this.player.animations.stop(this.player.lastAnimation);
            this.player.frame = 0;
            this.player.body.velocity.x = 0;
            this.player.animations.play('idle');
            console.log('obcizam sys');

            console.log(this.player.body.width);
            console.log(this.player.body.height);
            console.log(this.enemy.body.width);
            console.log(this.enemy.body.height);

        };

        //inicjalizacja animacji idle
        this.enemy.animations.play('idle');
        this.enemy.lastAnimation = 'idle';
        this.player.animations.play('idle');
        this.player.lastAnimation = 'idle';


    },

    update: function() {

        // This function is called 60 times per second
        // It contains the game's logic

        game.physics.arcade.collide(this.player, this.invisibleFloor);
        game.physics.arcade.collide(this.enemy, this.invisibleFloor);
        game.physics.arcade.collide(this.player, this.enemy);

        //this.enemy.animations.play('left');

        if (this.keyboardIsBeingPressed) {
            this.FightingEventsLibrary.playerMove(this.player, this.enemy, this.inputControls);
        }
    },
    render: function() {

        // Sprite debug info
        game.debug.spriteInfo(this.player,32,32);
        game.debug.spriteInfo(this.enemy, 500,32);
        game.debug.body(this.player);
        game.debug.body(this.enemy);


    },

};

// Initialize Phaser, and create a 400px by 490px game
    var game = new Phaser.Game(1100, 524, Phaser.CANVAS);

// Add the 'mainState' and call it 'main'
    game.state.add('main', mainState);

// Start the state to actually start the game
    game.state.start('main');





});

