import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import appReducer from './reducer';

const store = configureStore({ reducer: appReducer, middleware: [thunkMiddleware]});

export default store;