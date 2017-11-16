import Enemy from './Enemy.js';
import Player from './Player.js';

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

            this.invisibleFloor = game.add.sprite(0, game.world.height - 10);
            this.invisibleFloor.scale.x = game.world.width;
            game.physics.arcade.enable(this.invisibleFloor);
            this.invisibleFloor.body.immovable = true;
            //this.invisibleFloor.body.collideWorldBounds = true;

            this.player = Player.add(game);
            this.enemy = Enemy.add(game);

            this.inputControls = {
                wKey: game.input.keyboard.addKey(Phaser.Keyboard.W),
                sKey: game.input.keyboard.addKey(Phaser.Keyboard.S),
                aKey: game.input.keyboard.addKey(Phaser.Keyboard.A),
                dKey: game.input.keyboard.addKey(Phaser.Keyboard.D),
                spaceKey: game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
            };

            console.log(game.input.keyboard);

            this.keyboardIsBeingPressed = false;

            game.input.keyboard.onDownCallback =  () => {
                if (this.keyboardIsBeingPressed === false) this.keyboardIsBeingPressed = true;
            };

            game.input.keyboard.onUpCallback =  () => {
                this.keyboardIsBeingPressed = false;
                this.enemy.animations.stop(this.lastAnimation);
                this.enemy.frame = 0;
                this.enemy.animations.play('idle');

                console.log('obcizam sys');

            };

            //this.inputControls.wKey.onDown.add(e => this.jump(this.enemy,-900),this);

            this.enemy.animations.play('idle');
            this.enemy.lastAnimation = 'idle';

        },

        update: function() {
            // This function is called 60 times per second
            // It contains the game's logic

            game.physics.arcade.collide(this.player, this.invisibleFloor);
            game.physics.arcade.collide(this.enemy, this.invisibleFloor);
            this.enemy.body.velocity.x = 0;



            if (this.keyboardIsBeingPressed) {
                switch(true) {

                    case this.inputControls.aKey.isDown:
                        this.enemy.body.velocity.x = -250;
                        this.enemy.animations.play('left');
                        this.enemy.lastAnimation = 'left';
                        break;

                    case this.inputControls.dKey.isDown:
                        this.enemy.body.velocity.x = 250;
                        this.enemy.animations.play('right');
                        this.enemy.lastAnimation = 'right';
                        break;

                    case this.inputControls.sKey.isDown:
                        // this.enemy.animations.play('block');
                        // this.lastAnimation = 'block';
                        this.enemy.frame = 16;
                        break;

                    case this.inputControls.spaceKey.isDown:
                        this.enemy.animations.play('attack');
                        this.enemy.lastAnimation = 'attack';
                        break;

                    case this.inputControls.wKey.isDown:
                        this.jump(this.enemy,-900)
                        break;

                }

            }


        },
        jump: function (actor,velocity){
            if (actor.body.touching.down) actor.body.velocity.y = velocity;
            if (actor === this.enemy){
                actor.frame = 4;
                actor.animations.stop(this.lastAnimation);
            }

        },
        executeKeyEvents: function (){

        },
    };

// Initialize Phaser, and create a 400px by 490px game
    var game = new Phaser.Game(1600, 524);

// Add the 'mainState' and call it 'main'
    game.state.add('main', mainState);

// Start the state to actually start the game
    game.state.start('main');



});

