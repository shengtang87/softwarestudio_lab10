
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/Scripts/GameMgr');
require('./assets/Scripts/Platform');
require('./assets/Scripts/Player');
require('./assets/migration/use_reversed_rotateTo');

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Platform.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGxhdGZvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1DQUE4QjtBQUV4QixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFzQyw0QkFBWTtJQUFsRDtRQUFBLHFFQXlKQztRQXZKQyxpQkFBVyxHQUFpQixJQUFJLENBQUM7UUFHakMsWUFBTSxHQUFXLElBQUksQ0FBQztRQUVaLGVBQVMsR0FBWSxLQUFLLENBQUM7UUFFN0IsVUFBSSxHQUFpQixJQUFJLENBQUM7UUFFMUIsZUFBUyxHQUFzQixJQUFJLENBQUM7UUFFcEMsZ0JBQVUsR0FBVyxHQUFHLENBQUM7UUFFekIsZUFBUyxHQUFXLEdBQUcsQ0FBQztRQUV4QixvQkFBYyxHQUFXLEdBQUcsQ0FBQzs7UUFxR3JDLEVBQUU7UUFDRiw2RkFBNkY7UUFDN0YsRUFBRTtRQUNGLHVHQUF1RztRQUN2RywwRUFBMEU7UUFDMUUseUVBQXlFO1FBQ3pFLDhGQUE4RjtRQUM5RixFQUFFO1FBQ0Ysa0ZBQWtGO1FBQ2xGLHNGQUFzRjtRQUN0RixxSEFBcUg7UUFDckgsdURBQXVEO1FBQ3ZELEVBQUU7UUFDRixxRkFBcUY7UUFDckYsRUFBRTtRQUNGLGdGQUFnRjtRQUNoRix5Q0FBeUM7UUFDekMsRUFBRTtRQUNGLHlGQUF5RjtRQUN6RixFQUFFO1FBQ0YsZ0ZBQWdGO1FBQ2hGLG9DQUFvQztRQUNwQyxFQUFFO1FBQ0YsNkZBQTZGO1FBQzdGLEVBQUU7UUFDRixtSEFBbUg7UUFDbkgsRUFBRTtRQUNGLDBGQUEwRjtRQUMxRixFQUFFO1FBQ0YsRUFBRTtRQUNGLGdJQUFnSTtRQUNoSSw4RkFBOEY7UUFDOUYsRUFBRTtRQUNGLGdJQUFnSTtRQUNoSSxtREFBbUQ7SUFDckQsQ0FBQztJQXRJQyx5QkFBTSxHQUFOO1FBRUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxpQkFB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QUxILFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0F5SjVCO0lBQUQsZUFBQztDQXpKRCxBQXlKQyxDQXpKcUMsRUFBRSxDQUFDLFNBQVMsR0F5SmpEO2tCQXpKb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vUGxheWVyXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxhdGZvcm0gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkF1ZGlvQ2xpcCB9KVxyXG4gIHNvdW5kRWZmZWN0OiBjYy5BdWRpb0NsaXAgPSBudWxsO1xyXG5cclxuICBAcHJvcGVydHkoUGxheWVyKVxyXG4gIHBsYXllcjogUGxheWVyID0gbnVsbDtcclxuXHJcbiAgcHJvdGVjdGVkIGlzVG91Y2hlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBwcml2YXRlIGFuaW06IGNjLkFuaW1hdGlvbiA9IG51bGw7XHJcblxyXG4gIHByaXZhdGUgYW5pbVN0YXRlOiBjYy5BbmltYXRpb25TdGF0ZSA9IG51bGw7XHJcblxyXG4gIHByaXZhdGUgaGlnaGVzdFBvczogbnVtYmVyID0gMTE4O1xyXG5cclxuICBwcml2YXRlIG1vdmVTcGVlZDogbnVtYmVyID0gMTAwO1xyXG5cclxuICBwcml2YXRlIHNwcmluZ1ZlbG9jaXR5OiBudW1iZXIgPSAzMjA7XHJcblxyXG4gIG9uTG9hZCgpe1xyXG5cclxuICAgICAgY2MuZGlyZWN0b3IuZ2V0UGh5c2ljc01hbmFnZXIoKS5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAgIFxyXG4gIH1cclxuXHJcbiAgc3RhcnQoKSB7XHJcbiAgICB0aGlzLmFuaW0gPSB0aGlzLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xyXG5cclxuICAgIGlmICh0aGlzLm5vZGUubmFtZSA9PSBcIkNvbnZleW9yXCIpIHtcclxuICAgICAgdGhpcy5ub2RlLnNjYWxlWCA9IE1hdGgucmFuZG9tKCkgPj0gMC41ID8gMSA6IC0xO1xyXG4gICAgICB0aGlzLm1vdmVTcGVlZCAqPSB0aGlzLm5vZGUuc2NhbGVYO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVzZXQoKSB7XHJcbiAgICB0aGlzLmlzVG91Y2hlZCA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKGR0KSB7XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMubm9kZS55IC0gdGhpcy5oaWdoZXN0UG9zID49IDAgJiZcclxuICAgICAgdGhpcy5ub2RlLnkgLSB0aGlzLmhpZ2hlc3RQb3MgPCAxMDBcclxuICAgIClcclxuICAgICAgdGhpcy5nZXRDb21wb25lbnQoY2MuUGh5c2ljc0JveENvbGxpZGVyKS5lbmFibGVkID0gZmFsc2U7XHJcbiAgICBlbHNlIHRoaXMuZ2V0Q29tcG9uZW50KGNjLlBoeXNpY3NCb3hDb2xsaWRlcikuZW5hYmxlZCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBwbGF5QW5pbSgpIHtcclxuICAgIGlmICh0aGlzLmFuaW0pIHRoaXMuYW5pbVN0YXRlID0gdGhpcy5hbmltLnBsYXkoKTtcclxuICB9XHJcblxyXG4gIGdldEFuaW1TdGF0ZSgpIHtcclxuICAgIGlmICh0aGlzLmFuaW1TdGF0ZSkgcmV0dXJuIHRoaXMuYW5pbVN0YXRlO1xyXG4gIH1cclxuXHJcbiAgcGxhdGZvcm1EZXN0cm95KCkge1xyXG4gICAgY2MubG9nKHRoaXMubm9kZS5uYW1lICsgXCIgUGxhdGZvcm0gZGVzdG9yeS5cIik7XHJcbiAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xyXG4gIH1cclxuXHJcbiAgLy8gPT09PT09PT09PT09PT09PT09PT09IFRPRE8gPT09PT09PT09PT09PT09PT09PT09XHJcbiAgLy8gMS4gSW4gdGhlIHBoeXNpY3MgbGVjdHVyZSwgd2Uga25vdyB0aGF0IENvY29zIENyZWF0b3JcclxuICAvLyAgICBwcm92aWRlcyBmb3VyIGNvbnRhY3QgY2FsbGJhY2tzLiBZb3UgbmVlZCB0byB1c2UgY2FsbGJhY2tzIHRvXHJcbiAgLy8gICAgZGVzaWduIGRpZmZlcmVudCBiZWhhdmlvcnMgZm9yIGRpZmZlcmVudCBwbGF0Zm9ybXMuXHJcbiAgXHJcbiAgICBvbkJlZ2luQ29udGFjdChjb250YWN0LCBzZWxmQ29sbGlkZXIsIG90aGVyQ29sbGlkZXIpICAgIHtcclxuXHJcbiAgICAgIGlmKG90aGVyQ29sbGlkZXIubm9kZS5uYW1lID09IFwicGxheWVyXCIpXHJcbiAgICAgIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhjb250YWN0LmdldFdvcmxkTWFuaWZvbGQoKS5ub3JtYWwuVmVjMi4pXHJcbiAgICAgICAgaWYodGhpcy5pc1RvdWNoZWQ9PWZhbHNlKXtcclxuICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5zb3VuZEVmZmVjdCxmYWxzZSk7XHJcbiAgICAgICAgICB0aGlzLmlzVG91Y2hlZD10cnVlO1xyXG5cclxuICAgICAgICAgIGlmKHRoaXMubm9kZS5uYW1lPT1cIk5haWxzXCIpe1xyXG4gICAgICAgICAgICBvdGhlckNvbGxpZGVyLm5vZGUuZ2V0Q29tcG9uZW50KFwiUGxheWVyXCIpLnBsYXllckRhbWFnZSgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIG90aGVyQ29sbGlkZXIubm9kZS5nZXRDb21wb25lbnQoXCJQbGF5ZXJcIikucGxheWVyUmVjb3ZlcigpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLm5vZGUubmFtZT09XCJGYWtlXCIpe1xyXG5cclxuICAgICAgICAgIHRoaXMuZ2V0QW5pbVN0YXRlKCk7XHJcbiAgICAgICAgICB0aGlzLnBsYXlBbmltKCk7XHJcblxyXG4gICAgICAgICAgdGhpcy5zY2hlZHVsZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29udGFjdC5kaXNhYmxlZG9uY2UgPSB0cnVlO1xyXG4gICAgICAgICAgfSwgMC4yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5ub2RlLm5hbWU9PVwiVHJhbXBvbGluZVwiKXtcclxuICAgICAgICAgIHRoaXMuaXNUb3VjaGVkPWZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5nZXRBbmltU3RhdGUoKTtcclxuICAgICAgICAgIHRoaXMucGxheUFuaW0oKTtcclxuICAgICAgICAgIG90aGVyQ29sbGlkZXIuZ2V0Q29tcG9uZW50KGNjLlJpZ2lkQm9keSkubGluZWFyVmVsb2NpdHk9Y2MudjIoMCx0aGlzLnNwcmluZ1ZlbG9jaXR5KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvblByZVNvbHZlKGNvbnRhY3QsIHNlbGZDb2xsaWRlciwgb3RoZXJDb2xsaWRlcil7XHJcblxyXG4gICAgICBpZihvdGhlckNvbGxpZGVyLm5vZGUubmFtZSA9PSBcInBsYXllclwiKVxyXG4gICAgICB7XHJcbiAgICAgICAgaWYodGhpcy5ub2RlLm5hbWU9PVwiQ29udmV5b3JcIil7XHJcbiAgICAgICAgICBvdGhlckNvbGxpZGVyLmdldENvbXBvbmVudChjYy5SaWdpZEJvZHkpLmxpbmVhclZlbG9jaXR5PWNjLnYyKHRoaXMubW92ZVNwZWVkLDApO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgb25FbmRDb250YWN0KGNvbnRhY3QsIHNlbGZDb2xsaWRlciwgb3RoZXJDb2xsaWRlcil7XHJcbiAgICAgIGlmKHRoaXMubm9kZS5uYW1lPT1cIkNvbnZleW9yXCIpe1xyXG4gICAgICAgIG90aGVyQ29sbGlkZXIuZ2V0Q29tcG9uZW50KGNjLlJpZ2lkQm9keSkubGluZWFyVmVsb2NpdHk9Y29udGFjdC5tb3ZlU3BlZWQ7XHJcbiAgICAgIH1cclxuICAgICAgLy8gY29udGFjdC5lbmFibGVkID0gdHJ1ZTtcclxuICAgIH1cclxuICAvL1xyXG4gIC8vICAgIEhpbnRzOiBUaGUgY2FsbGJhY2tzIGFyZSBcIm9uQmVnaW5Db250YWN0XCIsIFwib25FbmRDb250YWN0XCIsIFwib25QcmVTb2x2ZVwiLCBcIm9uUG9zdFNvbHZlXCIuXHJcbiAgLy9cclxuICAvLyAyLiBUaGVyZSBhcmUgZml2ZSBkaWZmZXJlbnQgdHlwZXMgb2YgcGxhdGZvcm1zOiBcIk5vcm1hbFwiLCBcIkZha2VcIiwgXCJOYWlsc1wiLCBcIlRyYW1wb2xpbmVcIiwgXCJDb252ZXlvclwiLlxyXG4gIC8vICAgIFdoZW4gcGxheWVyIHRvdWNoZXMgdGhlIHBsYXRmb3JtLCB5b3UgbmVlZCB0byBwbGF5IHRoZSBjb3JyZXNwb25kaW5nXHJcbiAgLy8gICAgc291bmQgZWZmZWN0IGZvciBlYWNoIHBsYXRmb3JtLiAoVGhlIGF1ZGlvQ2xpcCBuYW1lZCBcInNvdW5kRWZmZWN0XCIpXHJcbiAgLy8gICAgTm90ZSB0aGF0IHRoZSBzb3VuZCBlZmZlY3Qgb25seSBwbGF5cyBvbiB0aGUgZmlyc3QgdGltZSB0aGUgcGxheWVyIHRvdWNoZXMgdGhlIHBsYXRmb3JtLlxyXG4gIC8vXHJcbiAgLy8gMy4gXCJUcmFtcG9saW5lXCIgYW5kIFwiRmFrZVwiIG5lZWQgdG8gcGxheSBhbmltYXRpb24gd2hlbiB0aGUgcGxheWVyIHRvdWNoZXMgdGhlbS5cclxuICAvLyAgICBUQXMgaGF2ZSBmaW5pc2hlZCB0aGUgYW5pbWF0aW9uIGZ1bmN0aW9ucywgXCJwbGF5QW5pbVwiICYgXCJnZXRBbmltU3RhdGVcIiwgZm9yIHlvdS5cclxuICAvLyAgICBZb3UgY2FuIGRpcmVjdGx5IGNhbGwgXCJwbGF5QW5pbVwiIHRvIHBsYXkgYW5pbWF0aW9uLCBhbmQgY2FsbCBcImdldEFuaW1TdGF0ZVwiIHRvIGdldCB0aGUgY3VycmVudCBhbmltYXRpb24gc3RhdGUuXHJcbiAgLy8gICAgWW91IGhhdmUgdG8gcGxheSBhbmltYXRpb25zIGF0IHRoZSBwcm9wZXIgdGltaW5nLlxyXG4gIC8vXHJcbiAgLy8gNC4gRm9yIFwiVHJhbXBvbGluZVwiLCB5b3UgaGF2ZSB0byBkbyBcInNwcmluZyBlZmZlY3RcIiB3aGVuZXZlciB0aGUgcGxheWVyIHRvdWNoZXMgaXRcclxuICAvL1xyXG4gIC8vICAgIEhpbnRzOiBDaGFuZ2UgXCJsaW5lYXJWZWxvY2l0eVwiIG9mIHRoZSBwbGF5ZXIncyByaWdpZGJvZHkgdG8gbWFrZSBoaW0ganVtcC5cclxuICAvLyAgICBUaGUganVtcCB2YWx1ZSBpcyBcInNwcmluZ1ZlbG9jaXR5XCIuXHJcbiAgLy9cclxuICAvLyA1LiBGb3IgXCJDb252ZXlvclwiLCB5b3UgaGF2ZSB0byBkbyBcImRlbGl2ZXJ5IGVmZmVjdFwiIHdoZW4gcGxheWVyIGlzIGluIGNvbnRhY3Qgd2l0aCBpdC5cclxuICAvL1xyXG4gIC8vICAgIEhpbnRzOiBDaGFuZ2UgXCJsaW5lYXJWZWxvY2l0eVwiIG9mIHRoZSBwbGF5ZXIncyByaWdpZGJvZHkgdG8gbWFrZSBoaW0gbW92ZS5cclxuICAvLyAgICBUaGUgbW92ZSB2YWx1ZSBpcyBcIm1vdmVTcGVlZFwiLlxyXG4gIC8vXHJcbiAgLy8gNi4gRm9yIFwiRmFrZVwiLCB5b3UgbmVlZCB0byBtYWtlIHRoZSBwbGF5ZXIgZmFsbCAwLjIgc2Vjb25kcyBhZnRlciBoZSB0b3VjaGVzIHRoZSBwbGF0Zm9ybS5cclxuICAvL1xyXG4gIC8vIDcuIEFsbCB0aGUgcGxhdGZvcm1zIGhhdmUgb25seSBcInVwc2lkZVwiIGNvbGxpc2lvbi4gWW91IGhhdmUgdG8gcHJldmVudCB0aGUgY29sbGlzaW9ucyBmcm9tIHRoZSBvdGhlciBkaXJlY3Rpb25zLlxyXG4gIC8vXHJcbiAgLy8gICAgSGludHM6IFlvdSBjYW4gdXNlIFwiY29udGFjdC5nZXRXb3JsZE1hbmlmb2xkKCkubm9ybWFsXCIgdG8ganVkZ2UgY29sbGlzaW9uIGRpcmVjdGlvbi5cclxuICAvL1xyXG4gIC8vXHJcbiAgLy8gOC4gV2hlbiBwbGF5ZXIgdG91Y2hlcyBcIk5haWxzXCIgcGxhdGZvcm0sIHlvdSBuZWVkIHRvIGNhbGwgdGhlIGZ1bmN0aW9uIFwicGxheWVyRGFtYWdlXCIgaW4gXCJQbGF5ZXIudHNcIiB0byB1cGRhdGUgcGxheWVyIGhlYWx0aCxcclxuICAvLyAgICBvciBjYWxsIHRoZSBmdW5jdGlvbiBcInBsYXllclJlY292ZXJcIiBpbiBcIlBsYXllci50c1wiIHdoZW4gcGxheWVyIHRvdWNoZXMgb3RoZXIgcGxhdGZvcm1zLlxyXG4gIC8vXHJcbiAgLy8gOS4gV2hlbiBwbGF0Zm9ybXMgdG91Y2ggdGhlIG5vZGUgbmFtZWQgXCJ1cHBlckJvdW5kXCIsIHlvdSBuZWVkIHRvIGNhbGwgdGhlIGZ1bmN0aW9uIFwicGxhdGZvcm1EZXN0cm95XCIgdG8gZGVzdHJveSB0aGUgcGxhdGZvcm0uXHJcbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbn1cclxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/migration/use_reversed_rotateTo.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9792280VDZGZbVqK/zVbuEU', 'use_reversed_rotateTo');
// migration/use_reversed_rotateTo.js

