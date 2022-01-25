
// import { _decorator, Component, Node,systemEvent, Vec3, SystemEvent, EventMouse } from 'cc';
import { _decorator, Component, Vec3, systemEvent, SystemEvent, EventMouse, Animation } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = playercon
 * DateTime = Wed Jan 19 2022 10:50:09 GMT+0800 (中国标准时间)
 * Author = zhangmuzhi
 * FileBasename = playercon.ts
 * FileBasenameNoExtension = playercon
 * URL = db://assets/srczip/playercon.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('playercon')
export class playercon extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    private _starJump:boolean = false;
    private _curJumpTime:number = 0;
    private _jumpStep:number = 0;
    private _jumpTime:number = 0.1;
    private _curJumpSpeed:number = 0;
    private _curpos:Vec3 = new Vec3();
    private _deltaPos:Vec3 = new Vec3(0,0,0);
    private _targetPos: Vec3 = new Vec3();
    @property({type: Animation})
    public BodyAnim:Animation | null = null;




    start () {
        // [3]

        // systemEvent.on(SystemEvent.EventType.MOUSE_MOVE,this.onMouseUp,this);
        systemEvent.on(SystemEvent.EventType.MOUSE_UP, this.onMouseUp, this);
    }
    onMouseUp(event: EventMouse){
        var me = this;
        if(event.getButton() === 0){
            me.jumpByStep(1)
        }else if(event.getButton() === 2){
            me.jumpByStep(2)
        }
    }
    jumpByStep(step:number){
        if(this._starJump)return;
        this._starJump = true;
        this._jumpStep = step;
        this._curJumpTime = 0;
        this._curJumpTime = this._jumpStep/this._jumpTime;
        if (this.BodyAnim) {
            if (step === 1) {
                this.BodyAnim.play('oneStep');
            } else if (step === 2) {
                this.BodyAnim.play('twoStep');
            }
        }
        this.node.getPosition(this._curpos);
        Vec3.add(this._targetPos,this._curpos,new Vec3(this._jumpStep,0,0))
    }
    update(deltaTime :number){
        if(this._starJump){
            this._curJumpTime += deltaTime;
            if(this._curJumpTime > this._jumpTime){
                this.node.setPosition(this._targetPos);
                this._starJump = false;
            }

        }else{
            this.node.getPosition(this._curpos);
            this._deltaPos.x = this._curJumpTime * deltaTime;
            // Vec3.add(this._curpos,this._curpos,this._deltaPos);
            this.node.setPosition(this._curpos)

        }



    }
    // update (deltaTime: number) {
    //     // [4]
    // }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/en/scripting/life-cycle-callbacks.html
 */
