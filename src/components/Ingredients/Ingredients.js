import React, {  useEffect , useCallback, useReducer} from 'react';
import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal';

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
      case 'ADD': 
      return [...currentIngredients, action.ingredients];
        case 'DELETE': 
        return currentIngredients.filter(removeIng => removeIng.id !== action.id);
          default:
            throw new Error('Should not get there!');
  }
};

const httpReducers = (currentState, action ) => {
switch (action.type) {
case 'SEND' : 
return { loading: true, error: null};
  case 'RESPOND': 
  return {...currentState, loading: false};
  case 'ERROR':
    return {loading: false, error: action.errorMessage};
    case 'CLEAR': 
    return {...currentState, error: null};
    default:
      throw new Error('Should not get there!');
}}

function Ingredients() {
  // useReducer
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  const [httpState, dispatchHttp] = useReducer(httpReducers, {loading: false, error: null}); 

  // const [userIngredients, setUserIngredients ] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();
  // not needed anymore as Ingredients are now  fetched in search Components
  // useEffect(() => {
  //   fetch('https://react-hooks-d0778-default-rtdb.firebaseio.com/ingredients.json').then(response => 
  //   response.json()).then(responseData => 
  //     {
  //       const loadedIngredients = [];
  //       for(const key in responseData) {
  //         loadedIngredients.push({
  //           id: key,
  //           title: responseData[key].title,
  //           amount: responseData[key].amount
  //         });
  //       }
  //       setUserIngredients(loadedIngredients);
  //   });
  // }, []);

  useEffect(() => {
    console.log("IngredientList is available", userIngredients);
  }, [userIngredients]);

  const filteredIngredientsHandler = useCallback (filteredIngredients => {
// setUserIngredients(filteredIngredients);
dispatch({ type: 'SET', ingredients: filteredIngredients });
  },[]);


  const addIngredientHandler = ingredient => {
dispatchHttp({ type: 'SEND'});

    // setIsLoading(true)
fetch('https://react-hooks-d0778-default-rtdb.firebaseio.com/ingredients.json', 
    {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      dispatchHttp({ type: 'RESPONSE'});
      // setIsLoading(false);
      return response.json();
    }).then(responseData => {

      dispatch({ type: 'ADD', ingredients: {    id: responseData.name, ...ingredient} });
    // setUserIngredients(prevIngredient => [...prevIngredient, 
      // {
    // id: Math.random().toString(),
    //  id: responseData.name,
  //   ...ingredient
  //   }
  // ])
});
};


  const removeIngredientHandler = (ingredientId) => {
    dispatchHttp({ type: 'SEND'});
    // setIsLoading(true);
    fetch(`https://react-hooks-d0778-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`, 
    {
      method: 'DELETE',

      // No need for body and headers
      // body: JSON.stringify(ingredient),
      // headers: { 'Content-Type': 'application/json' }
    }).then(res => {
      dispatchHttp({ type: 'RESPONSE'});
      // setIsLoading(false);
// setUserIngredients( prevIngredients => 
//   prevIngredients.filter(ingredient => ingredient.id !== ingredientId)
// )
dispatch({ type: 'DELETE', id: ingredientId });
    }).catch(err => {
      dispatchHttp({ type: 'ERROR', errorMessage: // err.message  OR 
    'Something went wrong!'
    });
      // setError(err.message); Or
      // setError('Something went wrong!');
    });
  }

  const clearError = () => {
    dispatchHttp({ type: 'CLEAR'});
    // setError(null);
    // setIsLoading(false);
  };

  return (
    <div className="App">
      
      {/* {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>} */}
      {httpState.error && <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>}

      <IngredientForm onAddIngredient={addIngredientHandler} 
      loading={httpState.loading}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        {/* Need to add list here! */}
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler}/>
      </section>
    </div>
  );
}

export default Ingredients;