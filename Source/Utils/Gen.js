export class Gen{
    constructor(h, w, utils){
        this.gen = this
        this.guardFuncBag = utils.guardFuncBag
        this.utils = utils
        this.guard=this.Guard(h, w)
        this.Class = this.Class(this.functions)
    }
    
    Guard(h, w){

    }

    _Guard(h, w, guardFuncStr){
       
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