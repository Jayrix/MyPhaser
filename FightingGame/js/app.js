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

        this.player = game.add.sprite(100, game.world.height - 200, 'player');
        this.player.scale.setTo(4,4);
        game.physics.arcade.enable(this.player);
        this.player.body.gravity.y = 300;
        this.player.body.collideWorldBounds = true;

        this.enemy = game.add.sprite(game.world.width - 300, game.world.height - 200, 'enemy');
        this.enemy.scale.x = -1;
        game.physics.arcade.enable(this.enemy);
        this.enemy.body.gravity.y = 300;
        this.enemy.body.collideWorldBounds = true;
        this.enemy.animations.add('right', [19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0], 50, true);
        this.enemy.animations.add('left', [0, 1, 2, 3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19], 50, true);

        this.cursors = game.input.keyboard.createCursorKeys();

    },

    update: function() {
        // This function is called 60 times per second
        // It contains the game's logic

        this.enemy.body.velocity.x = 0;

        if (this.cursors.left.isDown) {
            this.enemy.body.velocity.x = -300;
            this.enemy.animations.play('left');
        }
        else if (this.cursors.right.isDown) {
            this.enemy.body.velocity.x = 300;
            this.enemy.animations.play('right');
        }
        else {
            //  Stand still
            this.enemy.animations.stop();
            this.enemy.frame = 0;
        }

        //  Allow the player to jump if they are touching the ground.
        if (this.cursors.up.isDown ) {
            this.enemy.body.velocity.y = -500;
        }

    },
};

// Initialize Phaser, and create a 400px by 490px game
    var game = new Phaser.Game(1600, 524);

// Add the 'mainState' and call it 'main'
    game.state.add('main', mainState);

// Start the state to actually start the game
    game.state.start('main');



});

