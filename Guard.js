export class Guard{
    constructor(guards, v, schema, obj){
        this.obj=obj
        this.didTerminate=false
        this.g = guards
        this.q=[];
        this.guard(v, 0, schema)

		//if the last item pushes to the queue, did not throw an error, flush the queue
		if(!this.didTerminate){
			eval(this.q.shift())
		}

    }

    guard(v, v_indx, schema){

			try{
				schema.forEach((schema_obj)=>{

					if(this.didTerminate){return}
	
					if(this.g.isObjArr(schema_obj)){
						this.guard(v, v_indx+1, schema_obj)
	
					}else if(this.g.isObj(schema_obj)){
		
						if(this.g.isNKeys(schema_obj, 1)){
							var func = Object.keys(schema_obj)[0];
							var val = schema_obj[func];
							if(this.g.isGuard(func)){
								if(this.g.passGuard(func, v[v_indx])){
									if(this.isTerminal(v, v_indx, val)=='string'){
										this.terminatingStr(v, val);
									}else if(this.isTerminal(v, v_indx, val)=='obj'){
										//this is where things go wrong
										this.terminatingObj(func, v, v_indx, val);
		
									}else{
										this.guard(v, v_indx+1, schema_obj[func]);
									}
								}else{
									if(this.isTerminal(v, v_indx, val)=='obj'){
										//AND HERE
										this.terminatingObj(func, v, v_indx, val);
									}
								}
							}
						}
					}
				})
			}catch{

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
        //BUG FOUND!!!vvvvv
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

//looks for first path that is completely valid, and eval immediately