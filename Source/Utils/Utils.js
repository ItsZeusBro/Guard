import { Guards } from "./Guards.js"
import { Is } from "./Is.js"
import { Get } from "./Get.js"
import { Rand } from "./Rand.js"
import { New } from "./New.js"
import * as util from "node:util"
import * as assert from "node:assert"
import { Gen } from "./Gen.js"

export class Utils{

    constructor(guardFuncBag, gen=false){
        this.guardFuncBag=guardFuncBag;
        this.utils=this
        this.guards = new Guards();
        this.is = new Is(guardFuncBag);
        this.get = new Get(guardFuncBag);
        this.new = new New(guardFuncBag)
        this.rand = new Rand();
        this.functions=[]
        this.defaultPaths=[]
    }

    log(obj){
        if(obj){
            console.log(util.inspect(obj, false, null, true))
        }
    }
    execute(inputs){
        
    }
    reverify(guard, guardFuncStr=""){
        this.functions=[]
        this.defaultPaths=[]
        this.verify(guard, guardFuncStr)
    }
    verify(guard, guardFuncStr=""){
        for(var i = 0; i<guard.length; i++){
            this._verify(guard[i], guardFuncStr)
        }
        new Gen(this.guardFuncBag)
    }
    _verify(guard, guardFuncStr){
        if(this.is.TerminalBlockObj(guard)){
            guardFuncStr=guardFuncStr+this.get.GuardKey(guard);
            this.functions.push(guard[this.utils.get.GuardKey(guard)])
            this.defaultPaths.push({[this.utils.get.GuardKey(guard)]:guard['~DEFAULT~']})
            assert.equal(guardFuncStr, this.get.TerminalString(guard))
            return
        }else if(this.is.RecursiveBlockObj(guard)){
            guardFuncStr=guardFuncStr+this.get.GuardKey(guard);
            this.verify(this.get.NextRecursiveBlockObj(guard), guardFuncStr)
        }
        
        return
    }

    passGuard(func, v){
        if(!this.is.Guard(func)){return false}
        func='this.guards.'+func
        func = this.new.Params(func, v)
        if(eval(func)){
            return true
        }else{
            return false
        }
    }    
}