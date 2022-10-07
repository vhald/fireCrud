import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Button,
  Image,
  Pressable,
  FlatList,
  Modal,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import toast from 'react-native-simple-toast';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import Moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';
import _ from 'lodash';
import {getCategory} from '../redux/Actions/categoryActions';
import {getAllNews} from '../redux/Actions/postActions';
// import {GETNEWSCATEGORIES} from '../redux/Reducers/newsCategoriesReducer';
// import {ADDNEWSPOST} from '../redux/Reducers/newsPostsReducer';

export default function AddPost({navigation, route}) {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // const [url, setUrl] = useState('https://via.placeholder.com/150');

  const [pic, setPic] = useState('https://via.placeholder.com/150');

  const [state, setState] = useState({data: []});
  const [modalVisible, setModalVisible] = useState(false);
  const [select, setSelect] = useState({
    name: 'Select Categories ...',
    id: null,
  });

  const [open, setOpen] = useState(false); // status of dropdownload status = false, status = true
  const [value, setValue] = useState(null); //to store select option of dropdown
  // const [items, setItems] = useState([]);

  const items = useSelector(state => state.categories.newscategories);
  let msg = useSelector(state => state.categories.msg);

  useEffect(() => {
    console.log('value: ', value);
  }, [value]);

  const onSelectItem = item => {
    setSelect(item);
    toggleModal();
  };

  // const toggleModal = () => {
  //   setModalVisible(!modalVisible);
  // };

  useEffect(() => {
    // selectCategory(state);
    if ((msg = 'post_added')) {
      toast.show('post added successfully');
      navigation.goBack();
      dispatch(getAllNews());
    }
    if ((msg = 'network_error')) {
      toast.show('network error');
    }
  }, [msg]);

  useEffect(() => {
    // selectCategory(state);
    selectedCategory();
  }, []);

  const ImagePick = () => {
    //    ImagePicker.openPicker({
    //   width: 300,
    //   height: 400,
    //   cropping: true,
    // }).then(image => {
    //   setPic(image.path)
    // });

    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setPic(image.path);
    });
  };

  const Submit = async () => {
    try {
      const uniqueName = Date.now();
      await storage()
        .ref(uniqueName + '.jpeg')
        .putFile(pic);
      // setLoading(true);
      const url = await storage()
        .ref(uniqueName + '.jpeg')
        .getDownloadURL();

      console.log('Inside submit: ', url);

      const catName = _.filter(items, item => {
        return item.value === value;
      });

      console.log('catName: ', catName[0].label);

      // return;

      var data = {
        id: `${uniqueName}`,
        title: String(title).trim(),
        description: String(description).trim(),
        categoryName: catName[0].label,
        categoryID: value,
        image: url,
        timeCreated: Moment().unix(),
        timeinHuman: Moment().format('DD-MM-YYYY'),
      };

      dispatch(addNews(data));

      // navigation.goBack();
      // route.params.reloadData();

      // await firestore()
      //   .collection('ghosts')
      //   .add(data)
      //   .then(res => {
      //     toast.show('Post added Succesfully');
      //     setTitle('');
      //     setDescription('');
      //   });
    } catch (e) {
      console.log('err:', e);
    }
  };

  // const renderItem = ({item}) => {
  //   return (
  //     <View style={{backgroundColor: 'white'}}>
  //       <TouchableOpacity
  //         onPress={() => {
  //           onSelectItem(item);
  //         }}
  //         style={{height: 60}}>
  //         <Text
  //           style={{color: 'white', padding: 10, fontSize: 16, marginLeft: 33}}>
  //           {item.name}
  //         </Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // };

  const selectedCategory = async () => {
    // const getCat = await getCategory();
    // console.log('get cate', getCat);
    dispatch(getCategory());
  };

  // const selectCategory = () => {
  //   firestore()
  //     .collection('categoryList')
  //     .get()
  //     .then(res => {
  //       // console.log(res.data);
  //       var categoryList = [];
  //       console.log(res.docs);
  //       res.docs.map(each => {
  //         categoryList.push({label: each.data().name, value: each.id});
  //       });
  //       // setState(prev => ({...prev, data: categoryList}));
  //       console.log('category listing: ', categoryList);
  //       setItems([...categoryList]);
  //     })
  //     .catch(e => {
  //       console.log('err: ', e);
  //     });
  // };

  // useEffect(() => {
  //   console.log('state.data', state.data);
  // }, [state.data]);

  return (
    <View style={{flex: 1}}>
      <View style={{paddingHorizontal: 10, flex: 1}}>
        <Text style={{color: 'black', fontSize: 24, paddingVertical: 30}}>
          Add a news
        </Text>
        <Text style={styles.mytextcolor}>
          Title{' '}
          <Text style={{color: 'red', fontSize: 12}}>(min 100 characters)</Text>
        </Text>
        <TextInput
          value={title}
          onChangeText={text => setTitle(text)}
          style={{
            ...styles.mytextcolor,
            borderWidth: 1,
            borderColor: 'grey',
            borderRadius: 4,
            padding: 3,
          }}
        />
        <View style={{marginVertical: 10}}>
          <Text style={styles.mytextcolor}>Description</Text>
          <TextInput
            multiline
            numberOfLines={3}
            value={description}
            onChangeText={text => setDescription(text)}
            style={{
              ...styles.mytextcolor,
              borderWidth: 1,
              borderColor: 'grey',
              borderRadius: 4,
              padding: 3,
            }}
          />
        </View>
        <Text style={styles.mytextcolor}>Categories</Text>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
        />
        <View
          style={{
            flexDirection: 'row',
            height: 300,
          }}>
          <View
            style={{
              height: '50%',
              width: '40%',
              margin: 10,
              borderWidth: 2,
            }}>
            <Image
              style={{
                resizeBy: 'contain',
                height: '100%',
                width: '100%',
                backgroundColor: 'yellow',
              }}
              source={{
                // uri: url,
                uri: pic,
              }}
            />
          </View>
          <TouchableOpacity
            style={{
              height: '50%',
              width: '40%',
              margin: 10,
              borderWidth: 2,
            }}
            onPress={() => {
              ImagePick();
            }}>
            <Text style={{textAlign: 'center'}}>Tap to upload</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          disabled={String(title).length < 1 || String(description).length < 1}
          style={{
            backgroundColor: '#f3aaaa',
            borderRadius: 5,
            height: 36,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 26,
          }}
          onPress={() => Submit()}>
          <Text style={{color: 'black', alignItems: 'center'}}>Add A Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = {
  mytextcolor: {
    fontSize: 16,
    color: 'black',
  },
};
