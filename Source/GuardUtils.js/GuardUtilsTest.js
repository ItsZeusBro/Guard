import { GuardUtils, GuardGen } from "./GuardUtils.js"

import * as assert from "node:assert"

export class TestUtils{
    constructor(h, w, guardFuncBag){
        this.h=h
        this.w=w
        this.guardFuncBag=guardFuncBag
        this.gu = new GuardUtils(guardFuncBag)
        console.log(this.gu.newRecursiveDefaultBlockObj())
        console.log(this.gu.newRecursiveTypeBlockObj())
        console.log(this.gu.newTerminalDefaultBlockObj())
        console.log(this.gu.newTerminalTypeBlockObj())
        this.tests()
    }

    tests(){
        this.defaultValueTestAndAllBlockTests()
        this.getters()
        this.walkTest()
    }

    getters(){

    }

    walkTest(){
        var gg = new GuardGen(this.h, this.w, this.guardFuncBag)
        var ggen = gg.ggen
        gg.log(ggen)
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
new TestUtils(5, 5, guardFuncBag);