# Guard
Guard Schema maps helper functions to type checking functions with an orientation to variadic interfaces contexts.

This allows programmers to create general namespaces for their functions (search(), sort(), map(), whatever()), as opposed to writing a huge set of exposed api functions that deal with the same variables and slightly different function names that are a derivitive of a more general function. It keeps api's short but sweet and subtle.

Guard dictates the way you write functions all the way to your low level functions. It keeps you thinking about type checking and generalization of your functions by emphasiszing the use of variadic contexts.

## An example test schema:
We use arrays because strings can have their own schema and complex types. You would want to check complex string types before checking if it were a mere string type

	export const GUARD=[
	    {
		    'isStr':"isString"

	    },
	    {

		    'isStr':[
			    {
				    'isStr':"isStringIsString"
			    },
			    {
				    'isStr':[
					    {
						'isInt':'isStringIsStringIsInt'
					    }
				    ]
			    },

			    {
				    'isSep':[
					    {
						    'isEncoding': {
							'DEFAULT':'utf8',
							'FUNCTION': 'isStringIsSeparatorIsEncoding'
						    }    
					    }
				    ]
			    }, 
			    {
				    'isEnc':{
					    'DEFAULT':'utf8',
					    'FUNCTION': 'isStringIsEncoding'
				    }
			    },
			    {
				    'isEncArr':'isStringIsEncodingArray'
			    }   
		    ]
	    },
	    {
		    'isInt':[
			    {
				    'isInt': {
					'DEFAULT':10,
					'FUNCTION': 'isIntegerIsInteger'
				    }    
			    },

			    {
				    'isStr':{
					"DEFAULT":"",
					"FUNCTION": 'isIntegerIsString'
				    }
			    },
			    {
				    'isIntArr':{
					"DEFAULT":[],
					"FUNCTION": 'isIntegerIsIntegerArray'
				    }
			    },
			    {
				    'isArr':[
					    {
						'isArray':"isIntegerIsArrayIsArray"
					    },
					    {
						'isString':"isIntegerIsArrayIsString"
					    }
				    ]
			    },
		]

	    },
	    {
		    'isArr':'isStringIsSeparatorIsEncoding' 
	    }
	]
