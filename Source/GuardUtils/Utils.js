import { Guards } from "../Guards.js"
import { Is } from "./Is.js"
import { Get } from "./Get.js"
import { Rand } from "./Rand.js"
import { New } from "./New.js"
import * as util from "node:util"
import * as assert from "node:assert"

export class Utils{

    constructor(guardFuncBag){
        this.guardFuncBag=guardFuncBag;
        this.guards = new Guards();
        this.is = new Is(guardFuncBag);
        this.get = new Get(guardFuncBag);
        this.new = new New(guardFuncBag)
        this.rand = new Rand();
        this.defaultPaths=[]
    }

    log(obj){
        if(obj){
            console.log(util.inspect(obj, false, null, true))
        }
    }

    verify(guard){
        for(var i = 0; i<guard.length; i++){
            var guardFuncStr=guardFuncStr+this.get.GuardKey(guard[i]);
            this._verify(guard[i], guardFuncStr)
        }
    }
    _verify(guard, guardFuncStr){
        for(var i = 0; i<guard.length; i++){
            if(this.is.TerminalBlockObj(guard[i])){
                if(this.is.DefaultBlock(guard[i])){

                }
                guardFuncStr=guardFuncStr+this.get.GuardKey(guard[i])
                assert.equal(guardFuncStr, this.get.TerminalString(guard[i]))
                return
            }else if(this.is.RecursiveBlockObj(guard[i])){
                guardFuncStr=guardFuncStr+this.get.GuardKey(guard[i])
                this._verify(this.get.NextRecursiveBlockObj(guard[i]), guardFuncStr)
            }
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