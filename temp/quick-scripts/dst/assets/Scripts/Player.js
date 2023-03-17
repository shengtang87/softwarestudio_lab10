
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Player.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFTSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFvQywwQkFBWTtJQUFoRDtRQUFBLHFFQTRJQztRQXpJRyxpQkFBVyxHQUFXLEdBQUcsQ0FBQztRQUcxQixzQkFBZ0IsR0FBVyxFQUFFLENBQUM7UUFHOUIsZUFBUyxHQUFpQixJQUFJLENBQUM7UUFHL0IsY0FBUSxHQUFpQixJQUFJLENBQUM7UUFHOUIsYUFBTyxHQUFZLElBQUksQ0FBQztRQUVoQixlQUFTLEdBQW1CLElBQUksQ0FBQztRQUVqQyxVQUFJLEdBQWlCLElBQUksQ0FBQztRQUUxQixhQUFPLEdBQUcsQ0FBQyxDQUFDO1FBRVosZ0JBQVUsR0FBVyxHQUFHLENBQUM7UUFFekIsY0FBUSxHQUFZLEtBQUssQ0FBQztRQUUxQixnQkFBVSxHQUFXLENBQUMsQ0FBQzs7SUFpSG5DLENBQUM7SUFoSEcsdUJBQU0sR0FBTjtRQUVJLEVBQUUsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ25ELENBQUM7SUFFRCxzQkFBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUM7UUFDMUQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsdUJBQU0sR0FBTixVQUFPLEVBQUU7UUFFTCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ3BELElBQUksQ0FBQyxJ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SSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUM5QjtTQUNKO0lBQ0wsQ0FBQztJQUVELCtCQUFjLEdBQWQsVUFBZSxPQUFPLEVBQUUsWUFBWSxFQUFFLGFBQWE7UUFFL0MsSUFBRyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxZQUFZLEVBQzFDO1lBQ0ksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQ3BCO2FBQ0ksSUFBRyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxTQUFTLEVBQzVDO1lBQ0ksRUFBRSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUN2QjtJQUVMLENBQUM7SUF4SUQ7UUFEQyxRQUFRLEVBQUU7K0NBQ2U7SUFHMUI7UUFEQyxRQUFRLEVBQUU7b0RBQ21CO0lBRzlCO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUMsQ0FBQzs2Q0FDQztJQUcvQjtRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsU0FBUyxFQUFDLENBQUM7NENBQ0E7SUFHOUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsyQ0FDTTtJQWZQLE1BQU07UUFEMUIsT0FBTztPQUNhLE1BQU0sQ0E0STFCO0lBQUQsYUFBQztDQTVJRCxBQTRJQyxDQTVJbUMsRUFBRSxDQUFDLFNBQVMsR0E0SS9DO2tCQTVJb0IsTUFBTSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHYW1lTWdyIGZyb20gXCIuL0dhbWVNZ3JcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIGV4dGVuZHMgY2MuQ29tcG9uZW50IFxyXG57XHJcbiAgICBAcHJvcGVydHkoKVxyXG4gICAgcGxheWVyU3BlZWQ6IG51bWJlciA9IDMwMDtcclxuXHJcbiAgICBAcHJvcGVydHkoKVxyXG4gICAgcGxheWVyU3RhbmRTcGVlZDogbnVtYmVyID0gNTA7XHJcblxyXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLkF1ZGlvQ2xpcH0pXHJcbiAgICBuYWlsU291bmQ6IGNjLkF1ZGlvQ2xpcCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLkF1ZGlvQ2xpcH0pXHJcbiAgICBkaWVTb3VuZDogY2MuQXVkaW9DbGlwID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGdhbWVNZ3I6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgXHJcbiAgICBwcml2YXRlIGlkbGVGcmFtZTogY2MuU3ByaXRlRnJhbWUgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgYW5pbTogY2MuQW5pbWF0aW9uID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIG1vdmVEaXIgPSAwO1xyXG5cclxuICAgIHByaXZhdGUgY2VpbGluZ1BvczogbnVtYmVyID0gMTU1O1xyXG5cclxuICAgIHByaXZhdGUgZmFsbERvd246IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBwcml2YXRlIGRhbWFnZVRpbWU6IG51bWJlciA9IDA7XHJcbiAgICBvbkxvYWQoKVxyXG4gICAge1xyXG4gICAgICAgIGNjLmRpcmVjdG9yLmdldFBoeXNpY3NNYW5hZ2VyKCkuZW5hYmxlZCA9IHRydWU7ICAgICAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnQgKCkge1xyXG4gICAgICAgIHRoaXMuaWRsZUZyYW1lID0gdGhpcy5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZTtcclxuICAgICAgICB0aGlzLmFuaW0gPSB0aGlzLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShkdClcclxuICAgIHtcclxuICAgICAgICB0aGlzLm5vZGUueCArPSB0aGlzLnBsYXllclNwZWVkICogdGhpcy5tb3ZlRGlyICogZHQ7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNjYWxlWCA9ICh0aGlzLm1vdmVEaXIgPj0gMCkgPyAxIDogLTE7XHJcbiAgICAgICAgdGhpcy5ub2RlLnkgPSAodGhpcy5ub2RlLnkgPj0gdGhpcy5jZWlsaW5nUG9zKSA/IHRoaXMuY2VpbGluZ1BvcyA6IHRoaXMubm9kZS55O1xyXG4gICAgICAgIGlmKHRoaXMuZ2V0Q29tcG9uZW50KGNjLlJpZ2lkQm9keSkubGluZWFyVmVsb2NpdHkueSAhPSB0aGlzLnBsYXllclN0YW5kU3BlZWQpXHJcbiAgICAgICAgICAgIHRoaXMuZmFsbERvd24gPSB0cnVlO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5mYWxsRG93biA9IGZhbHNlO1xyXG5cclxuICAgICAgICBpZih0aGlzLmRhbWFnZVRpbWUgPiAwKVxyXG4gICAgICAgICAgICB0aGlzLmRhbWFnZVRpbWUgLT0gZHQ7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLmRhbWFnZVRpbWUgPSAwO1xyXG5cclxuICAgICAgICB0aGlzLnBsYXllckFuaW1hdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlYm9ybihyZWJvcm5Qb3M6IGNjLlZlYzIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5kYW1hZ2VUaW1lID0gMDtcclxuICAgICAgICB0aGlzLm5vZGUucG9zaXRpb24gPSByZWJvcm5Qb3M7XHJcbiAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoY2MuUmlnaWRCb2R5KS5saW5lYXJWZWxvY2l0eSA9IGNjLnYyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcGxheWVyTW92ZShtb3ZlRGlyOiBudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tb3ZlRGlyID0gbW92ZURpcjtcclxuICAgIH1cclxuXHJcbiAgICBwbGF5ZXJSZWNvdmVyKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmdhbWVNZ3IuZ2V0Q29tcG9uZW50KFwiR2FtZU1nclwiKS51cGRhdGVMaWZlKDEpO1xyXG4gICAgfVxyXG5cclxuICAgIHBsYXllckRhbWFnZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5kYW1hZ2VUaW1lID0gMTtcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMubmFpbFNvdW5kLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5nYW1lTWdyLmdldENvbXBvbmVudChcIkdhbWVNZ3JcIikudXBkYXRlTGlmZSgtNSk7XHJcbiAgICB9XHJcblxyXG4gICAgcGxheWVyRGllKClcclxuICAgIHtcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuZGllU291bmQsZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuZ2FtZU1nci5nZXRDb21wb25lbnQoXCJHYW1lTWdyXCIpLnVwZGF0ZUxpZmUoLTEyKTtcclxuICAgIH1cclxuXHJcbiAgICBwbGF5ZXJBbmltYXRpb24oKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuZmFsbERvd24pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLmRhbWFnZVRpbWUgPiAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLm1vdmVEaXIgPT0gMCAmJiAhdGhpcy5hbmltLmdldEFuaW1hdGlvblN0YXRlKFwiZmFsbF9mcm9udF9odXJ0XCIpLmlzUGxheWluZylcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW0ucGxheShcImZhbGxfZnJvbnRfaHVydFwiKTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpcy5tb3ZlRGlyICE9IDAgJiYgIXRoaXMuYW5pbS5nZXRBbmltYXRpb25TdGF0ZShcImZhbGxfc2lkZV9odXJ0XCIpLmlzUGxheWluZylcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW0ucGxheShcImZhbGxfc2lkZV9odXJ0XCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5tb3ZlRGlyID09IDAgJiYgIXRoaXMuYW5pbS5nZXRBbmltYXRpb25TdGF0ZShcImZhbGxfZnJvbnRcIikuaXNQbGF5aW5nKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbS5wbGF5KFwiZmFsbF9mcm9udFwiKTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpcy5tb3ZlRGlyICE9IDAgJiYgIXRoaXMuYW5pbS5nZXRBbmltYXRpb25TdGF0ZShcImZhbGxfc2lkZVwiKS5pc1BsYXlpbmcpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltLnBsYXkoXCJmYWxsX3NpZGVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5kYW1hZ2VUaW1lID4gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5tb3ZlRGlyID09IDAgJiYgIXRoaXMuYW5pbS5nZXRBbmltYXRpb25TdGF0ZShcImlkbGVfaHVydFwiKS5pc1BsYXlpbmcpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltLnBsYXkoXCJpZGxlX2h1cnRcIik7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXMubW92ZURpciAhPSAwICYmICF0aGlzLmFuaW0uZ2V0QW5pbWF0aW9uU3RhdGUoXCJ3YWxrX2h1cnRcIikuaXNQbGF5aW5nKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbS5wbGF5KFwid2Fsa19odXJ0XCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5tb3ZlRGlyID09IDApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltLnN0b3AoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5pZGxlRnJhbWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKCF0aGlzLmFuaW0uZ2V0QW5pbWF0aW9uU3RhdGUoXCJ3YWxrXCIpLmlzUGxheWluZylcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW0ucGxheShcIndhbGtcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25CZWdpbkNvbnRhY3QoY29udGFjdCwgc2VsZkNvbGxpZGVyLCBvdGhlckNvbGxpZGVyKVxyXG4gICAge1xyXG4gICAgICAgIGlmKG90aGVyQ29sbGlkZXIubm9kZS5uYW1lID09IFwibG93ZXJCb3VuZFwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJEaWUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihvdGhlckNvbGxpZGVyLm5vZGUubmFtZSA9PSBcImNlaWxpbmdcIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNjLmxvZyhcInBsYXllciBjb250YWN0XCIpO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllckRhbWFnZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuIl19