import React from 'react'
import ReactDOM from 'react-dom'
import {connect as rrconnect, Provider} from 'react-redux'
import {createStore} from "redux"
import {composeWithDevTools} from 'redux-devtools-extension';
import {get} from "./request";

const store = createStore(Reducer, getInitialState(),composeWithDevTools())
const {dispatch} = store; //destructuring assignment syntax https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

function getWikipediaHtml() { //an example of a backend request to fetch some data (here we load a wikipedia page)
    get('wiki/Representational_state_transfer',
      response => dispatch({type: "wikipediaHtml", value: response.data}), //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
      error => dispatch({type: "wikipediaHtml", value: JSON.stringify(error)}))
}

function getInitialState() { //our initial redux state store
    return {
        number: 0,
        wikipediaHtml: "",
    };
}

function Reducer(state, action) { //pure function that takes the current state, an action, and returns a new state
    const {type, value} = action;
    if (type === "increment") {
        return {...state, number: value + 1} //object spread syntax https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    } else if (type === "wikipediaHtml") {
        return {...state, wikipediaHtml: value }
    }
    return state;
}

function App(props) { //react JSX component that renders our state and dispatches actions
    const {number, wikipediaHtml} = props; //in this case "props" is our state

    function onClick() {
        return dispatch({type: "increment", value: number});
    }

    return (
      <div>
        <button onClick={onClick}>You've clicked me: {number} times</button>
        <button onClick={getWikipediaHtml}>Load Wikipedia HTML</button>
        <div>{wikipediaHtml}</div>
      </div>
    )
}

//when rendering a component this function is called first to extract "props" from our state (separation of concerns/decoupling)
//in this example we don't care, so we pass it on to the "App" function as-is
function mapStateToProps(state) {
    return state;
}

//connect component to react-redux and render our app inside the 'root' div element
const ConnectedApp = rrconnect(mapStateToProps, {})(App);
ReactDOM.render(
  <Provider store={store}>
      <ConnectedApp/>
  </Provider>,
  document.getElementById('root')
)
