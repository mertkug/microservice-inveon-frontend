import { configureStore } from '@reduxjs/toolkit';
import { loadUser } from 'redux-oidc';
import productsReducer from "./slices/product";
import userReducer from './slices/user';
import settingsReducer from './slices/settings';
import userManager from "../userManager";
import {productApi} from "../services/product-api";


// logger middleware
const loggerMiddleware = (store) => (next) => (action) => {
    console.log('Action type:', action.type);
    console.log('Action payload:', action.payload);
    console.log('State before:', store.getState());
    next(action);
    console.log('State after:', store.getState());
    // if user found, dispatch necessary action
    if (action.type === 'redux-oidc/USER_FOUND') {
        store.dispatch({ type: 'user/login', payload: {
            username: action.payload.profile.preferred_username,
                access_token: action.payload.access_token,
                user_id: action.payload.profile.sub
        }});
    }

    if(action.type === 'redux-oidc/USER_SIGNEDOUT') {
        // hi
    }
};

// initial state
const initialState = {};


// configure store
const store = configureStore({
    reducer: {
        products: productsReducer,
        user: userReducer,
        settings: settingsReducer,
        [productApi.reducerPath]: productApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(loggerMiddleware, productApi.middleware),
    preloadedState: initialState,
});

// load user
loadUser(store, userManager);

export { store };
