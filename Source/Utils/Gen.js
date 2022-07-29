export class Gen{
    constructor(h, w, utils){
        this.gen = this
        this.guardFuncBag = utils.guardFuncBag
        this.utils = utils
        this.functions = []
        this.defaultPaths = []
        this.guard=this.Guard(h, w)
        this.Class = this.Class(this.functions)
    }
    
    Guard(h, w){
        var guard=[]
        for(var i = 0; i<w; i++){
            guard.push(this._Guard(h, this.utils.rand.Range(1, w), ''))
        }
        this.gen.Class(this.functions)
        return guard
    }

    _Guard(h, w, guardFuncStr){
        var block;
        if(h==0){
                //if we have a function string context we simply return it
            if(this.utils.rand.Mod10()){
                var block = this.utils.new.TerminalTypeBlockObj(guardFuncStr)
                this.functions.push(block[this.utils.get.GuardKey(block)])
                return block
            }else{
                var block = this.utils.new.TerminalDefaultBlockObj(guardFuncStr)
                var newGuardFuncStr=this.utils.get.GuardKey(block)
                this.functions.push(block[this.utils.get.GuardKey(block)])
                this.defaultPaths.push({[guardFuncStr+newGuardFuncStr]:block['~DEFAULT~']})
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
                    block[this.utils.get.GuardKey(block)].push(this._Guard(h-1, this.utils.rand.Range(1, w), guardFuncStr))
                }
            }else{
                block=this.utils.new.RecursiveTypeBlockObj()
                guardFuncStr=guardFuncStr+this.utils.get.GuardKey(block)
                for(var i=0; i<w;i++){
                    block[this.utils.get.GuardKey(block)].push(this._Guard(h-1, this.utils.rand.Range(1, w), guardFuncStr))
                }
            }
        }
        //trailing construction case
        return block;
    }


    Class(functions){
        var obj = `\tclass Whatever{\n`
        functions.forEach(func => {
            obj+=`\t\t${func}(guardInputs){\n
                // assert.deepEqual(guardInputs, this.expectedResult)\n
                // console.log(func+"("+ JSON.stringify(this.expectedResult)+')', 'PASSES')\n
            \n
            \t}\n`
        });
        
        obj+=`\t}`
            
        return obj
    }
}