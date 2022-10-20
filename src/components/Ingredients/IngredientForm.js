import React, {useState} from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';
import LoadingIndicator from '../UI/LoadingIndicator';

const IngredientForm = React.memo(props => {

// const inputState = useState({ title: '', amount: ''});

// Handling Multiple State Types
// When you need to manage multiple states
const [enteredTitle, setEnteredTitle] = useState('');
const [enteredAmount, setEnteredAmount] = useState('');

// Using array destructuring for useState
// const [inputState, setInputState] = useState({title: '', amount: ''});

  const submitHandler = event => {
    event.preventDefault();
    // ...
    props.onAddIngredient({
      title: enteredTitle,
       amount: enteredAmount
    });

  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input 
            type="text" 
            id="title" 
            value={enteredTitle}
            onChange={event => {

          // When new  state depends on old state snapshot
          // const newTitle = event.target.value;

          //  Using array destructuring for useState 
          // setInputState(prevInputState => ({
          // title: newTitle, 
          // amount: prevInputState.amount
        // }))
        
          // Using Multiple States 
          setEnteredTitle(event.target.value);
      }
    }
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>

            {/* <input type="number" id="amount" value={inputState[0].amount} */}

           {/* Using array destructuring for useState */}
            {/* <input type="number" id="amount" value={inputState.amount} */}

          {/* Using multiple States */}
            <input 
            type="number" 
            id="amount" 
            value={enteredAmount}

            onChange={event => {
            //   const newAmount = event.target.value;
            //   inputState[1](prevInputState => ({
            //   amount: newAmount, 
            //   title: prevInputState.title
            // }))
            setEnteredAmount(event.target.value);
          }
        }
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {props.loading && <LoadingIndicator/>}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
