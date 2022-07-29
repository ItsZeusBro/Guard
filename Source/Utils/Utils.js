import { Guards } from "./Guards.js"
import { Is } from "./Is.js"
import { Get } from "./Get.js"
import { Rand } from "./Rand.js"
import { New } from "./New.js"
import * as util from "node:util"
import * as assert from "node:assert"
import { Gen } from "./Gen.js"

export class Utils{

    constructor(guardFuncBag, h, w){
        this.functions=[]
        this.guardFuncBag=guardFuncBag;
        this.utils=this
        this.guards = new Guards();
        this.rand = new Rand();
        this.is = new Is(this);
        this.get = new Get(this);
        this.new = new New(this)
        this.gen = new Gen(h, w, this)
        this.defaultPaths=this.gen.defaultPaths
        this.verify(this.gen.guard)
        this.verifyFunctions(this.functions, this.gen.functions)
    }
    verifyFunctions(funcs1, funcs2){
        console.log(funcs1, funcs2)
        for(var i = 0; i< funcs1.length; i++){
            assert.equal(funcs1[i], funcs1[i])
        }
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
            //this.defaultPaths.push({[this.utils.get.GuardKey(guard[i])]:guard[i]['~DEFAULT~']})
            this._verify(guard[i], guardFuncStr)
        }
    }
    _verify(guard, guardFuncStr){
        if(this.is.TerminalBlockObj(guard)){
            guardFuncStr=guardFuncStr+this.utils.get.GuardKey(guard);
            this.functions.push(guardFuncStr)
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