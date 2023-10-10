import bugReducer from './modules/bugs';

function createStore(reducer) {
    let state, listeners = [];

    function subscribe(listener) {
        listeners.push(listener);
    };

    function dispatch(action) {
        state = reducer(state, action);

        for (const listener of listeners) {
            listener();
        }
    };

    function getState() {
        return state;
    };

    return {
        subscribe,
        dispatch,
        getState
    }
}

export default createStore(bugReducer);

