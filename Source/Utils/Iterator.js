import {Is} from './Is.js'
import {Terminal} from './Terminal.js'
import {Utils} from './Utils.js'
class Iterator{
    constructor(guard){
        this.is = new Is()
        this.utils=new Utils()
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

//[  
//  {
//      'isGuard':[
//              {
//                  'isGuard':Anything
//              },
//              ...
//       ]  
//  } 
// ...
//]

//[  
//  {
//      'isGuard':[
//              {
//                  'isGuard':Anything
//              }
//       ]  
//  } 
// ...
//]

//[  
//  {
//      'isGuard':[
//              {
//                  'isGuard':Anything
//              }
//              ...
//       ]  
//  } 
//]

//[
//  {
//      'isGuard':[arbitrary array]   
//  },
// ...
//]

//[
//  {
//      'isGuard':{
//              //any arbitrary object
//         }    
//  },
//  ...
//]

//[
//  {
//      'isGuard':'arbitrary string'        
//  },
//  ...
//]

//[
//  {
//      'isGuard':[arbitrary array]    
//  }
//]

//[
//  {
//      'isGuard':{
//              //any arbitrary object
//         }    
//  }
//]

//[
//  {
//      'isGuard':'arbitrary string'        
//  }
//]