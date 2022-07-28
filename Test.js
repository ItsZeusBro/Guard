import {Guard} from './Guard.js'
import {Guards} from './Source/Guards.js'
import * as assert from "node:assert"
import * as util from "node:util"








//var gu = new GuardUtils(guardFuncBag)

new TestUtils(guardFuncBag)


class GuardGen{
    constructor(h, w, guardFuncBag){
        this.tests=[]
        this.h=h
        this.w=w
        this.guards=new Guards()
        this.rg=new RandGen()
        this.gu=new GuardUtils(guardFuncBag)
        this.ggen = this.gen(h, w, "")
    }
    
    gen(h, w, guardFuncStr){
        var guard=[]
        for(var i = 0; i<w; i++){
            guard.push(this._gen(h, this.rg.randRange(1, w), guardFuncStr))
        }
        return guard
    }

    _gen(h, w, guardFuncStr){
        var block;
        if(h==0){
                //if we have a function string context we simply return it
            if(this.rg.randMod10()){
                return this.gu.newTerminalTypeBlockObj(guardFuncStr)
            }else{
                return this.gu.newTerminalDefaultBlockObj(guardFuncStr)
            }
        }else{
            if(this.rg.randMod10()){
                //if we have a default/function context we simply build and return it
                block=this.gu.newRecursiveDefaultBlockObj(guardFuncStr)
                for(var i=0; i<w;i++){
                    block[key].push(this._gen(h-1, this.rg.randRange(1, w), guardFuncStr))
                }
            }else{
                block=this.gu.newRecursiveTypeBlockObj(guardFuncStr)
                for(var i=0; i<w;i++){
                    block[key].push(this._gen(h-1, this.rg.randRange(1, w), guardFuncStr))
                }
            }
        }
        //trailing construction case
        return block;
    }
}

// var h=3;
// var w=3;
// // var ggen = new GuardGen(h, w, guardFuncBag).ggen
// var guardFuncBag=['isStr', 'isInt', 'isArr', 'isIntArr', 'isEnc', 'isEncArr', 'isStrArr', 'isObj', 'isObjArr']

// var gu = new GuardUtils(guardFuncBag)

