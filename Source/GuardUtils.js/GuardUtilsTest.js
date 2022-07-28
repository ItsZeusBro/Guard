export class TestUtils{
    constructor(guardFuncBag){
        this.guardFuncBag=guardFuncBag
        this.gu = new GuardUtils(guardFuncBag)
        this.tests()
    }

    tests(){
        this.defaultValueTestAndAllBlockTests()
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
