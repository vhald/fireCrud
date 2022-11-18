// const ADDNEWSCATEGORIES = 'addnewsCategories';
// const EDITNEWSCATEGORIES = 'editnewsCategories';
// const DELETENEWSCATEGORIES = 'deletenewsCategories';
export const GETNEWSCATEGORIES = 'getnewsCategories';
export const ADDEDCATEGORY = 'addedcategory';
export const LOADER = 'loader';
export const ERRORADDEDCATEGORY = 'erroraddedcategory';

const initValue = {
  newscategories: [],
  msg: null,
  // loading: false,
};

const newsCategoriesReducer = (state = initValue, action) => {
  // console.log('action', action);

  if (action.type === GETNEWSCATEGORIES) {
    return {...state, newsCategories: action.payload};
  }
  if (action.type === ADDEDCATEGORY) {
    return {
      ...state,
      msg: action.payload.msg,
      newscategories: [action.payload.data, ...state.newscategories],
      // loading: false,
    };
  }
  if (action.type === ERRORADDEDCATEGORY) {
    return {...state, msg: action.payload};
  }

  if (action.type === LOADER) {
    return {...state, loading: action.payload};
  }
  //   if (action.type === EDITNEWSCATEGORIES) {
  //     return state + 1;
  //   }
  //   if (action.type === DELETENEWSCATEGORIES) {
  //     return state + 1;
  //   }

  return state;
};

export default newsCategoriesReducer;
