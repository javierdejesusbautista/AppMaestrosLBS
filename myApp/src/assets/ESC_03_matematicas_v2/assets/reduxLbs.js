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

  if (action.type === "REMOVE_DATA"){

	// console.log(state);
	// console.log(action.payload.elemento);
	
	return state.filter(i => i.elemento !== action.payload.elemento );

  }

  return state;
};

const isActiveDynamicNoteReducer = (state = false,action) => {
	//console.log("bookReducer : ",state,action);
  console.log(action);
  if (action.type === "ENABLED_DYNAMICNOTE") {
  		return action.payload = true;
  }
  if (action.type === "DISABLED_DYNAMICNOTE") {
  		return action.payload = false;
  }

  return state;
};

Visor.store = Redux.createStore(combineReducers({
									bookReducer,
									isActiveDynamicNoteReducer
									//reducerCounter
								}),
								//{name: "name field"},
								//initialState,
								window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

//console.log(Visor.store.getState());