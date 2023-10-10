import { combineReducers } from 'redux';
import bugReducer from './slice/bugs';
import projectReducer from './slice/projects';
import userReducer from './slice/users';

export default combineReducers({
    bugs: bugReducer,
    projects: projectReducer,
    users: userReducer
});
