window.addEventListener('load', function(){

    var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

    function preload() {

        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('star', 'assets/star.png');
        game.load.image('diamond', 'assets/diamond.png');
        game.load.image('firstAid', 'assets/firstaid.png');
        game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
        game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);
        game.load.audio('dying', 'assets/dying.mp3');

    }

    var platforms;
    var player;
    var cursors;
    var stars;
    var diamonds;
    var baddies;
    var score = 0;
    var scoreText;
    var lifes = 2;
    var lifesText;
    var wounded = false;
    var dyingSound;
    var firstAid;


    function create() {

        //  We're going to be using physics, so enable the Arcade Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //  A simple background for our game
        game.add.sprite(0, 0, 'sky');

        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = game.add.group();

        //  We will enable physics for any object that is created in this group
        platforms.enableBody = true;

        // Here we create the ground.
        var ground = platforms.create(0, game.world.height - 64, 'ground');

        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        ground.scale.setTo(2, 2);

        //  This stops it from falling away when you jump on it
        ground.body.immovable = true;


        //  Now let's create two ledges
        var ledge = platforms.create(400, 400, 'ground');

        ledge.body.immovable = true;

        ledge = platforms.create(-150, 250, 'ground');

        ledge.body.immovable = true;

        // The player and its settings
        player = game.add.sprite(32, game.world.height - 150, 'dude');


        function getRandomBaddieCoords(min, max) {;
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
        }

        baddies = game.add.group();
        baddies.enableBody = true;

        for(var i = 0; i < 4; i++){
            var baddie = baddies.create(getRandomBaddieCoords(100, game.world.width - 50), game.world.height - 150, 'baddie');
            baddie.body.gravity.y = 300;
            baddie.animations.add('breathe', [0,1,2,3], 5, true);
            baddie.body.collideWorldBounds = true;
        }

        //baddie = game.add.sprite(getRandomBaddieCoords(50, game.world.width - 50), game.world.height - 100, 'baddie');


        //  We need to enable physics on the player
        game.physics.arcade.enable(player);
        //game.physics.arcade.enable(baddie);

        //  Player physics properties. Give the little guy a slight bounce.
        //player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;
        // baddie.body.gravity.y = 300;
        // baddie.body.collideWorldBounds = true;

        //  Our two animations, walking left and right.
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);

        //baddie.animations.add('breathe', [0,1,2,3], 5, true);


        cursors = game.input.keyboard.createCursorKeys();

        stars = game.add.group();
        stars.enableBody = true;

        diamonds = game.add.group();
        diamonds.enableBody = true;


        //  Here we'll create 12 of them evenly spaced apart
        for (var i = 0; i < 12; i++) {
            //  Create a star inside of the 'stars' group
            var xCoord =  i * 70;

            if( i === 2 || i === 7){
                //
                var diamond = diamonds.create(xCoord, 0, 'diamond');
                diamond.body.gravity.y = 9;
                //diamond.body.gravity.x = 20;
                diamond.body.bounce.y = 0.7 + Math.random() * 0.2;
                //diamond.body.bounce.x = 0.3 + Math.random() * 0.2;

            } else if(i === 10) {
                firstAid = game.add.sprite(xCoord, 0, 'firstAid');
                game.physics.arcade.enable(firstAid);
                firstAid.body.gravity.y = 55;
                firstAid.body.collideWorldBounds = true;


            } else {
                var star = stars.create(xCoord, 0, 'star');
                //  Let gravity do its thing
                star.body.gravity.y = 6;

                //  This just gives each star a slightly random bounce value
                star.body.bounce.y = 0.7 + Math.random() * 0.2;
            }



        }

         dyingSound = game.add.audio('dying');
         //game.sound.setDecodedCallback([ dyingSound ], start, this);

        scoreText = game.add.text(16, 30, 'Score: 0', { fontSize: '32px', fill: '#000' });
        lifesText = game.add.text(game.world.width-150, 30, 'Lifes: 2', { fontSize: '32px', fill: '#000' });



    }


    function collectStar (player, star) {

        // Removes the star from the screen
        star.kill();

        score += 10;
        scoreText.text = 'Score: ' + score;

    }

    function collectDiamond (player, diamond) {

        diamond.kill();

        score += 20;
        scoreText.text = 'Score: ' + score;
    }

    function killPlayer(){
        wounded = true;
        let timeout = setTimeout(function(){
            wounded = false;
        },3000);
        lifes--;
        console.log(lifes);
        lifesText.text = 'Lifes: ' + lifes;

        if(lifes === 0){
            player.kill();
            dyingSound.play();
            scoreText.text = 'You are dead';
        }


    }

    function addLife() {
        lifes++;
        firstAid.kill();
        console.log(lifes);
        lifesText.text = 'Lifes: ' + lifes;
    }


    function update() {




        //  Collide the player and the stars with the platforms
        var hitPlatform = game.physics.arcade.collide(player, platforms);
        //game.physics.arcade.collide(baddie, platforms);

        player.body.velocity.x = 0;



        game.physics.arcade.collide(stars, platforms);
        game.physics.arcade.overlap(player, stars, collectStar, null, this);
        game.physics.arcade.collide(diamonds, platforms);
        game.physics.arcade.overlap(player, diamonds, collectDiamond, null, this);
        game.physics.arcade.collide(baddies, platforms);
        (wounded === false) && game.physics.arcade.overlap(player, baddies, killPlayer, null, this);
        game.physics.arcade.collide(firstAid,platforms);
        game.physics.arcade.overlap(player,firstAid, addLife, null, this);


        baddies.forEach(el => el.animations.play('breathe'));

        if (cursors.left.isDown)
        {
            //  Move to the left
            player.body.velocity.x = -150;

            player.animations.play('left');
        }
        else if (cursors.right.isDown)
        {
            //  Move to the right
            player.body.velocity.x = 150;

            player.animations.play('right');
        }
        else
        {
            //  Stand still
            player.animations.stop();

            player.frame = 4;
        }

        //  Allow the player to jump if they are touching the ground.
        if (cursors.up.isDown && player.body.touching.down && hitPlatform)
        {
            player.body.velocity.y = -350;
        }




    }


});

