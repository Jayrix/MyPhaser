import HealthBar from './HealthBar.js';

class Player  {

    static add(game){
        let player = game.add.sprite(100, game.world.height - 200, 'player');
        game.physics.arcade.enable(player);

        //assets
        player.wooshSound = game.add.audio('woosh');
        player.punchSound = game.add.audio('playerPunch');

        player.scale.set(2.5);
        player.anchor.set(0.5,0);

        player.body.gravity.y = 1000;
        player.body.collideWorldBounds = true;
        player.body.setSize(27,50,7);

        player.animations.add('run', [24,25,26,27,28,29,30,31], 10, true);
        let attackAnim = player.animations.add('attack', [3,5],6, true);
        player.animations.add('idle', [2,5],2, true);

        attackAnim.onStart.add(() => player.wooshSound.play(),this);
        attackAnim.onLoop.add(() => player.wooshSound.play(),this);

        player.hitbox1 = game.add.sprite(0,0, null);
        game.physics.arcade.enable(player.hitbox1);
        player.hitbox1.body.setSize(22, 50, 27,player.height / 4);
        player.addChild(player.hitbox1);
        player.hitbox1.kill();

        //states
        player.health = 100;
        player.healthBar = new HealthBar(game, {x : 250, y: 130, width: 400,
            bg: {color: '#b81222'},
            bar: {color: '#00b832'},

        });
        player.isImmortal = false;


        return player;
    }

}

module.exports = Player;