import {Is} from './Is.js'
import {Terminal} from './Terminal.js'
import {Utils} from './Utils.js'
class Iterator{
    constructor(guard){
        this.is = new Is()
        this.utils=new Utils()
        this.guard=guard //schema
        this.sentinel;
    }
    //this one changes the state, and is used for looping blocks
    next(val){

        return this.itercursion(array, 1)
    }

    //we could use it in a while(_next(val))

    itercursion(array, n){
        //sentinel drills down with drill() into the structure until it
        //reaches something it can return, then it removes the item from
        //the construct and returns it...


    }

    drill(){


    }
}



//itercurse uses a while loop
//next(val) would itercurse (replacing the top level array with the next level array)
//[  
//  {
//      'isGuard':[
//              {
//                  'isGuard':Anything
//              }
//       ]  
//  } 
//]

//[
//    {
//       'isGuard':Anything
//    }
//]  
//
//next(val) in this case would itercurse (replacing the top level array with the next level array)
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
//    {
//       'isGuard':Anything
//    }
//    ...
//]  





//next(val) in this case
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
//              },
//              ...
//       ]  
//  } 
// ...
//]



//performing next on this array would yield: { 'isGuard':[arbitrary array]}
//
//[
//  {
//      'isGuard':[arbitrary array]   
//  }
//]

//performing next on this array would yield: { 'isGuard':[arbitrary array]}
//AND would pop it off the array
//[
//  {
//      'isGuard':[arbitrary array]   
//  },
// ...
//]

//performing next on this array would yield: { 'isGuard':[arbitrary array]}
//
//[
//  {
//      'isGuard':[arbitrary array]   
//  }
//]
//...

//performing next on this array would yield: { 'isGuard':[arbitrary array]}
//
//[
//  {
//      'isGuard':[arbitrary array]   
//  } 
//  ...
//]
//...





//performing next on this array would yield: { 'isGuard':[arbitrary array]}
//
//[
//  {
//      'isGuard':{//any arbitrary object}    
//  }
//]

//performing next on this array would yield: { 'isGuard':[arbitrary array]}
//AND would pop it off the array
//[
//  {
//      'isGuard':{//any arbitrary object}    
//  },
// ...
//]

//performing next on this array would yield: { 'isGuard':[arbitrary array]}
//
//[
//  {
//      'isGuard':{//any arbitrary object}    
//  }
//]
//...

//performing next on this array would yield: { 'isGuard':[arbitrary array]}
//
//[
//  {
//      'isGuard':{//any arbitrary object}    
//  } 
//  ...
//]
//...





//performing next on this array would yield: { 'isGuard':[arbitrary array]}
//
//[
//  {
//      'isGuard':'arbitrary string'        
//  }
//]

//performing next on this array would yield: { 'isGuard':[arbitrary array]}
//AND would pop it off the array
//[
//  {
//      'isGuard':'arbitrary string'        
//  },
// ...
//]

//performing next on this array would yield: { 'isGuard':[arbitrary array]}
//
//[
//  {
//      'isGuard':'arbitrary string'        
//  }
//]
//...

//performing next on this array would yield: { 'isGuard':[arbitrary array]}
//
//[
//  {
//      'isGuard':'arbitrary string'        
//  } 
//  ...
//]
//...


//Itercursion uses a sentinal value that follows rules that you specify based on its value
//                                                                                                                      
//                                                                                                                         vvv                                      
//  [                                                                                                                       ]   Sentinel drills on the object which is an array.
//      {                   isStr:                       },   {                          isArr:                        }
//         [                                       ]             [                                            ]                 Because its an array it sets itself equal to the 
//            {     isStr:      },  {    isArr:   }                 {    isStr:    },  {       isArr:     }                     first item. It needs to return that item and remove it.
//                [  {}   ]            [  {}   ]                        [  {}   ]            [  {}   ]                          Sentinel holds this value for future reference until it
//                                                                                                                              drills again
//
//                                                                                              
//  [                                                                                                         vvv           ]       
//      {                   isStr:                       },      [                                             ]
//         [                                        ]                 {     isStr:    },    {     isArr:    }
//            {     isStr:      },  {    isArr:   }                      [  {}   ]             [  {}   ]
//               [  {}   ]           [  {}   ]                          


//                                                                                             
//  [                                                                                                       vvv             ]
//      {                   isStr:                       },            {     isStr:    },        [           ]               
//         [                                       ]                        [     ]                    {}
//            {     isStr:     },  {    isArr:   }                             {}                  
//                [       ]           [      ]                                
//                   {}                  {}


//                                                                                                            
//  [                                                                                                          vvv           ]
//          {                   isStr:                    },     [                                              ]           
//              [                                       ]             {     isStr:    },         { }  
//                  {    isStr:   },  {    isArr:   }                     [  {}   ]            
//                      [  {}  ]         [  {}  ]                          



//                                                                                          vvv
//  [                                                                                                                       ]
//         {                   isStr:                     },                       {     isStr:    },
//            [                                        ]                                [  {}   ]        
//              {     isStr:     },   {    isArr:   }                                                 
//                [  {}   ]            [  {}   ]                          



//                                                                                          vvv
//  [   {                   isStr:                       },   [                          [  {}   ]           ]           ]
//         [                                        ]                                            
//            {     isStr:     },   {    isArr:  }                                                 
//                [  {}   ]            [  {}   ]                          



//                                                                                          vvv
//  [   {                   isStr:                      },    [                              {}               ]          ]
//         [                                       ]                                            
//            {     isStr:      },  {    isArr:   }                                                 
//                [  {}   ]            [  {}   ]                          



//                                                                       vvv
//  [                                    [                                               ]                               ]                                     
//                                           {     isStr:      },  {    isArr:      }                                                 
//                                               [  {}   ]            [  {}   ]                          


//                                                                       vvv
//  [                                         {    isStr:     },   {   isArr:     }                                      ]                                     
//                                                             
//                                               [  {}   ]            [  {}   ]          


//                                                                       vvv
//  [                                          {     isStr:   },      [  {}   ]                                          ]                                     
//                                                             
//                                                 [  {}   ]                 


//                                                                      vvv
//  [                                            {    isStr:     },     {}                                               ]                                     
//                                                             
//                                                   [  {}   ]            


//                                                          vvv                           
//  [                                                {     isStr:      }                                                 ]                                     
//                                                             
//                                                        [  {}   ]            


//                                                          vvv                           
//  [                                                     [  {}   ]                                                      ]                                     
//                                                             
//                   

//                                                          vvv                           
//  [                                                        {}                                                          ]                                     
//                                                             
//                   

//                                                          vvv                           
//  [                                                                                                                    ]                                     
//                                                             
//      

//                                                          vvv                           
//                                                             
//                                                             
//      

