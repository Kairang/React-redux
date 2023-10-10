// Action types
const actionTypes = {
    ADD_BUG: 'bugAdded',
    REMOVE_BUG: 'bugRemoved',
    RESOLVE_BUG: 'bugResolved',
};

// Action Creators
export const bugAction = {
    bugAdded: description => ({
        type: actionTypes.ADD_BUG,
        payload: { description }
    }),
    bugResolved: id => ({
        type: actionTypes.RESOLVE_BUG,
        payload: { id }
    }),
    bugRemoved: id => ({
        type: actionTypes.REMOVE_BUG,
        payload: { id }
    }),
};

// Reducer
let lastId = 0;

export default function reducer(state = [], action) {
    switch (action.type) {
        case actionTypes.ADD_BUG:
            return [
                ...state,
                {
                    id: ++lastId,
                    description: action.payload.description,
                    resolved: false,
                }
            ];
        case actionTypes.REMOVE_BUG:
            return state.filter(bug => bug.id !== action.payload.id);
        case actionTypes.RESOLVE_BUG:
            return state.map(bug => bug.id !== action.payload.id ? bug : { ...bug, resolved: true });
        default: return state
    }
}