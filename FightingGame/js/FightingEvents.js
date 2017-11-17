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

                    if(inputControls.wKey.isDown) this.jump(player,-700);
                } else{
                    player.frame = 6;
                    player.preLastAnimation = 'jump';
                }
                if (player.scale.x > 0) {
                    player.scale.x *= -1;
                    player.hitbox1.body.setSize(22, 50,-49,player.height / 4);
                }
                player.body.velocity.x = -250;

                break;

            case inputControls.dKey.isDown:
                if (player.body.touching.down){
                    player.animations.play('run');
                    player.lastAnimation = 'run';

                    if(inputControls.wKey.isDown) this.jump(player,-700);
                } else {
                    player.frame = 6;
                    player.preLastAnimation = 'jump';
                }
                if (player.scale.x < 0){
                    player.scale.x *= -1;
                    player.hitbox1.body.setSize(22, 50, 27,player.height / 4);
                }
                player.body.velocity.x = 250;
                break;

            case inputControls.sKey.isDown:
                player.frame = 18;
                if (!player.isBlocking){
                    player.isBlocking = true;
                    player.isImmortal = true;
                }
                break;

            case inputControls.spaceKey.isDown:
                player.animations.play('attack');
                player.lastAnimation = 'attack';
                this.attack(player);
                break;

            case inputControls.wKey.isDown:
                this.jump(player,-700);
                break;

                //ENEMY INPUTS
            case inputControls.leftKey.isDown:
                if (enemy.body.touching.down) {
                    enemy.animations.play('run');
                    enemy.lastAnimation = 'run';
                    if(inputControls.upKey.isDown) this.jump(enemy,-700);
                 } else{
                     enemy.frame = 8;
                     enemy.preLastAnimation = 'jump';
                 }
                 if (enemy.scale.x > 0) {
                     enemy.scale.x *= -1;
                     enemy.hitbox1.body.setSize(22, 50, -61,enemy.height / 3);
                 }
                enemy.body.velocity.x = -250;

                break;

            case inputControls.rightKey.isDown:
                if (enemy.body.touching.down){
                    enemy.animations.play('run');
                    enemy.lastAnimation = 'run';
                    if(inputControls.upKey.isDown) this.jump(enemy,-700);
                } else {
                    enemy.frame = 8;
                    enemy.preLastAnimation = 'jump';
                }
                 if (enemy.scale.x < 0){
                     enemy.scale.x *= -1;
                     enemy.hitbox1.body.setSize(22, 50, 39,enemy.height / 3);
                 }
                enemy.body.velocity.x = 250;
                break;

            case inputControls.downKey.isDown:
                enemy.frame = 16;
                if (!enemy.isBlocking){
                    enemy.isBlocking = true;
                    enemy.isImmortal = true;
                }
                break;

             case inputControls.fKey.isDown:
                 enemy.animations.play('attack');
                 enemy.lastAnimation = 'attack';
                 this.attack(enemy);
                 break;

             case inputControls.upKey.isDown:
                 this.jump(enemy,-700);
                 break;

        }
    }

    jump(actor, velocity){
        if (actor.body.touching.down) actor.body.velocity.y = velocity;
        if (actor === this.player) {
            actor.frame = 6;
            actor.animations.stop(actor.lastAnimation);
        } else {
            actor.frame = 8;
            actor.animations.stop(actor.lastAnimation);
        }
        actor.lastAnimation = 'jump';
    }

    attack(actor){
        //actor.wooshSound.play();
        if (actor.hitbox1.alive===false){
            actor.hitbox1.revive();
        }
        //hitbox kill is being performed in keyboard.onUpCallback
    }

    damage(attacker,victim,knockbackFn) {
        if (victim.isImmortal === false){
            victim.health -= 10;
            victim.healthBar.setPercent(victim.health);
            attacker.punchSound.play();
            if (victim.health < 1) {
                victim.hitbox1.body.disable=true;
                victim.kill();
            } else {
                victim.isImmortal = true;
                knockbackFn(attacker,victim);
            }

        }
        console.log(victim.health);
    }

    knockback = (attacker, victim) =>{
        let timeout = setTimeout(() => {
            victim.isImmortal = false;
            victim.body.velocity.x = 0;
        },100);
        let startingX = victim.body.x;
        (attacker.body.x < victim.body.x) ? victim.body.velocity.x = 300 : victim.body.velocity.x = -300;
        (victim === this.enemy) ? victim.frame = 19 : victim.frame = 8;
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