class FightingEvents {
    constructor(player, enemy, inputControls){
        this.player = player;
        this.enemy = enemy;
        this.inputControls = inputControls;
    }

    playerMove(player, enemy, inputControls){
        
        switch(true) {

            case inputControls.aKey.isDown:
                if (player.scale.x > 0) player.scale.x *= -1;
                player.body.velocity.x = -250;
                player.animations.play('run');
                player.lastAnimation = 'run';
                break;

            case inputControls.dKey.isDown:
                if (player.scale.x < 0) player.scale.x *= -1;
                player.body.velocity.x = 250;
                player.animations.play('run');
                player.lastAnimation = 'run';
                break;

            case inputControls.sKey.isDown:
                //player.animations.play('block');
                //player.lastAnimation = 'block';
                player.frame = 18;
                break;

            case inputControls.spaceKey.isDown:
                player.animations.play('attack');
                player.lastAnimation = 'attack';
                break;

            case inputControls.wKey.isDown:
                this.jump(player,-400);
                break;

        }
    }

    jump(actor, velocity){
        if (actor.body.touching.down) actor.body.velocity.y = velocity;
        if (actor === this.player) {
            actor.frame = 6;
            actor.animations.stop(actor.lastAnimation);
        } else {
            actor.frame = 4;
            actor.animations.stop(actor.lastAnimation);
        }
    }


};

module.exports = FightingEvents;