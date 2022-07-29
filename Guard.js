import { GuardUtils } from "./Source/GuardUtils.js/GuardUtils";
export class Guard{

    constructor(guards, v, schema, obj){
        this.obj=obj
        this.didTerminate=false
        this.g = guards
        this.q=[];
        //console.log(guards, v, schema, obj)
        this.gu = GuardUtils(['isStr', 'isInt', 'isArr', 'isIntArr', 'isEnc', 'isEncArr', 'isStrArr', 'isObj', 'isObjArr'])
        this.guard(v, 0, schema)
		//if the last item pushes to the queue, did not throw an error, flush the queue
		if(!this.didTerminate){
			eval(this.q.shift())
		}

    }

    guard(guard){
        //we need to take the schema and input v and find the function that maps to v
        for(var i = 0; i<guard.length; i++){
            if(this.gu.isTerminalBlockObj(guard[i])){

                return
            }else if(this.gu.isRecursiveBlockObj(guard[i])){
                this.guard(this.gu.getNextRecursiveBlockObj(guard[i]))
            }
        }
        return
    }

    terminatingStr(v, str){
        this.didTerminate=true
        var func = this.g.buildParams(str, v)

        eval('this.obj.'+func)

    }
}
