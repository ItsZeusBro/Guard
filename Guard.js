export class Guard{
    constructor(guards, v, schema, obj){
        this.obj=obj
        this.didTerminate=false
        this.g = guards
        this.q=[];
        //console.log(guards, v, schema, obj)

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



    isTerminal(v, v_indx, val){

        if(this.g.isStr(val)&&(v_indx==v.length-1)){

            return 'string';
        }else if(this.g.isObj(val)&&(!this.g.isArr(val))&&(v_indx==v.length-1)){
            //deep check required!
            if(this.g.isKey(val,'DEFAULT')&&this.g.isKey(val, 'FUNCTION')){
                return 'obj';
            }
        }
    }

    terminatingObj(func, v, v_indx, obj){
        if(this.g.passGuard(func, v[v_indx])){
            this.didTerminate=true
            func = this.g.buildParams(obj['FUNCTION'], v)
            
            eval('this.obj.'+func)

        }else{
            var _v= Array.from(v);
            _v.pop()
            _v.push(obj['DEFAULT'])
            func = this.g.buildParams(obj['FUNCTION'], _v)
            this.q.push('this.obj.'+func)
        } 
    }

    terminatingStr(v, str){
        this.didTerminate=true
        var func = this.g.buildParams(str, v)

        eval('this.obj.'+func)

    }
}
