/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 Copyright (c) 2015 Belahcen Marwane (b.marwane@gmail.com)

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */

var HealthBar = function HealthBar(game, providedConfig) {
    this.game = game;

    this.setupConfiguration(providedConfig);
    this.setPosition(this.config.x, this.config.y);
    this.drawBackground();
    this.drawHealthBar();
    this.setFixedToCamera(this.config.isFixedToCamera);
};
HealthBar.prototype.constructor = HealthBar;

HealthBar.prototype.setupConfiguration = function (providedConfig) {
    this.config = this.mergeWithDefaultConfiguration(providedConfig);
    this.flipped = this.config.flipped;
};

HealthBar.prototype.mergeWithDefaultConfiguration = function (newConfig) {
    var defaultConfig = {
        width: 250,
        height: 40,
        x: 0,
        y: 0,
        bg: {
            color: '#651828'
        },
        bar: {
            color: '#FEFF03'
        },
        animationDuration: 200,
        flipped: false,
        isFixedToCamera: false
    };

    return mergeObjetcs(defaultConfig, newConfig);
};

function mergeObjetcs(targetObj, newObj) {
    for (var p in newObj) {
        try {
            targetObj[p] = newObj[p].constructor == Object ? mergeObjetcs(targetObj[p], newObj[p]) : newObj[p];
        } catch (e) {
            targetObj[p] = newObj[p];
        }
    }
    return targetObj;
}

HealthBar.prototype.drawBackground = function () {

    var bmd = this.game.add.bitmapData(this.config.width, this.config.height);
    bmd.ctx.fillStyle = this.config.bg.color;
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, this.config.width, this.config.height);
    bmd.ctx.fill();
    bmd.update();

    this.bgSprite = this.game.add.sprite(this.x, this.y, bmd);
    this.bgSprite.anchor.set(0.5);

    if (this.flipped) {
        this.bgSprite.scale.x = -1;
    }
};

HealthBar.prototype.drawHealthBar = function () {
    var bmd = this.game.add.bitmapData(this.config.width, this.config.height);
    bmd.ctx.fillStyle = this.config.bar.color;
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, this.config.width, this.config.height);
    bmd.ctx.fill();
    bmd.update();

    this.barSprite = this.game.add.sprite(this.x - this.bgSprite.width / 2, this.y, bmd);
    this.barSprite.anchor.y = 0.5;

    if (this.flipped) {
        this.barSprite.scale.x = -1;
    }
};

HealthBar.prototype.setPosition = function (x, y) {
    this.x = x;
    this.y = y;

    if (this.bgSprite !== undefined && this.barSprite !== undefined) {
        this.bgSprite.position.x = x;
        this.bgSprite.position.y = y;

        this.barSprite.position.x = x - this.config.width / 2;
        this.barSprite.position.y = y;
    }
};

HealthBar.prototype.setPercent = function (newValue) {
    if (newValue < 0) newValue = 0;
    if (newValue > 100) newValue = 100;

    var newWidth = newValue * this.config.width / 100;

    this.setWidth(newWidth);
};

/*
 Hex format, example #ad3aa3
 */
HealthBar.prototype.setBarColor = function (newColor) {
    var bmd = this.barSprite.key;
    bmd.update();

    var currentRGBColor = bmd.getPixelRGB(0, 0);
    var newRGBColor = hexToRgb(newColor);
    bmd.replaceRGB(currentRGBColor.r, currentRGBColor.g, currentRGBColor.b, 255, newRGBColor.r, newRGBColor.g, newRGBColor.b, 255);
};

HealthBar.prototype.setWidth = function (newWidth) {
    if (this.flipped) {
        newWidth = -1 * newWidth;
    }
    this.game.add.tween(this.barSprite).to({ width: newWidth }, this.config.animationDuration, Phaser.Easing.Linear.None, true);
};

HealthBar.prototype.setFixedToCamera = function (fixedToCamera) {
    this.bgSprite.fixedToCamera = fixedToCamera;
    this.barSprite.fixedToCamera = fixedToCamera;
};

HealthBar.prototype.kill = function () {
    this.bgSprite.kill();
    this.barSprite.kill();
};

module.exports = HealthBar;

/**
 Utils
 */

