import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import VisibleTodoList from './components/VisibleTodoList';
import AddTodo from './components/AddTodo';

// Todo reducer (called by Todos reducer)
const todo = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                completed: false
            };
        case 'TOGGLE_TODO':
            if (state.id !== action.id) {
                return state;
            }

            return {
                ...state,
                completed: !state.completed
            };
        default:
            return state;
    }
};

// Todos reducer
const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, todo(undefined, action)];
        case 'TOGGLE_TODO':
            return state.map(t => todo(t, action));
        default:
            return state;
    }
};

// Visibility reducer
const visibilityFilter = (state = 'SHOW_ALL', action) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
};

// Combined reducer (state keys match the names of the reducers,
// so we can write `todos,` rather than `todos: todos,`)
const todoApp = combineReducers({
    todos,
    visibilityFilter
});

const Link = ({ active, children, onClick }) => {
    if (active) {
        return <span>{children}</span>;
    }
    return (
        <a
            href="#"
            onClick={e => {
                e.preventDefault();
                onClick();
            }}
        >
            {children}
        </a>
    );
};

class FilterLink extends React.Component {
    componentDidMount() {
        const { store } = this.context;
        store.subscribe(() => this.forceUpdate());
    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    render() {
        const props = this.props;
        const { store } = this.context;
        const state = store.getState();

        return (
            <Link
                active={props.filter === state.visibilityFilter}
                onClick={() =>
                    store.dispatch({
                        type: 'SET_VISIBILITY_FILTER',
                        filter: props.filter
                    })
                }
            >
                {props.children}
            </Link>
        );
    }
}
FilterLink.contextTypes = {
    store: PropTypes.object
};

const Footer = () => (
    <p>
        Show: <FilterLink filter="SHOW_ALL">All</FilterLink>{' '}
        <FilterLink filter="SHOW_ACTIVE">Active</FilterLink>{' '}
        <FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>
    </p>
);
const TodoApp = () => (
    <div>
        <AddTodo />
        <VisibleTodoList />
        <Footer />
    </div>
);

ReactDOM.render(
    <Provider store={createStore(todoApp)}>
        <TodoApp />
    </Provider>,
    document.getElementById('root')
);
