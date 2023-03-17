
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