export class GuardUtils{
    constructor(guardFuncBag){
        this.guardFuncBag=guardFuncBag
        this.guards = new Guards()
        this.rg = new RandGen()
        this.gfBag = guardFuncBag
    }

    log(obj){
        if(obj){
            console.log(util.inspect(obj, false, null, true))
        }
    }
    walk(guard){
        if(!this.guards.isArr(guard)){throw Error('guard schema has no base array')}
        var arr = []

        return arr
    }

    _walk(guard, arr){
        if(!this.guards.isArr(guard)){throw Error('guard schema has no base array')}
        
        return arr
    }

    getDefaultBlockObj(guardObj){
        
    }

    isTerminalBlockObj(guardObj){
        if(this.isTerminalDefaultBlockObj(guardObj)||this.isTerminalTypeBlockObj(guardObj)){
            return true;
        }
    }
    
    isRecursiveBlockObj(guardObj){
        if(this.isRecursiveDefaultBlockObj(guardObj)||this.isRecursiveTypeBlockObj(guardObj)){
            return true;
        }
    }

    isRecursiveTypeBlockObj(guardObj){
        if((this.guardFuncBag.includes(Object.keys(guardObj)[0])== true) && Object.keys(guardObj).length==1){
            return true;
        }
    }

    isRecursiveDefaultBlockObj(guardObj){
        var defaultPresent;
        var recursivePresent;
        for(var i = 0; i<Object.keys(guardObj).length; i++){
            if(this.guardFuncBag.includes(Object.keys(guardObj)[i])){recursivePresent=true}
        }
        if(Object.keys(guardObj).includes('~DEFAULT~')){defaultPresent=true}
        if(defaultPresent&&recursivePresent){
            return true;
        }
    }

    isTerminalTypeBlockObj(guardObj){
        if(Object.keys(guardObj).length==1){
            var arr = guardObj[Object.keys(guardObj)[0]].split('is')
            var guard = 'is'+arr.pop()
            if(
                this.guardFuncBag.includes(Object.keys(guardObj)[0])
                &&
                this.guardFuncBag.includes(guard)
            ){
                return true
            }
        }
    }

    isTerminalDefaultBlockObj(guardObj){
        if(Object.keys(guardObj).length==2){
            var defaultPresent;
            var recursivePresent;
            var recursiveIndex;
            for(var i = 0; i<Object.keys(guardObj).length; i++){
                try{
                    var arr = guardObj[Object.keys(guardObj)[i]].split('is')
                    var guard = 'is'+arr.pop()
                    if(this.guardFuncBag.includes(guard)){
                        recursivePresent=true
                        recursiveIndex=i
                    }
                }catch{
                    
                }

            }
            if(Object.keys(guardObj).includes('~DEFAULT~')){defaultPresent=true}

            var arr = guardObj[Object.keys(guardObj)[recursiveIndex]].split('is')
            var guard = 'is'+arr.pop()
            if(
                this.guardFuncBag.includes(Object.keys(guardObj)[recursiveIndex])
                &&
                this.guardFuncBag.includes(guard)
                &&
                defaultPresent
            ){
                return true
            }
        }
    }

    newGuardFunc(){
        return this.rg.randSelection(this.gfBag)
    }

    newRecursiveTypeBlockObj(guardFuncStr){
        if(!guardFuncStr){
            var newGuardFuncStr = this.newGuardFunc()
            return {
                [newGuardFuncStr]:[]
            }
        }else{
            var newGuardFuncStr = this.newGuardFunc()
            guardFuncStr+=newGuardFuncStr
            return {
                [newGuardFuncStr]:[]
            }
        }
    } 

    newRecursiveDefaultBlockObj(guardFuncStr){
        if(!guardFuncStr){

            var newGuardFuncStr = this.newGuardFunc()

            return {
                '~DEFAULT~':this.defaultVal(newGuardFuncStr),
                [newGuardFuncStr]:[]
            }

        }else{

            var newGuardFuncStr = this.newGuardFunc()
            guardFuncStr+=newGuardFuncStr

            return {
                '~DEFAULT~':this.defaultVal(newGuardFuncStr),
                [newGuardFuncStr]:[]
            }
        }
    }

    newTerminalTypeBlockObj(guardFuncStr){
        if(!guardFuncStr){
            var newGuardFuncStr = this.newGuardFunc()
            return {
                [newGuardFuncStr]:newGuardFuncStr
            }
        }else{
            var newGuardFuncStr = this.newGuardFunc()
            guardFuncStr+=newGuardFuncStr
            return {
                [newGuardFuncStr]:guardFuncStr
            }
        }
    }

    newTerminalDefaultBlockObj(guardFuncStr){
        if(!guardFuncStr){
            var newGuardFuncStr = this.newGuardFunc()
            var defaultVal=this.defaultVal(newGuardFuncStr)
            return {
                '~DEFAULT~':defaultVal,
                [newGuardFuncStr]:newGuardFuncStr
            }
        }else{
            var newGuardFuncStr = this.newGuardFunc()
            var defaultVal=this.defaultVal(newGuardFuncStr)
            guardFuncStr+=newGuardFuncStr
            return {
                '~DEFAULT~':defaultVal,
                [newGuardFuncStr]:guardFuncStr
            }
        }
    }

    
    defaultVal(guardFunc){
        //generate a random value with the type in question and return it
        if(guardFunc=='isStr'){
            return this.rg.randStr()
        }else if(guardFunc=='isInt'){
            return this.rg.randInt()
        }else if(guardFunc=='isArr'){
            return this.rg.randArr()
        }else if(guardFunc=='isIntArr'){
            return this.rg.randIntArr()
        }else if(guardFunc=='isEnc'){
            return this.rg.randEnc()
        }else if(guardFunc=='isEncArr'){
            return this.rg.randEncArr()
        }else if(guardFunc=='isStrArr'){
            return this.rg.randStrArr()
        }else if(guardFunc=='isObj'){
            return this.rg.randObj()
        }else if(guardFunc=='isObjArr'){
            return this.rg.randObjArr()
        }
    }
    testGuard(){
        return (test_case, guard, func, expectedResult)=>{
            eval(
                `class TestGen{
                    constructor(test_case, guard, expected_result){
                        this.expectedResult=expected_result
                        new Guard(new Guards(), test_case, guard,  this)
                        //console.log(${func})
                    }
                    ${func}(v){
                        assert.deepEqual(v, this.expectedResult[1])
                        console.log(func+"("+ JSON.stringify(this.expectedResult[1])+')', 'PASSES')
                    }
                } 
                new TestGen(${test_case}, ${guard}, ${expectedResult})
                `
            )
        }
    }
}