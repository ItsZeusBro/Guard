import { GuardUtils } from "./GuardUtils.js"
export class GuardGen{
    constructor(h, w, guardFuncBag){
        this.functions=[]
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
                var terminal = this.gu.newTerminalTypeBlockObj(guardFuncStr)

                this.functions.push(terminal[this.gu.getGuardKey(terminal)])
                return terminal
            }else{
                var terminal = this.gu.newTerminalDefaultBlockObj(guardFuncStr)
                this.functions.push(terminal[this.gu.getGuardKey(terminal)])
                return terminal
            }
        }else{
            if(this.gu.rg.randMod10()){
                //if we have a default/function context we simply build and return it
                block=this.gu.newRecursiveDefaultBlockObj()
                guardFuncStr=guardFuncStr+this.gu.getGuardKey(block)
                for(var i=0; i<w;i++){
                    // console.log('HERE', this.gu.getGuardKey(block))
                    block[this.gu.getGuardKey(block)].push(this._gen(h-1, this.gu.rg.randRange(1, w), guardFuncStr))
                }
            }else{
                block=this.gu.newRecursiveTypeBlockObj()
                guardFuncStr=guardFuncStr+this.gu.getGuardKey(block)
                //console.log(block)
                for(var i=0; i<w;i++){
                    // console.log('HERE AGAIN', this.gu.getGuardKey(block))
                    block[this.gu.getGuardKey(block)].push(this._gen(h-1, this.gu.rg.randRange(1, w), guardFuncStr))
                }
            }
        }
        //trailing construction case
        return block;
    }
}