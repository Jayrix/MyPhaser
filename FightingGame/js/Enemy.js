

class Enemy {

    static add(game){
        //konstruktor niepotrzebny bo sprite zwraca obiekt;
        let enemy = game.add.sprite(game.world.width - 300, game.world.height - 200, 'enemy');
        game.physics.arcade.enable(enemy);

        enemy.scale.set(0.7);
        // enemy.scale.x *= -1;
        enemy.anchor.set(0.5,0);

        enemy.body.gravity.y = 2300;
        enemy.body.collideWorldBounds = true;
        enemy.body.setSize(100,212,67);


        enemy.animations.add('right', [19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3], 50, true);
        enemy.animations.add('left', [3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19], 50, true);
        enemy.animations.add('attack', [6,12,13], 7, true);
        enemy.animations.add('idle', [0,1,2], 3, true);
        //enemy.animations.add('block', [16], 2, true);

        //states
        enemy.health = 100;
        enemy.isImmortal = false;



        return enemy;
    }
}


module.exports = Enemy;