import HealthBar from './HealthBar.js';

class Enemy {

    static add(game){
        //konstruktor niepotrzebny bo sprite zwraca obiekt;
        let enemy = game.add.sprite(game.world.width - 300, game.world.height - 200, 'enemy');
        game.physics.arcade.enable(enemy);

        //assets
        enemy.wooshSound = game.add.audio('woosh');
        enemy.punchSound = game.add.audio('enemyPunch');

        enemy.scale.set(0.7);
        // enemy.scale.x *= -1;
        enemy.anchor.set(0.5,0);

        enemy.body.gravity.y = 1000;
        enemy.body.collideWorldBounds = true;
        enemy.body.setSize(100,212,67);


        enemy.animations.add('right', [19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3], 50, true);
        enemy.animations.add('run', [3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19], 50, true);
        let attackAnim = enemy.animations.add('attack', [6,4], 6, true);
        enemy.animations.add('idle', [0,1,2], 3, true);

        attackAnim.onStart.add(() => enemy.wooshSound.play(),this);
        attackAnim.onLoop.add(() => enemy.wooshSound.play(),this);

        enemy.hitbox1 = game.add.sprite(0,0, null);
        game.physics.arcade.enable(enemy.hitbox1);
        enemy.hitbox1.body.setSize(22, 50, -61,enemy.height / 3);
        enemy.addChild(enemy.hitbox1);
        enemy.hitbox1.kill();


        //states
        enemy.health = 100;
        enemy.healthBar = new HealthBar(game, {x : game.world.width - 250, y: 130, width: 400,
            bg: {color: '#75000e'},
            bar: {color: '#00b832'},
            flipped : true,
        });
        enemy.isImmortal = false;
        enemy.blocking = false;


        return enemy;
    }
}


module.exports = Enemy;