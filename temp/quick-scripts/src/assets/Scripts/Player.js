"use strict";
cc._RF.push(module, '3cd2fFlgBpPIYNN/GI2S42+', 'Player');
// Scripts/Player.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.playerSpeed = 300;
        _this.playerStandSpeed = 50;
        _this.nailSound = null;
        _this.dieSound = null;
        _this.gameMgr = null;
        _this.idleFrame = null;
        _this.anim = null;
        _this.moveDir = 0;
        _this.ceilingPos = 155;
        _this.fallDown = false;
        _this.damageTime = 0;
        return _this;
    }
    Player.prototype.onLoad = function () {
        cc.director.getPhysicsManager().enabled = true;
    };
    Player.prototype.start = function () {
        this.idleFrame = this.getComponent(cc.Sprite).spriteFrame;
        this.anim = this.getComponent(cc.Animation);
    };
    Player.prototype.update = function (dt) {
        this.node.x += this.playerSpeed * this.moveDir * dt;
        this.node.scaleX = (this.moveDir >= 0) ? 1 : -1;
        this.node.y = (this.node.y >= this.ceilingPos) ? this.ceilingPos : this.node.y;
        if (this.getComponent(cc.RigidBody).linearVelocity.y != this.playerStandSpeed)
            this.fallDown = true;
        else
            this.fallDown = false;
        if (this.damageTime > 0)
            this.damageTime -= dt;
        else
            this.damageTime = 0;
        this.playerAnimation();
    };
    Player.prototype.reborn = function (rebornPos) {
        this.damageTime = 0;
        this.node.position = rebornPos;
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2();
    };
    Player.prototype.playerMove = function (moveDir) {
        this.moveDir = moveDir;
    };
    Player.prototype.playerRecover = function () {
        this.gameMgr.getComponent("GameMgr").updateLife(1);
    };
    Player.prototype.playerDamage = function () {
        this.damageTime = 1;
        cc.audioEngine.playEffect(this.nailSound, false);
        this.gameMgr.getComponent("GameMgr").updateLife(-5);
    };
    Player.prototype.playerDie = function () {
        cc.audioEngine.playEffect(this.dieSound, false);
        this.gameMgr.getComponent("GameMgr").updateLife(-12);
    };
    Player.prototype.playerAnimation = function () {
        if (this.fallDown) {
            if (this.damageTime > 0) {
                if (this.moveDir == 0 && !this.anim.getAnimationState("fall_front_hurt").isPlaying)
                    this.anim.play("fall_front_hurt");
                else if (this.moveDir != 0 && !this.anim.getAnimationState("fall_side_hurt").isPlaying)
                    this.anim.play("fall_side_hurt");
            }
            else {
                if (this.moveDir == 0 && !this.anim.getAnimationState("fall_front").isPlaying)
                    this.anim.play("fall_front");
                else if (this.moveDir != 0 && !this.anim.getAnimationState("fall_side").isPlaying)
                    this.anim.play("fall_side");
            }
        }
        else {
            if (this.damageTime > 0) {
                if (this.moveDir == 0 && !this.anim.getAnimationState("idle_hurt").isPlaying)
                    this.anim.play("idle_hurt");
                else if (this.moveDir != 0 && !this.anim.getAnimationState("walk_hurt").isPlaying)
                    this.anim.play("walk_hurt");
            }
            else {
                if (this.moveDir == 0) {
                    this.anim.stop();
                    this.getComponent(cc.Sprite).spriteFrame = this.idleFrame;
                }
                else if (!this.anim.getAnimationState("walk").isPlaying)
                    this.anim.play("walk");
            }
        }
    };
    Player.prototype.onBeginContact = function (contact, selfCollider, otherCollider) {
        if (otherCollider.node.name == "lowerBound") {
            this.playerDie();
        }
        else if (otherCollider.node.name == "ceiling") {
            cc.log("player contact");
            this.playerDamage();
        }
    };
    __decorate([
        property()
    ], Player.prototype, "playerSpeed", void 0);
    __decorate([
        property()
    ], Player.prototype, "playerStandSpeed", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Player.prototype, "nailSound", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Player.prototype, "dieSound", void 0);
    __decorate([
        property(cc.Node)
    ], Player.prototype, "gameMgr", void 0);
    Player = __decorate([
        ccclass
    ], Player);
    return Player;
}(cc.Component));
exports.default = Player;

cc._RF.pop();