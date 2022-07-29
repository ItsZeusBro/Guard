import { GuardUtils } from "./GuardUtils.js"
import { GuardGen } from "./GuardGen.js"
import * as assert from "node:assert"

export class TestUtils{
    constructor(h, w, guardFuncBag){
        this.h=h
        this.w=w
        this.guardFuncBag=guardFuncBag
        this.gu = new GuardUtils(guardFuncBag)
        this.tests()
        
    }

    tests(){
        // this.defaultValueTestAndAllBlockTests()
        // this.getterTest()
        // this.genTest()
        // this.evalTests()
        this.guardTests()
    }

    guardTests(){
        //generate schema
        //test guard on all paths in the schema with paramters to match
        var gg = new GuardGen(this.h, this.w, this.guardFuncBag)
        var ggen = gg.ggen
        this.gu.verify(ggen)
        this.gu.log(ggen)    
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

    getterTest(){
        var obj;
        //getGuard uses getGuardObj()
        for(var i =0; i<10000; i++){
            obj = this.gu.newRecursiveDefaultBlockObj()  
            assert.equal(this.guardFuncBag.includes(this.gu.getGuardKey(obj)), true)
            obj = this.gu.newRecursiveTypeBlockObj()
            assert.equal(this.guardFuncBag.includes(this.gu.getGuardKey(obj)), true)
            obj = this.gu.newTerminalTypeBlockObj()
            assert.equal(this.guardFuncBag.includes(this.gu.getGuardKey(obj)), true)
            obj = this.gu.newTerminalDefaultBlockObj()
            assert.equal(this.guardFuncBag.includes(this.gu.getGuardKey(obj)), true)
        }

        for(var i =0; i<10000; i++){
            obj = this.gu.newRecursiveDefaultBlockObj()
            obj[this.gu.getGuardKey(obj)].push(this.gu.newRecursiveDefaultBlockObj())
            var newObj = this.gu.getNextRecursiveBlockObj(obj)
            assert.notEqual(obj, newObj)
            assert.notDeepEqual(obj, newObj)
            assert.equal(this.gu.isRecursiveBlockObj(newObj[0]), true)
        }
    }

    genTest(){
        for(var i =0; i<10000; i++){
            var gg = new GuardGen(this.h, this.w, this.guardFuncBag)
            var ggen = gg.ggen
            //this.gu.log(ggen)    
            this.gu.verify(ggen)
        }
    }

    evalTests(){
        var someFunc=(v)=>{
            var result=0;
            for(var i = 0; i<v.length; i++){
                result+=v[i]
            }
            return this.gu.guards.isInt(result)
        }
        for(var i =0; i<1000; i++){
            this.guardFuncBag.forEach(func => {
                assert.equal(true, this.gu.isGuard(func))
                assert.equal(true, this.gu.passGuard(func, this.gu.defaultVal(func)))
                assert.equal(true, eval(this.gu.buildParams('someFunc', this.gu.rg.randIntArr(10))))
            });
        }      
    }
    defaultValueTestAndAllBlockTests(){
        this.testNewRecursiveTypeBlockObj()
        this.testNewRecursiveDefaultBlockObj()
        this.testNewTerminalTypeBlockObj()
        this.testTerminalDefaultBlockObj()
    }

    testIsRecursiveTypeBlockObj(){
        var obj = this.gu.newRecursiveTypeBlockObj();
        assert.equal(this.gu.isRecursiveTypeBlockObj(obj), true);
        return true
    }

    testIsRecursiveDefaultBlockObj(){
        var obj = this.gu.newRecursiveDefaultBlockObj();
        assert.equal(this.gu.isRecursiveDefaultBlockObj(obj), true);
        return true
    }

    testIsTerminalTypeBlockObj(){
        var obj = this.gu.newTerminalTypeBlockObj()
        assert.equal(this.gu.isTerminalTypeBlockObj(obj), true);
        return true
    }

    testIsTerminalDefaultBlockObj(){
        var obj = this.gu.newTerminalDefaultBlockObj()
        assert.equal(this.gu.isTerminalDefaultBlockObj(obj), true);
        return true
    }

    testNewRecursiveTypeBlockObj(){
        for(var i=0; i<10000; i++){
            assert.equal(this.testIsRecursiveTypeBlockObj(), true)
        }
        return true
    }

    testNewRecursiveDefaultBlockObj(){
        for(var i=0; i<10000; i++){
            assert.equal(this.testIsRecursiveDefaultBlockObj(), true)
        }
        return true
    }

    testNewTerminalTypeBlockObj(){
        for(var i=0; i<10000; i++){
            assert.equal(this.testIsTerminalTypeBlockObj(), true)
        }
        return true
    }

    testTerminalDefaultBlockObj(){
        for(var i=0; i<10000; i++){
            assert.equal(this.testIsTerminalDefaultBlockObj(), true)
        }
        return true
    }
}
var guardFuncBag=['isStr', 'isInt', 'isArr', 'isIntArr', 'isEnc', 'isEncArr', 'isStrArr', 'isObj', 'isObjArr']
new TestUtils(3, 3, guardFuncBag);