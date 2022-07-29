import { Utils } from "./Source/Utils/Utils.js";
import { Gen } from "./Source/Utils/Gen.js";
const GUARDS=['isStr', 'isInt', 'isArr', 'isIntArr', 'isEnc', 'isEncArr', 'isStrArr', 'isObj', 'isObjArr']
export class Guard{
    constructor(inputs, guard, obj, guards=GUARDS){
        this.obj=obj;
        this.inputs=inputs;
        this.guards=guards;
        this.guard=guard;
        this.utils = Utils(guards);
    }

    guard(inputs, guard){
        //we are trying to execute a particular function mapped
        //to an input context
        this.utils.verify(guard)

    }
}


var utils = new Utils(GUARDS, 4, 4)