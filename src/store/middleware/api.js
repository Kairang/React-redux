import axios from 'axios';
import * as actions from '../api';

const baseURL = 'http://localhost:9001/api';

const api = ({ dispatch }) => next => async action => {
    if (action.type !== actions.apiCallBegin.type)
        return next(action)

    const { url, method, data, onStart, onSuccess, onError } = action.payload;

    if (onStart) dispatch({ type: onStart });
    next(action);

    try {
        const res = await axios.request({
            baseURL,
            url,
            method,
            data
        });

        // General
        dispatch(actions.apiCallSuccess(res.data));
        // Specific
        if (onSuccess) dispatch({ type: onSuccess, payload: res.data });
    } catch (error) {
        // General
        dispatch(actions.apiCallFailed(error.message));
        // Specific
        if (onError) dispatch({ type: onError, payload: error.message });
    }
}

export default api;