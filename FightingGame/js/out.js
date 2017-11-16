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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Enemy = __webpack_require__(2);

var _Enemy2 = _interopRequireDefault(_Enemy);

var _Player = __webpack_require__(3);

var _Player2 = _interopRequireDefault(_Player);

var _Floor = __webpack_require__(4);

var _Floor2 = _interopRequireDefault(_Floor);

var _FightingEvents = __webpack_require__(5);

var _FightingEvents2 = _interopRequireDefault(_FightingEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.addEventListener('load', function () {

    var mainState = {
        preload: function preload() {
            game.load.image('background', 'assets/background.jpg');
            game.load.spritesheet('player', 'assets/player.png', 46, 50);
            game.load.spritesheet('enemy', 'assets/enemy.png', 221, 212);
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
                spaceKey: game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
            };

            //Obiekt zawierajacy metody zwiazane z logiką gry
            this.FightingEventsLibrary = new _FightingEvents2.default(this.player, this.enemy, this.inputControls);

            this.keyboardIsBeingPressed = false;
            game.input.keyboard.onDownCallback = function () {
                if (_this.keyboardIsBeingPressed === false) _this.keyboardIsBeingPressed = true;
            };

            //restart stanu playera po puszczeniu klawiszy
            game.input.keyboard.onUpCallback = function () {
                _this.keyboardIsBeingPressed = false;
                _this.player.animations.stop(_this.player.lastAnimation);
                _this.player.frame = 0;
                _this.player.body.velocity.x = 0;
                _this.player.animations.play('idle');
                console.log('obcizam sys');

                console.log(_this.player.body.width);
                console.log(_this.player.body.height);
                console.log(_this.enemy.body.width);
                console.log(_this.enemy.body.height);
            };

            //inicjalizacja animacji idle
            this.enemy.animations.play('idle');
            this.enemy.lastAnimation = 'idle';
            this.player.animations.play('idle');
            this.player.lastAnimation = 'idle';
        },

        update: function update() {

            // This function is called 60 times per second
            // It contains the game's logic

            game.physics.arcade.collide(this.player, this.invisibleFloor);
            game.physics.arcade.collide(this.enemy, this.invisibleFloor);
            game.physics.arcade.collide(this.player, this.enemy);

            //this.enemy.animations.play('left');

            if (this.keyboardIsBeingPressed) {
                this.FightingEventsLibrary.playerMove(this.player, this.enemy, this.inputControls);
            }
        },
        render: function render() {

            // Sprite debug info
            game.debug.spriteInfo(this.player, 32, 32);
            game.debug.spriteInfo(this.enemy, 500, 32);
            game.debug.body(this.player);
            game.debug.body(this.enemy);
        }

    };

    // Initialize Phaser, and create a 400px by 490px game
    var game = new Phaser.Game(1100, 524, Phaser.CANVAS);

    // Add the 'mainState' and call it 'main'
    game.state.add('main', mainState);

    // Start the state to actually start the game
    game.state.start('main');
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

            enemy.scale.set(0.6);
            // enemy.scale.x *= -1;
            enemy.anchor.set(0.5, 0.5);

            enemy.body.gravity.y = 2300;
            enemy.body.collideWorldBounds = true;

            enemy.animations.add('right', [19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3], 50, true);
            enemy.animations.add('left', [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 50, true);
            enemy.animations.add('attack', [6, 12, 13], 7, true);
            enemy.animations.add('idle', [0, 1, 2], 3, true);
            //enemy.animations.add('block', [16], 2, true);

            //states
            enemy.health = 100;

            return enemy;
        }
    }]);

    return Enemy;
}();

module.exports = Enemy;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

            player.scale.set(2.5);
            player.anchor.set(0.5, 0.5);

            player.body.gravity.y = 600;
            player.body.collideWorldBounds = true;

            player.animations.add('run', [24, 25, 26, 27, 28, 29, 30, 31], 10, true);
            player.animations.add('attack', [3, 5], 6, true);
            player.animations.add('idle', [2, 5], 2, true);
            //player.animations.add('block', [2,5],6, true);

            //states
            player.health = 100;

            return player;
        }
    }]);

    return Player;
}();

module.exports = Player;

/***/ }),
/* 4 */
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FightingEvents = function () {
    function FightingEvents(player, enemy, inputControls) {
        _classCallCheck(this, FightingEvents);

        this.player = player;
        this.enemy = enemy;
        this.inputControls = inputControls;
    }

    _createClass(FightingEvents, [{
        key: 'playerMove',
        value: function playerMove(player, enemy, inputControls) {

            switch (true) {

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
                    this.jump(player, -400);
                    break;

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
                actor.frame = 4;
                actor.animations.stop(actor.lastAnimation);
            }
        }
    }]);

    return FightingEvents;
}();

;

module.exports = FightingEvents;

/***/ })
/******/ ]);