
import { _decorator, Component, Node, Prefab, instantiate, CCInteger } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = GameManager
 * DateTime = Tue Jan 25 2022 13:52:11 GMT+0800 (中国标准时间)
 * Author = zhangmuzhi
 * FileBasename = GameManager.ts
 * FileBasenameNoExtension = GameManager
 * URL = db://assets/srczip/GameManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
enum BlockType {
    BT_NODE,
    BT_STONE
}
@ccclass('GameManager')
export class GameManager extends Component {
    @property({ type: Prefab })
    public cubePrfb: Prefab | null = null;
    @property
    public roadLength = 50;
    private _road: BlockType[] = [];
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    start() {
        // [3]
        this.generateRoad();
    }
    generateRoad() {
        this.node.removeAllChildren();
        this._road = [];
        this._road.push(BlockType.BT_STONE);
        for(let i = 1;i < this.roadLength;i++){
            if(this._road[i-1] === BlockType.BT_NODE){
                this._road.push(BlockType.BT_STONE)
            }else{
                this._road.push(Math.floor(Math.random()*2));
            }
        }
        for(let j = 0; j < this._road.length;j++){
            let block:Node = this.spawnBlockByType(this._road[j]);
            if(block){
                this.node.addChild(block);
                block.setPosition(j,-1.5,0);
            }
        }
    }
    spawnBlockByType(type:BlockType){
        if(!this.cubePrfb){
            return null
        };
        let block:Node | null = null;
        switch(type){
            case BlockType.BT_STONE:
                block = instantiate(this.cubePrfb);
                break
        }
        return block;
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
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/zh/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/zh/scripting/life-cycle-callbacks.html
 */
