import { Utils } from "./Source/GuardUtils/Utils.js";
import { Gen } from "./Source/GuardUtils/Gen.js";
export class Guard{
    constructor(guards, inputs, schema, obj){
        this.obj=obj;
        this.inputs=inputs;
        this.guards=guards;
        this.schema=schema;
        this.utils = Utils(guards);
    }

    guard(inputs, guard){
        //we are trying to execute a particular function mapped
        //to an input context
    }
}

var guards = ['isStr', 'isInt', 'isArr', 'isIntArr', 'isEnc', 'isEncArr', 'isStrArr', 'isObj', 'isObjArr']
var utils = new Utils(guards)
var gen = new Gen(guards)
var guardSchema = gen.Guard(4, 4)
utils.verify(guardSchema)
//utils.log(guardSchema)
console.log(utils.functions)
console.log(utils.defaultPaths)

utils.reverify(guardSchema)
console.log(utils.functions)
console.log(utils.defaultPaths)

// new Guard(guards, )