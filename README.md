# Guard
Guard Schema maps helper functions to type checking functions with an orientation to variadic interfaces contexts.

This allows programmers to create general namespaces for their functions (search(), sort(), map(), whatever()), as opposed to writing a huge set of exposed api functions that deal with the same variables and slightly different function names that are a derivitive of a more general function. It keeps api's short but sweet and subtle.

Guard dictates the way you write functions all the way to your low level functions. It keeps you thinking about type checking and generalization of your functions by emphasiszing the use of variadic contexts.

### Future Premium Services
Eventually we want a semantics engine that interprets user inputs to your api's to further sanitize inputs semantically to make sure your inputs remain sanitary. This also makes your api's "sticky" in that general intention can be expressed in your general functions and is routed towards the proper functions in your backend.

## An example test schema:
We use arrays because strings can have their own schema and complex types. You would want to check complex string types before checking if it were a mere string type



	export const GUARD=[
	    {
		    'isStr':"simpleFunction"

	    },
	    {

		    'isStr':[
			    {
				    'isStr':"weirdFunction"
			    },
			    {
				    'isStr':[
					    {
						'isInt':'someFunction'
					    }
				    ]
			    },

			    {
				    'isSep':[
					    {
						    'isEncoding': {
							'DEFAULT':'utf8',
							'FUNCTION': 'anotherFunction'
						    }    
					    }
				    ]
			    }, 
			    {
				    'isEnc':{
					    'DEFAULT':'utf8',
					    'FUNCTION': 'aThirdFunction'
				    }
			    },
			    {
				    'isEncArr':'anotherBadFunction'
			    }   
		    ]
	    },
	    {
		    'isInt':[
			    {
				    'isInt': {
					'DEFAULT':10,
					'FUNCTION': 'tooManyFunctions'
				    }    
			    },

			    {
				    'isStr':{
					"DEFAULT":"",
					"FUNCTION": 'moreFunction'
				    }
			    },
			    {
				    'isIntArr':{
					"DEFAULT":[],
					"FUNCTION": 'goodFunction'
				    }
			    },
			    {
				    'isArr':[
					    {
						'isArray':"mediocreFunction"
					    },
					    {
						'isString':"goAwayFunction"
					    }
				    ]
			    },
		]

	    },
	    {
		    'isArr':'goodByeFunction' 
	    }
	]


### Somewhere in your code

	class WeirdClass{
		constructor(...v){
		        new Guard(v, GUARD,  this)
		}
		simpleFunction(v){
		
		}
		weirdFunction(v){
		
		}
		someFunction(v){
		
		}
		
		...
	
