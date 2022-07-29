import { Guards } from "../Guards.js"
import * as util from "node:util"
import * as assert from "node:assert"








export class GuardUtils{

    constructor(guardFuncBag){
        this.guardFuncBag=guardFuncBag;
        this.guards = new Guards();
        this.rg = new RandGen();
        this.is = new Issers();
        this.get = new Getters();
        this.new = new Blocks();
        this.defaultPaths=[]
        this.gfBag = guardFuncBag;
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