import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from "redux"
import {connect as rrconnect}  from "react-redux"
import { composeWithDevTools } from 'redux-devtools-extension';

const getRootElementOnWebpage = () => document.getElementById('root'); //arrow function syntax https://zendev.com/2018/10/01/javascript-arrow-functions-how-why-when.html
const getInitialState = () => {
    return {
        number: 0
    };
};
const handleAction = (state, action) => {
    const { type } = action; //destructuring assignment syntax https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    const { number } = state;
    if (type === "increment") return {...state, number: number + 1} //object spread syntax https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    return state
};
const store = createStore(handleAction, getInitialState(),composeWithDevTools())
const getState = () => store.getState();
const dispatch = (...args) => store.dispatch(...args);
const connect = component => rrconnect(state => state, {})(component);
const App = (state) => {
    const { number } = state;
    const onClick = () => dispatch({type: "increment", value: number});
    const divStyle = {borderColor: 'red'}
    return (
        <button style={divStyle} onClick={onClick}>You've clicked me: {number} times</button>
    )
};
const ConnectedApp = connect(App);
ReactDOM.render(
    <Provider store={store}>
        <ConnectedApp/>
    </Provider>,
    getRootElementOnWebpage()
)