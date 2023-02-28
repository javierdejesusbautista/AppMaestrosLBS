console.log("reduxLbs");
const { combineReducers } = Redux;

const bookReducer = (state = [],action) => {
	//console.log("bookReducer : ",state,action);
  if (action.type === "INIT_BOOKS") {
  		return [...action.payload];
  }
  if (action.type === "ADD_BOOKS") {
    /*return { 
    	items : [...state.items,action.payload],
    };*/

    const busqueda = state.filter(a => a.elemento == action.payload.elemento);    
    if(busqueda.length != 0) 
	    return state.map( item =>{
	    	if(item.elemento == action.payload.elemento)
	    		return {
	    			...action.payload
	    		}
	    	else
	    		return item;
	    });
	else
		return [...state,{ ...action.payload }];	
  }

  return state;
};

 Visor.store = Redux.createStore(combineReducers({
									bookReducer,
									//reducerCounter
								}),
								//{name: "name field"},
								//initialState,
								window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

//console.log(Visor.store.getState());