function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Enemy = __webpack_require__(3);

var _Enemy2 = _interopRequireDefault(_Enemy);

var _Player = __webpack_require__(4);

var _Player2 = _interopRequireDefault(_Player);

var _Floor = __webpack_require__(5);

var _Floor2 = _interopRequireDefault(_Floor);

var _FightingEvents = __webpack_require__(6);

var _FightingEvents2 = _interopRequireDefault(_FightingEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.addEventListener('load', function () {

    var mainState = {
        preload: function preload() {
            game.load.image('background', 'assets/background.jpg');
            game.load.spritesheet('player', 'assets/player.png', 46, 50);
            game.load.spritesheet('enemy', 'assets/enemy.png', 221, 212);
            game.load.audio('woosh', 'assets/Woosh.mp3');
            game.load.audio('playerPunch', 'assets/PlayerPunch.mp3');
            game.load.audio('enemyPunch', 'assets/EnemyPunch.mp3');
        },

        create: function create() {
            var _this = this;

            // This function is called after the preload function
            // Here we set up the game, display sprites, etc.

            game.physics.startSystem(Phaser.Physics.ARCADE);
            game.add.sprite(0, 0, 'background');

            //inicjalizacja podlogi i aktorow
            this.invisibleFloor = _Floor2.default.loadInvisibleFloor(game);
            this.player = _Player2.default.add(game);
            this.enemy = _Enemy2.default.add(game);
            this.enemy.scale.x *= -1; //konieczne wyciagniecie na po inicjalizacji zeby uniknac ujemnego body.width


            //stworzenie obiektu z klawiszami
            this.inputControls = {
                wKey: game.input.keyboard.addKey(Phaser.Keyboard.W),
                sKey: game.input.keyboard.addKey(Phaser.Keyboard.S),
                aKey: game.input.keyboard.addKey(Phaser.Keyboard.A),
                dKey: game.input.keyboard.addKey(Phaser.Keyboard.D),
                spaceKey: game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
                upKey: game.input.keyboard.addKey(Phaser.Keyboard.UP),
                downKey: game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
                leftKey: game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
                rightKey: game.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
                fKey: game.input.keyboard.addKey(Phaser.Keyboard.ENTER)
            };

            //Obiekt zawierajacy metody zwiazane z logiką gry
            this.FightingEventsLibrary = new _FightingEvents2.default(this.player, this.enemy, this.inputControls, game);

            this.keyboardIsBeingPressed = false;
            game.input.keyboard.onDownCallback = function () {
                if (_this.keyboardIsBeingPressed === false) _this.keyboardIsBeingPressed = true;
            };

            //restart stanu playera po puszczeniu klawiszy
            game.input.keyboard.onUpCallback = function () {
                _this.keyboardIsBeingPressed = false;
                if (_this.player.body.touching.down) {
                    _this.player.frame = 0;
                    _this.player.animations.stop(_this.player.lastAnimation);
                    _this.player.animations.play('idle');
                    _this.player.lastAnimation = 'idle';
                }
                _this.player.body.velocity.x = 0;
                _this.player.hitbox1.kill();
                if (_this.player.isBlocking) {
                    _this.player.isImmortal = false;
                    _this.player.isBlocking = false;
                }

                //do debugowania - bedzie wymagalo przerboienia przy dwoch graczach
                // if (this.enemy.body.touching.down){
                //     this.enemy.frame = 0;
                //     this.enemy.animations.stop(this.enemy.lastAnimation);
                //     this.enemy.animations.play('idle');
                //     this.enemy.lastAnimation = 'idle';
                // }
                // this.enemy.body.velocity.x = 0;
                // this.enemy.hitbox1.kill();
                // if(this.enemy.isBlocking){
                //     this.enemy.isImmortal = false;
                //     this.enemy.isBlocking = false;
                // }

                console.log(_this.enemy.body.x);
            };

            //inicjalizacja animacji idle
            this.enemy.animations.play('idle');
            this.enemy.lastAnimation = 'idle';
            this.player.animations.play('idle');
            this.player.lastAnimation = 'idle';
        },

        update: function update() {
            var _this2 = this;

            // This function is called 60 times per second
            // It contains the game's logic

            game.physics.arcade.collide(this.player, this.invisibleFloor, function () {
                return _this2.FightingEventsLibrary.idleAfterLanding(_this2.player);
            }, null, this);
            game.physics.arcade.collide(this.enemy, this.invisibleFloor, function () {
                return _this2.FightingEventsLibrary.idleAfterLanding(_this2.enemy);
            }, null, this);
            game.physics.arcade.collide(this.player, this.enemy, this.FightingEventsLibrary.runAgainst, null, this);
            game.physics.arcade.collide(this.player.hitbox1, this.enemy, function () {
                return _this2.FightingEventsLibrary.damage(_this2.player, _this2.enemy, _this2.FightingEventsLibrary.knockback);
            }, null, this);
            game.physics.arcade.collide(this.enemy.hitbox1, this.player, function () {
                return _this2.FightingEventsLibrary.damage(_this2.enemy, _this2.player, _this2.FightingEventsLibrary.knockback);
            }, null, this);

            //this.enemy.animations.play('left');

            if (this.keyboardIsBeingPressed) {
                this.FightingEventsLibrary.playerMove(this.player, this.enemy, this.inputControls);
            }

            this.FightingEventsLibrary.ai(this.player, this.enemy);
        },
        render: function render() {

            // Sprite debug info
            game.debug.spriteInfo(this.player, 32, 32);
            game.debug.spriteInfo(this.enemy, 500, 32);
            game.debug.body(this.player);
            game.debug.body(this.enemy);
            game.debug.body(this.player.hitbox1);
            game.debug.body(this.enemy.hitbox1);
        }

    };

    // Initialize Phaser, and create a 400px by 490px game
    var game = new Phaser.Game(1500, 524, Phaser.CANVAS);

    // Add the 'mainState' and call it 'main'
    game.state.add('main', mainState);

    // Start the state to actually start the game
    game.state.start('main');
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _HealthBar = __webpack_require__(0);

var _HealthBar2 = _interopRequireDefault(_HealthBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Enemy = function () {
    function Enemy() {
        _classCallCheck(this, Enemy);
    }

    _createClass(Enemy, null, [{
        key: 'add',
        value: function add(game) {
            //konstruktor niepotrzebny bo sprite zwraca obiekt;
            var enemy = game.add.sprite(game.world.width - 300, game.world.height - 200, 'enemy');
            game.physics.arcade.enable(enemy);

            //assets
            enemy.wooshSound = game.add.audio('woosh');
            enemy.punchSound = game.add.audio('enemyPunch');

            enemy.scale.set(0.7);
            // enemy.scale.x *= -1;
            enemy.anchor.set(0.5, 0);

            enemy.body.gravity.y = 1000;
            enemy.body.collideWorldBounds = true;
            enemy.body.setSize(100, 212, 67);

            enemy.animations.add('right', [19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3], 50, true);
            enemy.animations.add('run', [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 50, true);
            var attackAnim = enemy.animations.add('attack', [6, 4], 6, true);
            enemy.animations.add('idle', [0, 1, 2], 3, true);

            attackAnim.onStart.add(function () {
                return enemy.wooshSound.play();
            }, this);
            attackAnim.onLoop.add(function () {
                return enemy.wooshSound.play();
            }, this);

            enemy.hitbox1 = game.add.sprite(0, 0, null);
            game.physics.arcade.enable(enemy.hitbox1);
            enemy.hitbox1.body.setSize(22, 50, -61, enemy.height / 3);
            enemy.addChild(enemy.hitbox1);
            enemy.hitbox1.kill();

            //states
            enemy.health = 100;
            enemy.healthBar = new _HealthBar2.default(game, { x: game.world.width - 250, y: 100, width: 400, height: 50,
                bg: { color: '#75000e' },
                bar: { color: '#00b832' },
                flipped: true
            });
            enemy.isImmortal = false;
            enemy.isBlocking = false;

            return enemy;
        }
    }]);

    return Enemy;
}();

module.exports = Enemy;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _HealthBar = __webpack_require__(0);

var _HealthBar2 = _interopRequireDefault(_HealthBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
    function Player() {
        _classCallCheck(this, Player);
    }

    _createClass(Player, null, [{
        key: 'add',
        value: function add(game) {
            var player = game.add.sprite(100, game.world.height - 200, 'player');
            game.physics.arcade.enable(player);

            //assets
            player.wooshSound = game.add.audio('woosh');
            player.punchSound = game.add.audio('playerPunch');

            player.scale.set(2.5);
            player.anchor.set(0.5, 0);

            player.body.gravity.y = 1000;
            player.body.collideWorldBounds = true;
            player.body.setSize(27, 50, 7);

            player.animations.add('run', [24, 25, 26, 27, 28, 29, 30, 31], 10, true);
            var attackAnim = player.animations.add('attack', [3, 5], 6, true);
            player.animations.add('idle', [2, 5], 2, true);

            attackAnim.onStart.add(function () {
                return player.wooshSound.play();
            }, this);
            attackAnim.onLoop.add(function () {
                return player.wooshSound.play();
            }, this);

            player.hitbox1 = game.add.sprite(0, 0, null);
            game.physics.arcade.enable(player.hitbox1);
            player.hitbox1.body.setSize(22, 50, 27, player.height / 4);
            player.addChild(player.hitbox1);
            player.hitbox1.kill();

            //states
            player.health = 100;
            player.healthBar = new _HealthBar2.default(game, { x: 250, y: 100, width: 400, height: 50,
                bg: { color: '#75000e' },
                bar: { color: '#00b832' }

            });
            player.isImmortal = false;
            player.isBlocking = false;

            return player;
        }
    }]);

    return Player;
}();

module.exports = Player;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Floor = function () {
    function Floor() {
        _classCallCheck(this, Floor);
    }

    _createClass(Floor, null, [{
        key: "loadInvisibleFloor",
        value: function loadInvisibleFloor(game) {
            var invisibleFloor = game.add.sprite(0, game.world.height - 10);
            invisibleFloor.scale.x = game.world.width;
            game.physics.arcade.enable(invisibleFloor);
            invisibleFloor.body.immovable = true;
            //this.invisibleFloor.body.collideWorldBounds = true;
            return invisibleFloor;
        }
    }]);

    return Floor;
}();

module.exports = Floor;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FightingEvents = function () {
    function FightingEvents(player, enemy, inputControls, game) {
        var _this = this;

        _classCallCheck(this, FightingEvents);

        this.knockback = function (attacker, victim) {
            var timeout = setTimeout(function () {
                victim.isImmortal = false;
                victim.body.velocity.x = 0;
            }, 100);
            var startingX = victim.body.x;
            attacker.body.x < victim.body.x ? victim.body.velocity.x = 300 : victim.body.velocity.x = -300;
            victim === _this.enemy ? victim.frame = 19 : victim.frame = 8;
        };

        this.player = player;
        this.enemy = enemy;
        this.inputControls = inputControls;
        this.game = game;
    }

    _createClass(FightingEvents, [{
        key: 'playerMove',
        value: function playerMove(player, enemy, inputControls) {

            switch (true) {

                case inputControls.aKey.isDown:
                    if (player.body.touching.down) {
                        player.animations.play('run');
                        player.lastAnimation = 'run';

                        if (inputControls.wKey.isDown) this.jump(player, -700);
                    } else {
                        player.frame = 6;
                        player.preLastAnimation = 'jump';
                    }
                    if (player.scale.x > 0) {
                        player.scale.x *= -1;
                        player.hitbox1.body.setSize(22, 50, -49, player.height / 4);
                    }
                    player.body.velocity.x = -250;

                    break;

                case inputControls.dKey.isDown:
                    if (player.body.touching.down) {
                        player.animations.play('run');
                        player.lastAnimation = 'run';

                        if (inputControls.wKey.isDown) this.jump(player, -700);
                    } else {
                        player.frame = 6;
                        player.preLastAnimation = 'jump';
                    }
                    if (player.scale.x < 0) {
                        player.scale.x *= -1;
                        player.hitbox1.body.setSize(22, 50, 27, player.height / 4);
                    }
                    player.body.velocity.x = 250;
                    break;

                case inputControls.sKey.isDown:
                    player.frame = 18;
                    if (!player.isBlocking) {
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
                    this.jump(player, -700);
                    break;

                //ENEMY INPUTS///////////////////////////////////////
                // case inputControls.leftKey.isDown:
                //     if (enemy.body.touching.down) {
                //         enemy.animations.play('run');
                //         enemy.lastAnimation = 'run';
                //         if(inputControls.upKey.isDown) this.jump(enemy,-700);
                //      } else{
                //          enemy.frame = 8;
                //          enemy.preLastAnimation = 'jump';
                //      }
                //      if (enemy.scale.x > 0) {
                //          enemy.scale.x *= -1;
                //          enemy.hitbox1.body.setSize(22, 50, -61,enemy.height / 3);
                //      }
                //     enemy.body.velocity.x = -250;
                //
                //     break;
                //
                // case inputControls.rightKey.isDown:
                //     if (enemy.body.touching.down){
                //         enemy.animations.play('run');
                //         enemy.lastAnimation = 'run';
                //         if(inputControls.upKey.isDown) this.jump(enemy,-700);
                //     } else {
                //         enemy.frame = 8;
                //         enemy.preLastAnimation = 'jump';
                //     }
                //      if (enemy.scale.x < 0){
                //          enemy.scale.x *= -1;
                //          enemy.hitbox1.body.setSize(22, 50, 39,enemy.height / 3);
                //      }
                //     enemy.body.velocity.x = 250;
                //     break;
                //
                // case inputControls.downKey.isDown:
                //     enemy.frame = 16;
                //     if (!enemy.isBlocking){
                //         enemy.isBlocking = true;
                //         enemy.isImmortal = true;
                //     }
                //     break;
                //
                //  case inputControls.fKey.isDown:
                //      enemy.animations.play('attack');
                //      enemy.lastAnimation = 'attack';
                //      this.attack(enemy);
                //      break;
                //
                //  case inputControls.upKey.isDown:
                //      this.jump(enemy,-700);
                //      break;

            }
        }
    }, {
        key: 'jump',
        value: function jump(actor, velocity) {
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
    }, {
        key: 'attack',
        value: function attack(actor) {
            //actor.wooshSound.play();
            if (actor.hitbox1.alive === false) {
                actor.hitbox1.revive();
            }
            //hitbox kill is being performed in keyboard.onUpCallback
        }
    }, {
        key: 'damage',
        value: function damage(attacker, victim, knockbackFn) {
            if (victim.isImmortal === false) {
                victim.health -= 10;
                victim.healthBar.setPercent(victim.health);
                attacker.punchSound.play();
                if (victim.health < 1) {
                    victim.hitbox1.body.disable = true;
                    victim.kill();
                } else {
                    victim.isImmortal = true;
                    knockbackFn(attacker, victim);
                }
            }
            console.log(victim.health);
        }
    }, {
        key: 'runAgainst',
        value: function runAgainst() {

            this.enemy.body.velocity.x = 0;
        }
    }, {
        key: 'idleAfterLanding',
        value: function idleAfterLanding(actor) {
            if (actor.lastAnimation === 'jump') {
                actor.animations.play('idle');
                actor.lastAnimation = 'idle';
            }
        }
    }, {
        key: 'ai',
        value: function ai(player, enemy) {
            if (player.body.touching.down) {
                if (Math.abs(player.body.x - enemy.body.x) < enemy.body.width) {
                    enemy.body.velocity.x = 0;
                    enemy.animations.play('idle');
                    enemy.lastAnimation = 'idle';
                } else if (player.body.x < enemy.body.x) {
                    enemy.body.velocity.x = -200;
                    if (enemy.scale.x > 0) {
                        enemy.scale.x *= -1;
                        // enemy.hitbox1.body.setSize(22, 50, -61,enemy.height / 3);
                    }
                } else {
                    enemy.body.velocity.x = 200;
                    if (enemy.scale.x < 0) {
                        enemy.scale.x *= -1;
                        //enemy.hitbox1.body.setSize(22, 50, 39,enemy.height / 3);
                    }
                }
                enemy.animations.play('run');
                enemy.lastAnimation = 'run';
            } else {
                enemy.body.velocity.x = 0;
                enemy.animations.play('idle');
                enemy.lastAnimation = 'idle';
            }
        }
    }]);

    return FightingEvents;
}();

;

module.exports = FightingEvents;

/***/ })
/******/ ]);