import Player from "./Player";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Platform extends cc.Component {
  @property({ type: cc.AudioClip })
  soundEffect: cc.AudioClip = null;

  @property(Player)
  player: Player = null;

  protected isTouched: boolean = false;

  private anim: cc.Animation = null;

  private animState: cc.AnimationState = null;

  private highestPos: number = 118;

  private moveSpeed: number = 100;

  private springVelocity: number = 320;

  onLoad(){

      cc.director.getPhysicsManager().enabled = true;
          
  }

  start() {
    this.anim = this.getComponent(cc.Animation);

    if (this.node.name == "Conveyor") {
      this.node.scaleX = Math.random() >= 0.5 ? 1 : -1;
      this.moveSpeed *= this.node.scaleX;
    }
  }

  reset() {
    this.isTouched = false;
  }

  update(dt) {
    if (
      this.node.y - this.highestPos >= 0 &&
      this.node.y - this.highestPos < 100
    )
      this.getComponent(cc.PhysicsBoxCollider).enabled = false;
    else this.getComponent(cc.PhysicsBoxCollider).enabled = true;
  }

  playAnim() {
    if (this.anim) this.animState = this.anim.play();
  }

  getAnimState() {
    if (this.animState) return this.animState;
  }

  platformDestroy() {
    cc.log(this.node.name + " Platform destory.");
    this.node.destroy();
  }

  // ===================== TODO =====================
  // 1. In the physics lecture, we know that Cocos Creator
  //    provides four contact callbacks. You need to use callbacks to
  //    design different behaviors for different platforms.
  
    onBeginContact(contact, selfCollider, otherCollider)    {

      if(otherCollider.node.name == "player")
      {
        // console.log(contact.getWorldManifold().normal.Vec2.)
        if(this.isTouched==false){
          cc.audioEngine.playEffect(this.soundEffect,false);
          this.isTouched=true;

          if(this.node.name=="Nails"){
            otherCollider.node.getComponent("Player").playerDamage();
          }
          else {
            otherCollider.node.getComponent("Player").playerRecover();
          }
        }
        
        if(this.node.name=="Fake"){

          this.getAnimState();
          this.playAnim();

          this.schedule(function() {
            contact.disabledonce = true;
          }, 0.2);
        }

        else if(this.node.name=="Trampoline"){
          this.isTouched=false;
          this.getAnimState();
          this.playAnim();
          otherCollider.getComponent(cc.RigidBody).linearVelocity=cc.v2(0,this.springVelocity);
        }
      }
    }

    onPreSolve(contact, selfCollider, otherCollider){

      if(otherCollider.node.name == "player")
      {
        if(this.node.name=="Conveyor"){
          otherCollider.getComponent(cc.RigidBody).linearVelocity=cc.v2(this.moveSpeed,0);
        }
      }
    }

    
    onEndContact(contact, selfCollider, otherCollider){
      if(this.node.name=="Conveyor"){
        otherCollider.getComponent(cc.RigidBody).linearVelocity=contact.moveSpeed;
      }
      // contact.enabled = true;
    }
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
