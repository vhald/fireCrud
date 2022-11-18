import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import newsCategoriesReducer from './Reducers/newsCategoriesReducer';
import newsPostsReducer from './Reducers/newsPostsReducer';
// import newsCommentsReducer from './Reducers/newsCommentsReducer';
import thunk from 'redux-thunk';
// import storage from 'redux-persist/lib/storage';
// import {persistStore, persistReducer} from 'redux-persist';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import rootReducer from './Reducers';

// //enhancer : 1. thunk 2.
// //27 sept for devtools
// import {composeWithDevTools} from 'remote-redux-devtools';
// import {composeWithDevTools} from 'redux-devtools-extension';
var composeEnhancers = compose;
if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const persistConfig = {key: 'root', storage: AsyncStorage};

const reducers = combineReducers({
  posts: newsPostsReducer,
  categories: newsCategoriesReducer,
  // comments: newsCommentsReducer,
});

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;
