import { GuardUtils } from "./Utils.js"
export class Gen{
    constructor(h, w, guardFuncBag){
        this.functions=[]
        this.guardFuncBag=guardFuncBag
        this.defaultPaths=[]
        this.h=h
        this.w=w
        this.utils=new GuardUtils(guardFuncBag)
        this.ggen = this.gen(h, w)
    }
    
    gen(h, w){
        var guard=[]
        for(var i = 0; i<w; i++){
            guard.push(this._gen(h, this.utils.rand.Range(1, w), ''))
        }
        return guard
    }

    _gen(h, w, guardFuncStr){
        var block;
        if(h==0){
                //if we have a function string context we simply return it
            if(this.utils.rand.Mod10()){
                var block = this.utils.new.TerminalTypeBlockObj(guardFuncStr)
                this.functions.push(block[this.utils.get.GuardKey(block)])
                return block
            }else{
                var block = this.utils.new.TerminalDefaultBlockObj(guardFuncStr)
                this.functions.push(block[this.utils.get.GuardKey(block)])
                this.defaultPaths.push({[this.utils.get.GuardKey(block)]:block['~DEFAULT~']})
                return block
            }
        }else{
            if(this.utils.rand.Mod10()){
                //if we have a default/function context we simply build and return it
                block=this.utils.new.RecursiveDefaultBlockObj()
                var newGuardFuncStr=this.utils.get.GuardKey(block)
                this.defaultPaths.push({[guardFuncStr+newGuardFuncStr]:block['~DEFAULT~']})
                guardFuncStr=guardFuncStr+newGuardFuncStr
                for(var i=0; i<w;i++){
                    block[this.utils.get.GuardKey(block)].push(this._gen(h-1, this.utils.rand.Range(1, w), guardFuncStr))
                }
            }else{
                block=this.utils.new.RecursiveTypeBlockObj()
                guardFuncStr=guardFuncStr+this.utils.get.GuardKey(block)
                for(var i=0; i<w;i++){
                    block[this.utils.get.GuardKey(block)].push(this._gen(h-1, this.utils.rand.Range(1, w), guardFuncStr))
                }
            }
        }
        //trailing construction case
        return block;
    }
}