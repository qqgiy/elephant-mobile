import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './home';

export default configureStore({
    reducer: {
        home: counterReducer,
    },
});
