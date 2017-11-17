class FightingEvents {
    constructor(player, enemy, inputControls, game){
        this.player = player;
        this.enemy = enemy;
        this.inputControls = inputControls;
        this.game = game;
    }

    playerMove(player, enemy, inputControls){
        
        switch(true) {

            case inputControls.aKey.isDown:
                if (player.body.touching.down){
                    player.animations.play('run');
                    player.lastAnimation = 'run';

                    if(inputControls.wKey.isDown) this.jump(player,-600);
                } else{
                    player.frame = 6;
                    player.preLastAnimation = 'jump';
                }
                if (player.scale.x > 0) {
                    player.scale.x *= -1;
                    player.hitbox1.body.setSize(15, 50,-42,player.height / 4);
                }
                player.body.velocity.x = -250;

                break;

            case inputControls.dKey.isDown:
                if (player.body.touching.down){
                    player.animations.play('run');
                    player.lastAnimation = 'run';

                    if(inputControls.wKey.isDown) this.jump(player,-600);
                } else {
                    player.frame = 6;
                    player.preLastAnimation = 'jump';
                }
                if (player.scale.x < 0){
                    player.scale.x *= -1;
                    player.hitbox1.body.setSize(15, 50, 27,player.height / 4);
                }
                player.body.velocity.x = 250;
                break;

            case inputControls.sKey.isDown:
                //player.animations.play('block');
                //player.lastAnimation = 'block';
                player.frame = 18;
                break;

            case inputControls.spaceKey.isDown:
                player.animations.play('attack');
                player.lastAnimation = 'attack';
                this.attack(player);
                break;

            case inputControls.wKey.isDown:
                this.jump(player,-600);
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
        actor.lastAnimation = 'jump';
    }

    attack(actor){
        if (actor.hitbox1.alive===false){
            actor.hitbox1.revive();
        }
        //hitbox kill is being performed in keyboard.onUpCallback
    }

    damage(victim,knockbackFn){
        if (victim.isImmortal === false){
            victim.health -= 10;
            if (victim.health < 1) {
                victim.kill();
            } else {
                victim.isImmortal = true;
                knockbackFn(this.player,this.enemy);
            }

        }
        console.log(victim.health);
    }

    knockback(attacker, victim){
        let timeout = setTimeout(() => {
            victim.isImmortal = false;
            victim.body.velocity.x = 0;
        },100);
        let startingX = victim.body.x;
        (attacker.body.x < victim.body.x) ? victim.body.velocity.x = 300 : victim.body.velocity.x = -300;
        victim.frame = 19;
    }

    runAgainst(){

        this.enemy.body.velocity.x = 0;

    }

    idleAfterLanding(actor){
        if (actor.lastAnimation === 'jump'){
            actor.animations.play('idle');
            actor.lastAnimation = 'idle';
        }
    }




};

module.exports = FightingEvents;