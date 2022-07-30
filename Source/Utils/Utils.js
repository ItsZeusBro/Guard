import { Guards } from "./Guards.js"
import { Is } from "./Is.js"
import { Get } from "./Get.js"
import { Rand } from "./Rand.js"
import { New } from "./New.js"
import * as util from "node:util"
import * as assert from "node:assert"
import { Gen } from "./Gen.js"

export class Utils{

    constructor(h, w){
        this.utils=this
        this.guards = new Guards();
        this.guardFuncBag=this.guards.getGuards()
        this.rand = new Rand();
        this.is = new Is(this);
        this.get = new Get(this);
        this.new = new New(this)
        this.gen;
        if(h && w){
            this.gen = new Gen(h, w, this)
            this.verify(this.gen.guard)
        }
    }

    log(obj){
        if(obj){
            console.log(util.inspect(obj, false, null, true))
        }
    }


    //needs to make sure there is no more than one guard per object
    //needs to get the function strings
    verify(){
        
    }
    _verify(){
       
    }

    passGuard(func, v){
        if(!this.is.Guard(func)){return false}
        func='this.guards.'+func
        func = this.new.Params(func, v)
        if(eval(func)){
            return true
        }else{
            return false
        }
    }    



}