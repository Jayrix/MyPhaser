class Floor {

    static loadInvisibleFloor(game){
        let invisibleFloor = game.add.sprite(0, game.world.height - 10);
        invisibleFloor.scale.x = game.world.width;
        game.physics.arcade.enable(invisibleFloor);
        invisibleFloor.body.immovable = true;
        //this.invisibleFloor.body.collideWorldBounds = true;
        return invisibleFloor;
    }
}

module.exports = Floor;