export const GETNEWSPOST = 'getnewspost';
export const ADDNEWSPOST = 'addnewspost';
export const EDITNEWSPOST = 'editnewspost';
const DELETENEWSPOST = 'deletenewspost';
export const SUCCESSADDEDNEWS = 'successaddednews';
export const ERRORADDEDNEWS = 'erroraddednews';
export const LOADER = 'loader';

// const getAllNews = () => {
//   return {type: GETNEWSPOST};
// };

const initValue = {
  newsposts: [],
  addposts: [],
  editpost: [],
  loading: false,
  msg: null,
};

const newsPostsReducer = (state = initValue, action) => {
  console.log('action', action);

  if (action.type === GETNEWSPOST) {
    console.log('action payload', action.payload);
    return {...state, newsposts: action.payload, loading: false};
  }

  if (action.type === ADDNEWSPOST) {
    console.log('action payload add payload', action.payload);

    return {...state, addposts: action.payload};
  }
  if (action.type === SUCCESSADDEDNEWS) {
    console.log('action payload add payload', action.payload);

    return {...state, msg: action.payload};
  }
  if (action.type === ERRORADDEDNEWS) {
    return {...state, msg: action.payload};
  }

  if (action.type === LOADER) {
    return {...state, loading: action.payload};
  }
  if (action.type === EDITNEWSPOST) {
    return {...state, editpost: action.payload, loading: false};
  }
  // if (action.type === DELETENEWSPOST) {
  //   return {...state, msg: action.payload, loading: false};
  // }

  return state;
};

export default newsPostsReducer;
// this is 21th sept video,@22:26
