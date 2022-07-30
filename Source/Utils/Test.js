import { Utils } from "./Utils.js"
import { Gen } from "./Gen.js"
import { Guards } from "./Guards.js"
import * as assert from "node:assert"
export class Test{
    constructor(h, w){
        this.test=this
        this.guardFuncBag= new Guards().getGuards()
        this.utils = new Utils(this.guardFuncBag, h, w)
    }



}
new Test(3, 3);