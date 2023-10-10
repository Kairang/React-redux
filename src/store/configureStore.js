import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';
import logger from './middleware/logger';
import toastify from './middleware/toastify';
import api from './middleware/api';

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware(),
        // logger,
        toastify,
        api,
    ]

});

export default store;

