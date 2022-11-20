import firestore from '@react-native-firebase/firestore';
import {
  GETNEWSCATEGORIES,
  ADDEDCATEGORY,
  LOADER,
  ERRORADDEDCATEGORY,
} from '../Reducers/newsCategoriesReducer';

export const getCategory = () => {
  return dispatch => {
    firestore()
      .collection('categoryList')
      .get()
      .then(res => {
        var categoryList = [];
        res.docs.map(each => {
          categoryList.push({
            label: each.data().name,
            value: each.id,
            parentID: each.data().parentID,
          });
        });
        console.log('category listing: ', categoryList);
        categoryList.push({ label: 'select an item', value: null });
        dispatch({ type: GETNEWSCATEGORIES, payload: categoryList });
      })
      .catch(e => {
        console.log('err: ', e);
        dispatch({ type: GETNEWSCATEGORIES, payload: [] });
      });
  };
};

export const addcategory = data => {
  console.log('add category data come here', data);
  return async dispatch => {
    try {
      var res = await firestore().collection('categoryList').add(data);
      console.log('res', res.id);
      dispatch({
        type: ADDEDCATEGORY,
        payload: {
          msg: 'category added successfully',
          data: { label: data.name, value: res.id, parentID: data.parentID },
        },
      });
    } catch (error) {
      dispatch({ type: ERRORADDEDCATEGORY, payload: 'network error' });
    }
  };
};

export const loaderStatus = data => {
  return dispatch => {
    dispatch({ type: LOADER, payload: data });
  };
};
