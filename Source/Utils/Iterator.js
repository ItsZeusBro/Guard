import {Is} from './Is.js'
import {Terminal} from './Terminal.js'
class Iterator{
    constructor(guard){
        this.is = new Is()
        this.guard=guard //schema
    }
    //this one changes the state, and is used for looping blocks
    next(val){
        //takes the val, tries to pass the guard and return the next array of objects, or whatever else is available
    }
    //this doesn't change the state, its used for looping conditions
    _next(val){

    }

    //we could use it in a while(_next(val))
}




//calling next(array) on this
//next would have to pass the guard in any case
//[
//  {
//      'isGuard':{
//              //any arbitrary object
//         }    
//  }
//]
//would give us this
//         {
//              //any arbitrary object
//         }    


//calling next(array) on this
//[
//  {
//      'isGuard':[
//              {
//                  'isGuard':Anything
//              },
//              {}
//         ]  
//  } 
//]

//would give us this

//         [
//              {
//                  'isGuard':Anything
//              },
//              {
//                  'isString':Anything
//              }
//         ]  
//calling it again would give us 
//          Anything

//calling it again would gice us


//Iterator