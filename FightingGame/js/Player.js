

class Player  {

    static add(game){
        let player = game.add.sprite(100, game.world.height - 200, 'player');
        game.physics.arcade.enable(player);

        player.scale.set(2.5);
        player.anchor.set(0.5,0.5);

        player.body.gravity.y = 600;
        player.body.collideWorldBounds = true;

        player.animations.add('run', [24,25,26,27,28,29,30,31], 10, true);
        player.animations.add('attack', [3,5],6, true);
        player.animations.add('idle', [2,5],2, true);
        //player.animations.add('block', [2,5],6, true);

        //states
        player.health = 100;

        return player;
    }

}

module.exports = Player;