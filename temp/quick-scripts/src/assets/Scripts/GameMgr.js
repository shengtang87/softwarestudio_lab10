"use strict";
cc._RF.push(module, '9eafa6oJfhL2YaT2IrMk8jP', 'GameMgr');
// Scripts/GameMgr.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Player_1 = require("./Player");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameMgr = /** @class */ (function (_super) {
    __extends(GameMgr, _super);
    function GameMgr() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.background = null;
        _this.wall = null;
        _this.upperBound = null;
        _this.lowerBound = null;
        _this.player = null;
        _this.platforms = null;
        _this.platformPrefabs = [];
        _this.startIcon = null;
        _this.pauseIcon = null;
        _this.scoreNode = null;
        _this.highestScoreNode = null;
        _this.lifeBar = null;
        _this.bgm = null;
        _this.backgroundInitPos = -72;
        _this.backgroundResetPos = 56;
        _this.wallInitPos = -23;
        _this.wallResetPos = 9;
        _this.physicManager = null;
        _this.leftDown = false;
        _this.rightDown = false;
        _this.score = 0;
        _this.highestScore = 0;
        _this.pause = false;
        _this.playerLife = 12;
        return _this;
    }
    GameMgr.prototype.onLoad = function () {
        // ===================== TODO =====================
        // 1. Enable physics manager 
        // 2. Set physics gravity to (0, -200)
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().gravity = cc.v2(0, -200);
        // ================================================
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    };
    GameMgr.prototype.start = function () {
        var _this = this;
        this.schedule(function () {
            var idx = _this.randomChoosePlatform();
            var platform = cc.instantiate(_this.platformPrefabs[idx]);
            platform.parent = _this.platforms;
            platform.position = cc.v2(-144 + Math.random() * 288, -190);
        }, 1.2);
        this.updateHighestScore(0);
        this.scoreCount = function () { _this.updateScore(_this.score + 1); };
    };
    GameMgr.prototype.update = function (dt) {
        if (this.wall.y >= this.wallResetPos)
            this.wall.y = this.wallInitPos;
        this.background.y += 0.2;
        if (this.background.y >= this.backgroundResetPos)
            this.background.y = this.backgroundInitPos;
    };
    GameMgr.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.left:
                this.leftDown = true;
                this.player.playerMove(-1);
                break;
            case cc.macro.KEY.right:
                this.rightDown = true;
                this.player.playerMove(1);
                break;
            case cc.macro.KEY.a:
                this.gameStart();
                break;
            case cc.macro.KEY.d:
                this.gameOver();
                break;
        }
    };
    GameMgr.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.left:
                this.leftDown = false;
                if (this.rightDown)
                    this.player.playerMove(1);
                else
                    this.player.playerMove(0);
                break;
            case cc.macro.KEY.right:
                this.rightDown = false;
                if (this.leftDown)
                    this.player.playerMove(-1);
                else
                    this.player.playerMove(0);
                break;
        }
    };
    GameMgr.prototype.randomChoosePlatform = function () {
        var rand = Math.random();
        //0: normal, 1: nails, 2: fake, 3: conveyor, 4: trampoline
        var prob = [6, 2, 2, 3, 2];
        var sum = prob.reduce(function (a, b) { return a + b; });
        for (var i = 1; i < prob.length; i++)
            prob[i] += prob[i - 1];
        for (var i = 0; i < prob.length; i++) {
            prob[i] /= sum;
            if (rand <= prob[i])
                return i;
        }
    };
    GameMgr.prototype.updateHighestScore = function (score) {
        this.highestScore = score;
        this.highestScoreNode.getComponent(cc.Label).string = (Array(4).join("0") + this.highestScore.toString()).slice(-4);
    };
    GameMgr.prototype.updateScore = function (score) {
        this.score = score;
        this.scoreNode.getComponent(cc.Label).string = (Array(4).join("0") + this.score.toString()).slice(-4);
    };
    GameMgr.prototype.updateLife = function (num) {
        this.playerLife += num;
        this.playerLife = Math.min(Math.max(this.playerLife, 0), 12);
        this.lifeBar.width = this.playerLife * 8;
        if (this.playerLife == 0)
            this.gameOver();
    };
    GameMgr.prototype.gameStart = function () {
        this.startIcon.active = false;
        if (this.score > this.highestScore)
            this.updateHighestScore(this.score);
        this.updateScore(1);
        this.updateLife(12);
        var rebornPos = cc.v2();
        this.platforms.children.forEach(function (platform) {
            platform.getComponent("Platform").reset();
            if (platform.name != 'Nails')
                rebornPos = platform.position.add(cc.v2(0, 50));
        });
        this.player.reborn(rebornPos);
        this.player.node.active = true;
        this.schedule(this.scoreCount, 2);
        cc.audioEngine.playMusic(this.bgm, true);
    };
    GameMgr.prototype.gamePause = function () {
        if (this.pause)
            this.pause = false;
        else
            this.pause = true;
        if (this.pause) {
            this.pauseIcon.active = true;
            this.scheduleOnce(function () {
                cc.game.pause();
            }, 0.1);
        }
        else {
            this.pauseIcon.active = false;
            cc.game.resume();
        }
    };
    GameMgr.prototype.gameOver = function () {
        this.player.node.active = false;
        this.unschedule(this.scoreCount);
        this.startIcon.active = true;
        cc.audioEngine.stopMusic();
    };
    GameMgr.prototype.gameEnd = function () {
        cc.game.end();
    };
    __decorate([
        property(cc.Node)
    ], GameMgr.prototype, "background", void 0);
    __decorate([
        property(cc.Node)
    ], GameMgr.prototype, "wall", void 0);
    __decorate([
        property(cc.Node)
    ], GameMgr.prototype, "upperBound", void 0);
    __decorate([
        property(cc.Node)
    ], GameMgr.prototype, "lowerBound", void 0);
    __decorate([
        property(Player_1.default)
    ], GameMgr.prototype, "player", void 0);
    __decorate([
        property(cc.Node)
    ], GameMgr.prototype, "platforms", void 0);
    __decorate([
        property([cc.Prefab])
    ], GameMgr.prototype, "platformPrefabs", void 0);
    __decorate([
        property(cc.Node)
    ], GameMgr.prototype, "startIcon", void 0);
    __decorate([
        property(cc.Node)
    ], GameMgr.prototype, "pauseIcon", void 0);
    __decorate([
        property(cc.Node)
    ], GameMgr.prototype, "scoreNode", void 0);
    __decorate([
        property(cc.Node)
    ], GameMgr.prototype, "highestScoreNode", void 0);
    __decorate([
        property(cc.Node)
    ], GameMgr.prototype, "lifeBar", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], GameMgr.prototype, "bgm", void 0);
    GameMgr = __decorate([
        ccclass
    ], GameMgr);
    return GameMgr;
}(cc.Component));
exports.default = GameMgr;

cc._RF.pop();