import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import expect from 'expect';
import deepFreeze from 'deep-freeze';

const counter = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
};

const Counter = ({ value, onIncrement, onDecrement }) => (
    <div>
        <h1>{value}</h1>
        <button onClick={onIncrement}>+</button>
        <button onClick={onDecrement}>-</button>
    </div>
);

const store = createStore(counter);

const render = () => {
    ReactDOM.render(
        <Counter
            value={store.getState()}
            onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
            onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
        />,
        document.getElementById('root')
    );
};

store.subscribe(render);
render();

expect(counter(0, { type: 'INCREMENT' })).toEqual(1);
expect(counter(1, { type: 'INCREMENT' })).toEqual(2);
expect(counter(2, { type: 'DECREMENT' })).toEqual(1);
expect(counter(1, { type: 'SOMETHING' })).toEqual(1);
expect(counter(undefined, {})).toEqual(0);

const addCounter = list => {
    list.push(0);
    return list;
};

const testAddCounter = () => {
    const listBefore = [];
    const listAfter = [0];

    deepFreeze(listBefore);

    expect(addCounter(listBefore)).toEqual(listAfter);
};

testAddCounter();
