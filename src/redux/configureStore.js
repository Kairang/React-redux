import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import bugReducer from './modules/bugs';

export default function configureStore() {
    const store = createStore(bugReducer, devToolsEnhancer({ trace: true }));
    return store;
};