"use strict";

/*
 * This script is automatically generated by Cocos Creator and is only used for projects compatible with v2.1.0/v2.1.1/v2.2.1/v2.2.2 versions.
 * You do not need to manually add this script in any other project.
 * If you don't use cc.Action in your project, you can delete this script directly.
 * If your project is hosted in VCS such as git, submit this script together.
 *
 * 此脚本由 Cocos Creator 自动生成，仅用于兼容 v2.1.0/v2.1.1/v2.2.1/v2.2.2 版本的工程，
 * 你无需在任何其它项目中手动添加此脚本。
 * 如果你的项目中没用到 Action，可直接删除该脚本。
 * 如果你的项目有托管于 git 等版本库，请将此脚本一并上传。
 */
cc.RotateTo._reverse = true;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbWlncmF0aW9uXFx1c2VfcmV2ZXJzZWRfcm90YXRlVG8uanMiXSwibmFtZXMiOlsiY2MiLCJSb3RhdGVUbyIsIl9yZXZlcnNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQUEsRUFBRSxDQUFDQyxRQUFILENBQVlDLFFBQVosR0FBdUIsSUFBdkIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIFRoaXMgc2NyaXB0IGlzIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIGJ5IENvY29zIENyZWF0b3IgYW5kIGlzIG9ubHkgdXNlZCBmb3IgcHJvamVjdHMgY29tcGF0aWJsZSB3aXRoIHYyLjEuMC92Mi4xLjEvdjIuMi4xL3YyLjIuMiB2ZXJzaW9ucy5cclxuICogWW91IGRvIG5vdCBuZWVkIHRvIG1hbnVhbGx5IGFkZCB0aGlzIHNjcmlwdCBpbiBhbnkgb3RoZXIgcHJvamVjdC5cclxuICogSWYgeW91IGRvbid0IHVzZSBjYy5BY3Rpb24gaW4geW91ciBwcm9qZWN0LCB5b3UgY2FuIGRlbGV0ZSB0aGlzIHNjcmlwdCBkaXJlY3RseS5cclxuICogSWYgeW91ciBwcm9qZWN0IGlzIGhvc3RlZCBpbiBWQ1Mgc3VjaCBhcyBnaXQsIHN1Ym1pdCB0aGlzIHNjcmlwdCB0b2dldGhlci5cclxuICpcclxuICog5q2k6ISa5pys55SxIENvY29zIENyZWF0b3Ig6Ieq5Yqo55Sf5oiQ77yM5LuF55So5LqO5YW85a65IHYyLjEuMC92Mi4xLjEvdjIuMi4xL3YyLjIuMiDniYjmnKznmoTlt6XnqIvvvIxcclxuICog5L2g5peg6ZyA5Zyo5Lu75L2V5YW25a6D6aG555uu5Lit5omL5Yqo5re75Yqg5q2k6ISa5pys44CCXHJcbiAqIOWmguaenOS9oOeahOmhueebruS4reayoeeUqOWIsCBBY3Rpb27vvIzlj6/nm7TmjqXliKDpmaTor6XohJrmnKzjgIJcclxuICog5aaC5p6c5L2g55qE6aG555uu5pyJ5omY566h5LqOIGdpdCDnrYnniYjmnKzlupPvvIzor7flsIbmraTohJrmnKzkuIDlubbkuIrkvKDjgIJcclxuICovXHJcblxyXG5jYy5Sb3RhdGVUby5fcmV2ZXJzZSA9IHRydWU7XHJcbiJdfQ==
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/GameMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR2FtZU1nci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUNBQThCO0FBRXhCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXFDLDJCQUFZO0lBQWpEO1FBQUEscUVBZ1BDO1FBN09HLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBRzNCLFVBQUksR0FBWSxJQUFJLENBQUM7UUFHckIsZ0JBQVUsR0FBWSxJQUFJLENBQUM7UUFHM0IsZ0JBQVUsR0FBWSxJQUFJLENBQUM7UUFHM0IsWUFBTSxHQUFXLElBQUksQ0FBQztRQUd0QixlQUFTLEdBQVksSUFBSSxDQUFDO1FBRzFCLHFCQUFlLEdBQWdCLEVBQUUsQ0FBQztRQUdsQyxlQUFTLEdBQVksSUFBSSxDQUFDO1FBRzFCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFHMUIsZUFBUyxHQUFZLElBQUksQ0FBQztRQUcxQixzQkFBZ0IsR0FBWSxJQUFJLENBQUM7UUFHekIsYUFBTyxHQUFZLElBQUksQ0FBQztRQUdoQyxTQUFHLEdBQWlCLElBQUksQ0FBQztRQUVqQix1QkFBaUIsR0FBRyxDQUFDLEVBQUUsQ0FBQztRQUV4Qix3QkFBa0IsR0FBRyxFQUFFLENBQUM7UUFFeEIsaUJBQVcsR0FBRyxDQUFDLEVBQUUsQ0FBQztRQUVsQixrQkFBWSxHQUFHLENBQUMsQ0FBQztRQUVqQixtQkFBYSxHQUFzQixJQUFJLENBQUM7UUFFeEMsY0FBUSxHQUFZLEtBQUssQ0FBQztRQUUxQixlQUFTLEdBQVksS0FBSyxDQUFDO1FBRTNCLFdBQUssR0FBVyxDQUFDLENBQUM7UUFFbEIsa0JBQVksR0FBVyxDQUFDLENBQUM7UUFJekIsV0FBSyxHQUFZLEtBQUssQ0FBQztRQUV2QixnQkFBVSxHQUFXLEVBQUUsQ0FBQzs7SUFpTHBDLENBQUM7SUEvS0csd0JBQU0sR0FBTjtRQUVJLG1E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QUNHO0lBR3JCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7K0NBQ1M7SUFHM0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsrQ0FDUztJQUczQjtRQURDLFFBQVEsQ0FBQyxnQkFBTSxDQUFDOzJDQUNLO0lBR3RCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7OENBQ1E7SUFHMUI7UUFEQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7b0RBQ1k7SUFHbEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs4Q0FDUTtJQUcxQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzhDQUNRO0lBRzFCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7OENBQ1E7SUFHMUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztxREFDZTtJQUdqQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzRDQUNjO0lBR2hDO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUMsQ0FBQzt3Q0FDTDtJQXZDUixPQUFPO1FBRDNCLE9BQU87T0FDYSxPQUFPLENBZ1AzQjtJQUFELGNBQUM7Q0FoUEQsQUFnUEMsQ0FoUG9DLEVBQUUsQ0FBQyxTQUFTLEdBZ1BoRDtrQkFoUG9CLE9BQU8iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGxheWVyIGZyb20gXCIuL1BsYXllclwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lTWdyIGV4dGVuZHMgY2MuQ29tcG9uZW50IFxyXG57XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGJhY2tncm91bmQ6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgd2FsbDogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICB1cHBlckJvdW5kOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGxvd2VyQm91bmQ6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShQbGF5ZXIpXHJcbiAgICBwbGF5ZXI6IFBsYXllciA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwbGF0Zm9ybXM6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShbY2MuUHJlZmFiXSlcclxuICAgIHBsYXRmb3JtUHJlZmFiczogY2MuUHJlZmFiW10gPSBbXTtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHN0YXJ0SWNvbjogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwYXVzZUljb246IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgc2NvcmVOb2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGhpZ2hlc3RTY29yZU5vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBsaWZlQmFyOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuQXVkaW9DbGlwfSlcclxuICAgIGJnbTogY2MuQXVkaW9DbGlwID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIGJhY2tncm91bmRJbml0UG9zID0gLTcyO1xyXG5cclxuICAgIHByaXZhdGUgYmFja2dyb3VuZFJlc2V0UG9zID0gNTY7XHJcblxyXG4gICAgcHJpdmF0ZSB3YWxsSW5pdFBvcyA9IC0yMztcclxuXHJcbiAgICBwcml2YXRlIHdhbGxSZXNldFBvcyA9IDk7XHJcblxyXG4gICAgcHJpdmF0ZSBwaHlzaWNNYW5hZ2VyOiBjYy5QaHlzaWNzTWFuYWdlciA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBsZWZ0RG93bjogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIHByaXZhdGUgcmlnaHREb3duOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgcHJpdmF0ZSBzY29yZTogbnVtYmVyID0gMDtcclxuXHJcbiAgICBwcml2YXRlIGhpZ2hlc3RTY29yZTogbnVtYmVyID0gMDtcclxuXHJcbiAgICBwcml2YXRlIHNjb3JlQ291bnQ7XHJcblxyXG4gICAgcHJpdmF0ZSBwYXVzZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIHByaXZhdGUgcGxheWVyTGlmZTogbnVtYmVyID0gMTI7XHJcblxyXG4gICAgb25Mb2FkKClcclxuICAgIHtcclxuICAgICAgICAvLyA9PT09PT09PT09PT09PT09PT09PT0gVE9ETyA9PT09PT09PT09PT09PT09PT09PT1cclxuICAgICAgICAvLyAxLiBFbmFibGUgcGh5c2ljcyBtYW5hZ2VyIFxyXG4gICAgICAgIC8vIDIuIFNldCBwaHlzaWNzIGdyYXZpdHkgdG8gKDAsIC0yMDApXHJcblx0XHJcbiAgICAgICAgY2MuZGlyZWN0b3IuZ2V0UGh5c2ljc01hbmFnZXIoKS5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICBjYy5kaXJlY3Rvci5nZXRQaHlzaWNzTWFuYWdlcigpLmdyYXZpdHkgPSBjYy52MiAoMCwgLTIwMCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQub24oY2MuU3lzdGVtRXZlbnQuRXZlbnRUeXBlLktFWV9ET1dOLCB0aGlzLm9uS2V5RG93biwgdGhpcyk7XHJcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQub24oY2MuU3lzdGVtRXZlbnQuRXZlbnRUeXBlLktFWV9VUCwgdGhpcy5vbktleVVwLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydCAoKSB7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBpZHggPSB0aGlzLnJhbmRvbUNob29zZVBsYXRmb3JtKCk7XHJcbiAgICAgICAgICAgIGxldCBwbGF0Zm9ybSA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGxhdGZvcm1QcmVmYWJzW2lkeF0pO1xyXG4gICAgICAgICAgICBwbGF0Zm9ybS5wYXJlbnQgPSB0aGlzLnBsYXRmb3JtcztcclxuICAgICAgICAgICAgcGxhdGZvcm0ucG9zaXRpb24gPSBjYy52MigtMTQ0K01hdGgucmFuZG9tKCkqMjg4LCAtMTkwKTtcclxuICAgICAgICB9LCAxLjIpO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZUhpZ2hlc3RTY29yZSgwKTtcclxuICAgICAgICB0aGlzLnNjb3JlQ291bnQgPSAoKT0+eyB0aGlzLnVwZGF0ZVNjb3JlKHRoaXMuc2NvcmUrMSk7IH07XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKGR0KVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMud2FsbC55ID49IHRoaXMud2FsbFJlc2V0UG9zKVxyXG4gICAgICAgICAgICB0aGlzLndhbGwueSA9IHRoaXMud2FsbEluaXRQb3M7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kLnkgKz0gMC4yO1xyXG4gICAgICAgIGlmKHRoaXMuYmFja2dyb3VuZC55ID49IHRoaXMuYmFja2dyb3VuZFJlc2V0UG9zKVxyXG4gICAgICAgICAgICB0aGlzLmJhY2tncm91bmQueSA9IHRoaXMuYmFja2dyb3VuZEluaXRQb3M7XHJcbiAgICB9XHJcblxyXG4gICAgb25LZXlEb3duKGV2ZW50KVxyXG4gICAge1xyXG4gICAgICAgIHN3aXRjaChldmVudC5rZXlDb2RlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2FzZSBjYy5tYWNyby5LRVkubGVmdDpcclxuICAgICAgICAgICAgICAgIHRoaXMubGVmdERvd24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIucGxheWVyTW92ZSgtMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBjYy5tYWNyby5LRVkucmlnaHQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJpZ2h0RG93biA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5wbGF5ZXJNb3ZlKDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLmE6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVTdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLmQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVPdmVyKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25LZXlVcChldmVudClcclxuICAgIHtcclxuICAgICAgICBzd2l0Y2goZXZlbnQua2V5Q29kZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLmxlZnQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxlZnREb3duID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnJpZ2h0RG93bilcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5wbGF5ZXJNb3ZlKDEpO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLnBsYXllck1vdmUoMCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBjYy5tYWNyby5LRVkucmlnaHQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJpZ2h0RG93biA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5sZWZ0RG93bilcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5wbGF5ZXJNb3ZlKC0xKTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5wbGF5ZXJNb3ZlKDApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJhbmRvbUNob29zZVBsYXRmb3JtKClcclxuICAgIHtcclxuICAgICAgICBsZXQgcmFuZCA9IE1hdGgucmFuZG9tKCk7XHJcblxyXG4gICAgICAgIC8vMDogbm9ybWFsLCAxOiBuYWlscywgMjogZmFrZSwgMzogY29udmV5b3IsIDQ6IHRyYW1wb2xpbmVcclxuICAgICAgICBsZXQgcHJvYiA9IFs2LCAyLCAyLCAzLCAyXTtcclxuICAgICAgICBsZXQgc3VtID0gcHJvYi5yZWR1Y2UoKGEsYik9PmErYik7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMTsgaSA8IHByb2IubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHByb2JbaV0gKz0gcHJvYltpLTFdO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBwcm9iLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHJvYltpXSAvPSBzdW07XHJcbiAgICAgICAgICAgIGlmKHJhbmQgPD0gcHJvYltpXSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVIaWdoZXN0U2NvcmUoc2NvcmU6IG51bWJlcilcclxuICAgIHtcclxuICAgICAgICB0aGlzLmhpZ2hlc3RTY29yZSA9IHNjb3JlO1xyXG4gICAgICAgIHRoaXMuaGlnaGVzdFNjb3JlTm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IChBcnJheSg0KS5qb2luKFwiMFwiKSArIHRoaXMuaGlnaGVzdFNjb3JlLnRvU3RyaW5nKCkpLnNsaWNlKC00KTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVTY29yZShzY29yZTogbnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuc2NvcmUgPSBzY29yZTtcclxuICAgICAgICB0aGlzLnNjb3JlTm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IChBcnJheSg0KS5qb2luKFwiMFwiKSArIHRoaXMuc2NvcmUudG9TdHJpbmcoKSkuc2xpY2UoLTQpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUxpZmUobnVtOiBudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJMaWZlICs9IG51bTtcclxuICAgICAgICB0aGlzLnBsYXllckxpZmUgPSBNYXRoLm1pbihNYXRoLm1heCh0aGlzLnBsYXllckxpZmUsIDApLCAxMik7XHJcbiAgICAgICAgdGhpcy5saWZlQmFyLndpZHRoID0gdGhpcy5wbGF5ZXJMaWZlICogOFxyXG4gICAgICAgIGlmKHRoaXMucGxheWVyTGlmZSA9PSAwKVxyXG4gICAgICAgICAgICB0aGlzLmdhbWVPdmVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2FtZVN0YXJ0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnN0YXJ0SWNvbi5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5zY29yZSA+IHRoaXMuaGlnaGVzdFNjb3JlKVxyXG4gICAgICAgIHRoaXMudXBkYXRlSGlnaGVzdFNjb3JlKHRoaXMuc2NvcmUpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2NvcmUoMSk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVMaWZlKDEyKTtcclxuXHJcbiAgICAgICAgbGV0IHJlYm9yblBvcyA9IGNjLnYyKCk7XHJcbiAgICAgICAgdGhpcy5wbGF0Zm9ybXMuY2hpbGRyZW4uZm9yRWFjaCgocGxhdGZvcm0pID0+IHtcclxuICAgICAgICAgICAgcGxhdGZvcm0uZ2V0Q29tcG9uZW50KFwiUGxhdGZvcm1cIikucmVzZXQoKTtcclxuICAgICAgICAgICAgaWYocGxhdGZvcm0ubmFtZSAhPSAnTmFpbHMnKVxyXG4gICAgICAgICAgICAgICAgcmVib3JuUG9zID0gcGxhdGZvcm0ucG9zaXRpb24uYWRkKGNjLnYyKDAsIDUwKSk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgdGhpcy5wbGF5ZXIucmVib3JuKHJlYm9yblBvcyk7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5zY29yZUNvdW50LCAyKTtcclxuXHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheU11c2ljKHRoaXMuYmdtLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBnYW1lUGF1c2UoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMucGF1c2UpXHJcbiAgICAgICAgICAgIHRoaXMucGF1c2UgPSBmYWxzZTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMucGF1c2UgPSB0cnVlO1xyXG4gICAgICAgIGlmKHRoaXMucGF1c2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnBhdXNlSWNvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICAgICAgY2MuZ2FtZS5wYXVzZSgpO1xyXG4gICAgICAgICAgICB9LCAwLjEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnBhdXNlSWNvbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgY2MuZ2FtZS5yZXN1bWUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2FtZU92ZXIoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMucGxheWVyLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMuc2NvcmVDb3VudCk7XHJcblxyXG4gICAgICAgIHRoaXMuc3RhcnRJY29uLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnN0b3BNdXNpYygpO1xyXG4gICAgfVxyXG5cclxuICAgIGdhbWVFbmQoKVxyXG4gICAge1xyXG4gICAgICAgIGNjLmdhbWUuZW5kKCk7XHJcbiAgICB9XHJcbn1cclxuIl19
//------QC-SOURCE-SPLIT------
