import { todos } from './index';

const testAddTodo = () => {
    const stateBefore = [];
    const action = {
        type: 'ADD_TODO',
        id: 0,
        text: 'Learn Redux'
    };
    const stateAfter = [
        {
            id: 0,
            text: 'Learn Redux',
            completed: false
        }
    ];

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(todos(stateBefore, action)).toEqual(stateAfter);
};

const testToggleTodo = () => {
    const stateBefore = [
        {
            id: 0,
            text: 'Learn Redux',
            completed: false
        },
        {
            id: 1,
            text: 'Go Shopping',
            completed: false
        }
    ];
    const action = {
        type: 'TOGGLE_TODO',
        id: 1
    };
    const stateAfter = [
        {
            id: 0,
            text: 'Learn Redux',
            completed: false
        },
        {
            id: 1,
            text: 'Go Shopping',
            completed: true
        }
    ];

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(todos(stateBefore, action)).toEqual(stateAfter);
};

testAddTodo();
testToggleTodo();
