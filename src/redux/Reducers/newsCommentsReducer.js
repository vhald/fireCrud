const GETNEWSCOMMENTS = 'getnewsComments';
// const ADDNEWSCOMMENTS = 'addnewsComments';
// const EDITNEWSCOMMENTS = 'editnewsComments';
// const DELETENEWSCOMMENTS = 'deletenewsComments';

const initValue = () => {
  newsComments: [];
};

const newsCommentsReducer = (state = initValue, action) => {
  console.log('action', action);

  //   if (action.type === GETNEWSCOMMENTS) {
  //     return state + 1;
  //   }
  //   if (action.type === ADDNEWSCOMMENTS) {
  //     return state + 1;
  //   }
  //   if (action.type === EDITNEWSCOMMENTS) {
  //     return state + 1;
  //   }
  //   if (action.type === DELETENEWSCOMMENTS) {
  //     return state + 1;
  //   }

  return state;
};

export default newsCommentsReducer;
// this is 21th sept video,@22:26
