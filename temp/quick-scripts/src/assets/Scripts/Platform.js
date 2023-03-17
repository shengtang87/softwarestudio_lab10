"use strict";
cc._RF.push(module, 'a3e6dBne/JI4rscTjPZ8hyF', 'Platform');
// Scripts/Platform.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Player_1 = require("./Player");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Platform = /** @class */ (function (_super) {
    __extends(Platform, _super);
    function Platform() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.soundEffect = null;
        _this.player = null;
        _this.isTouched = false;
        _this.anim = null;
        _this.animState = null;
        _this.highestPos = 118;
        _this.moveSpeed = 100;
        _this.springVelocity = 320;
        return _this;
        //
        //    Hints: The callbacks are "onBeginContact", "onEndContact", "onPreSolve", "onPostSolve".
        //
        // 2. There are five different types of platforms: "Normal", "Fake", "Nails", "Trampoline", "Conveyor".
        //    When player touches the platform, you need to play the corresponding
        //    sound effect for each platform. (The audioClip named "soundEffect")
        //    Note that the sound effect only plays on the first time the player touches the platform.
        //
        // 3. "Trampoline" and "Fake" need to play animation when the player touches them.
        //    TAs have finished the animation functions, "playAnim" & "getAnimState", for you.
        //    You can directly call "playAnim" to play animation, and call "getAnimState" to get the current animation state.
        //    You have to play animations at the proper timing.
        //
        // 4. For "Trampoline", you have to do "spring effect" whenever the player touches it
        //
        //    Hints: Change "linearVelocity" of the player's rigidbody to make him jump.
        //    The jump value is "springVelocity".
        //
        // 5. For "Conveyor", you have to do "delivery effect" when player is in contact with it.
        //
        //    Hints: Change "linearVelocity" of the player's rigidbody to make him move.
        //    The move value is "moveSpeed".
        //
        // 6. For "Fake", you need to make the player fall 0.2 seconds after he touches the platform.
        //
        // 7. All the platforms have only "upside" collision. You have to prevent the collisions from the other directions.
        //
        //    Hints: You can use "contact.getWorldManifold().normal" to judge collision direction.
        //
        //
        // 8. When player touches "Nails" platform, you need to call the function "playerDamage" in "Player.ts" to update player health,
        //    or call the function "playerRecover" in "Player.ts" when player touches other platforms.
        //
        // 9. When platforms touch the node named "upperBound", you need to call the function "platformDestroy" to destroy the platform.
        // ================================================
    }
    Platform.prototype.onLoad = function () {
        cc.director.getPhysicsManager().enabled = true;
    };
    Platform.prototype.start = function () {
        this.anim = this.getComponent(cc.Animation);
        if (this.node.name == "Conveyor") {
            this.node.scaleX = Math.random() >= 0.5 ? 1 : -1;
            this.moveSpeed *= this.node.scaleX;
        }
    };
    Platform.prototype.reset = function () {
        this.isTouched = false;
    };
    Platform.prototype.update = function (dt) {
        if (this.node.y - this.highestPos >= 0 &&
            this.node.y - this.highestPos < 100)
            this.getComponent(cc.PhysicsBoxCollider).enabled = false;
        else
            this.getComponent(cc.PhysicsBoxCollider).enabled = true;
    };
    Platform.prototype.playAnim = function () {
        if (this.anim)
            this.animState = this.anim.play();
    };
    Platform.prototype.getAnimState = function () {
        if (this.animState)
            return this.animState;
    };
    Platform.prototype.platformDestroy = function () {
        cc.log(this.node.name + " Platform destory.");
        this.node.destroy();
    };
    // ===================== TODO =====================
    // 1. In the physics lecture, we know that Cocos Creator
    //    provides four contact callbacks. You need to use callbacks to
    //    design different behaviors for different platforms.
    Platform.prototype.onBeginContact = function (contact, selfCollider, otherCollider) {
        if (otherCollider.node.name == "player") {
            // console.log(contact.getWorldManifold().normal.Vec2.)
            if (this.isTouched == false) {
                cc.audioEngine.playEffect(this.soundEffect, false);
                this.isTouched = true;
                if (this.node.name == "Nails") {
                    otherCollider.node.getComponent("Player").playerDamage();
                }
                else {
                    otherCollider.node.getComponent("Player").playerRecover();
                }
            }
            if (this.node.name == "Fake") {
                this.getAnimState();
                this.playAnim();
                this.schedule(function () {
                    contact.disabledonce = true;
                }, 0.2);
            }
            else if (this.node.name == "Trampoline") {
                this.isTouched = false;
                this.getAnimState();
                this.playAnim();
                otherCollider.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, this.springVelocity);
            }
        }
    };
    Platform.prototype.onPreSolve = function (contact, selfCollider, otherCollider) {
        if (otherCollider.node.name == "player") {
            if (this.node.name == "Conveyor") {
                otherCollider.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.moveSpeed, 0);
            }
        }
    };
    Platform.prototype.onEndContact = function (contact, selfCollider, otherCollider) {
        if (this.node.name == "Conveyor") {
            otherCollider.getComponent(cc.RigidBody).linearVelocity = contact.moveSpeed;
        }
        // contact.enabled = true;
    };
    __decorate([
        property({ type: cc.AudioClip })
    ], Platform.prototype, "soundEffect", void 0);
    __decorate([
        property(Player_1.default)
    ], Platform.prototype, "player", void 0);
    Platform = __decorate([
        ccclass
    ], Platform);
    return Platform;
}(cc.Component));
exports.default = Platform;

cc._RF.pop();