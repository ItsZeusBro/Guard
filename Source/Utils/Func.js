//Very general schema, that we can work with in a variety of ways to provide extra features
//recursive pattern
//if guard[0]['isWhatever'] returns an array of guard objects then its recursive, 
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

//base patterns
//if guard[0]['isWhatever'] returns any of these three, its a base case, else its an error
//[
//  {
//      'isGuard':['', '', '']    
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
//      'isGuard':''
//    
//             
//  }
//]

