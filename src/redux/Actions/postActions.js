import {
  ERRORADDEDNEWS,
  SUCCESSADDEDNEWS,
  EDITNEWSPOST,
  GETNEWSPOST,
  ADDNEWSPOST,
} from '../Reducers/newsPostsReducer';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import Moment from 'moment';
import _ from 'lodash';
import toast from 'react-native-simple-toast';
import thunk from 'redux-thunk';

export const getAllNews = () => {
  return dispatch => {
    firestore()
      .collection('ghosts')
      .get()
      .then(getData => {
        var rowData = [];
        getData.docs.map(each => {
          rowData.push({ ...each.data(), id: each.id });
        });
        // 1. CALL THE API
        // 2. DISPATCH THE FUNCT
        dispatch({
          type: GETNEWSPOST,
          payload: rowData,
          // payload: [{id: 'gILjZIkof8zDI5fNFRNx', title: 'First Post'}],
          // description: 'some description',
          // });
        });
      })
      .catch(err => {
        console.log('error: ', err);
        dispatch({
          type: GETNEWSPOST,
          payload: [],
        });
      });
  };
};
// 21th sept video, @37:58

// export const addNews = async () => {
//   try {
//     await firestore()
//       .collection('ghosts')
//       .add(data)
//       .then(res => {
//         toast.show('Post added Succesfully');
//         setTitle('');
//         setDescription('');
//         navigation.goBack();
//         route.params.reloadData();
//       });
//   } catch (e) {
//     console.log('err:', e);
//   }
// };

export const addNews = all => {
  console.log('add news data come here', all);

  return dispatch => {
    firestore()
      .collection('ghosts')
      .add(all)
      .then(res => {
        dispatch({ type: SUCCESSADDEDNEWS, payload: 'post_added' });
      })
      .catch(error => {
        dispatch({ type: ERRORADDEDNEWS, payload: 'network_error' });
      });
  };
};

export const updateNews = data => {
  console.log('add news data come here', data);

  return dispatch => {
    try {
      var res = firestore()
        .collection('ghosts')
        .doc(id)
        .update({ title: head, description: body, categoryName: category });
      console.log('res', res.id);
      toast.show('Post added Succesfully');
      // navigation.goBack();
      // route.params.reloadData();
      dispatch({
        type: EDITNEWSPOST,
        payload: {
          msg: 'Post added Succesfully',
          data: data,
        },
      });
      // bcoz we dont want to add more data from here.
    } catch (error) {
      dispatch({ type: ERRORADDEDNEWS, payload: 'network error' });
    }
  };
};

export const deleteNews = id => {
  console.log('deleting item id: ', id);

  return dispatch => {
    try {
      var res = firestore().collection('ghosts').doc(id).delete();
      console.log('res', res.id);
      toast.show('Post deleted Succesfully');
      // navigation.goBack();
      // route.params.reloadData();
      // dispatch({
      //   type: EDITNEWSPOST,
      //   payload: {
      //     msg: 'Post added Succesfully',
      //     id: data,
      //   },
      // });
      // bcoz we dont want to add more data from here.
    } catch (error) {
      dispatch({ type: ERRORADDEDNEWS, payload: 'network error' });
    }
  };
};
