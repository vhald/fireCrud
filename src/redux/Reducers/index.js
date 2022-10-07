import {combineReducers} from 'redux';
import newsPostsReducer from './newsPostsReducer';
import newsCategoriesReducer from './newsCategoriesReducer';

const rootReducer = combineReducers({
  newsCategoriesReducer,
  newsPostsReducer,
});

export default rootReducer;
