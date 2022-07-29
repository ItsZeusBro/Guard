import { GuardUtils } from "./GuardUtils.js"
export class GuardGen{
    constructor(h, w, guardFuncBag){
        this.functions=[]
        this.defaultPaths=[]
        this.h=h
        this.w=w
        this.gu=new GuardUtils(guardFuncBag)
        this.ggen = this.gen(h, w)
    }
    
    gen(h, w){
        var guard=[]
        for(var i = 0; i<w; i++){
            guard.push(this._gen(h, this.gu.rg.randRange(1, w), ''))
        }
        return guard
    }

    _gen(h, w, guardFuncStr){
        var block;
        if(h==0){
                //if we have a function string context we simply return it
            if(this.gu.rg.randMod10()){
                var block = this.gu.newTerminalTypeBlockObj(guardFuncStr)
                this.functions.push(block[this.gu.getGuardKey(block)])
                return block
            }else{
                var block = this.gu.newTerminalDefaultBlockObj(guardFuncStr)
                this.functions.push(block[this.gu.getGuardKey(block)])
                this.defaultPaths.push({[this.gu.getGuardKey(block)]:block['~DEFAULT~']})
                return block
            }
        }else{
            if(this.gu.rg.randMod10()){
                //if we have a default/function context we simply build and return it
                block=this.gu.newRecursiveDefaultBlockObj()
                var newGuardFuncStr=this.gu.getGuardKey(block)
                this.defaultPaths.push({[guardFuncStr+newGuardFuncStr]:block['~DEFAULT~']})
                guardFuncStr=guardFuncStr+newGuardFuncStr
                for(var i=0; i<w;i++){
                    block[this.gu.getGuardKey(block)].push(this._gen(h-1, this.gu.rg.randRange(1, w), guardFuncStr))
                }
            }else{
                block=this.gu.newRecursiveTypeBlockObj()
                guardFuncStr=guardFuncStr+this.gu.getGuardKey(block)
                for(var i=0; i<w;i++){
                    block[this.gu.getGuardKey(block)].push(this._gen(h-1, this.gu.rg.randRange(1, w), guardFuncStr))
                }
            }
        }
        //trailing construction case
        return block;
    }
}