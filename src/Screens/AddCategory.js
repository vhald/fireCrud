import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Appearance,
  Platform,
  Button,
  Image,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import toast from 'react-native-simple-toast';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-action-sheet';
import storage from '@react-native-firebase/storage';
import Modal from 'react-native-modal';
import axios from 'axios';
import _ from 'lodash';
import Moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';
import {useDispatch, useSelector} from 'react-redux';

import {
  getCategory,
  addcategory,
  loaderStatus,
} from '../redux/Actions/categoryActions';
import {GETNEWSCATEGORIES} from '../redux/Reducers/newsCategoriesReducer';

const colorScheme = Appearance.getColorScheme();

const styles = {
  //
  mytextcolor: {
    color: colorScheme === 'light' ? 'black' : 'white',
    fontSize: 15,
  },
};
function AddCategory({navigation, route, navigation: {goBack}}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const [open, setOpen] = useState(false); // status of dropdownload status = false, status = true
  const [value, setValue] = useState(null); //to store select option of dropdown
  //const [items, setItems] = useState([ ]);

  const items = useSelector(state => state.categories.newsCategories);
  const showMsg = useSelector(state => state.categories.msg);
  const loading = useSelector(state => state.categories.loading);

  const [dropdownData, set_dropdownData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('value', value);
  }, [value]);

  useEffect(() => {
    //console.log('value',value)
    if (showMsg !== null) {
      toast.show(showMsg);
    }
  }, [showMsg]);

  useEffect(() => {
    //console.log('value',value)
    if (items.length > 0) {
      let tmp = _.filter(items, each => each.parentID === null);
      set_dropdownData([
        {label: 'Select an item', value: null, parentID: null},
        ...tmp,
      ]);
    }
  }, [items]);

  const Submit = async () => {
    var titleRefined = String(title).trim();

    if (titleRefined.length < 3) {
      toast.show('Title must be 100 characters long.');
      return;
    }

    var data = {
      name: String(title).trim(),
      parentID: value,
    };

    dispatch(loaderStatus(true));

    dispatch(addcategory(data));
  };

  //model for category creating
  const [state, setState] = useState({data: []});
  const [isModalVisible, setModalVisible] = useState(false);
  const [select, setSelect] = useState({name: 'Select Category...', id: null}); //string // object name , id

  const onSelectItem = item => {
    setSelect(item);
    toggleModal();
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // useEffect(() => {
  //   //SelectCategories();

  //   // firestore().collection('newscategories').get()
  //   // .then(res => {
  //   //     res.docs.map(each => {
  //   //       firestore().collection('newscategories').doc(each.id).set({ parentID: null }, { merge: true })
  //   //     })
  //   // })
  // }, []);

  const renderItem = ({item}) => {
    return (
      <View style={{backgroundColor: 'white'}}>
        <TouchableOpacity
          onPress={() => onSelectItem(item)}
          style={{height: 60}}>
          <Text
            style={{
              color: 'black',
              padding: 10,
              fontSize: 16,
              marginLeft: 30,
            }}>
            {item.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  // const SelectCategories = async () => {
  //   //const getcategory = await getcategories()
  //   //console.log('getcategories',getcategory)
  //
  // };

  // const SelectCategories = () => {
  //   firestore()
  //     .collection('newscategories')
  //     .get()
  //     .then(response => {
  //       var categorylist = [];
  //       console.log('cats', response.size);
  //       response.docs.map(each => {
  //         //categorylist.push({...each.data(), id: each.id});
  //         categorylist.push({label: each.data().name, value: each.id });
  //
  //       });
  //       console.log('categorylist',categorylist)
  //       categorylist.push({label: 'Select an item', value: null})
  //       //setState(prev => ({...prev, data: categorylist}));
  //       setItems([...categorylist])
  //     })
  //     .catch(error => {
  //       console.log('error', error);
  //     });
  //
  //   setState(prev => ({...prev, data: [{ id: 'fCR2ae91PRZCbbKTAtJn', name: 'Finance' },  { id: 'lWK1fyIQR2NAOpH46ivz', name: 'Auto' } ]  }));
  //
  //
  //
  // };
  return (
    <View style={{flex: 1}}>
      {loading && (
        <ActivityIndicator size="large" color="blue" animating={true} />
      )}

      <Text style={{color: 'black', fontSize: 24, paddingVertical: 30}}>
        Add A Category
      </Text>

      <KeyboardAwareScrollView>
        <View style={{height: 400, paddingHorizontal: 10}}>
          <Text>
            Category Name{' '}
            <Text style={{color: 'red', fontSize: 9}}>
              (min 100 characters)
            </Text>
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
              marginBottom: 10,
            }}
          />

          <DropDownPicker
            open={open}
            setOpen={setOpen}
            value={value}
            items={dropdownData}
            setValue={setValue}
          />

          <View
            style={{
              width: '80%',
              justifyContent: 'center',
              padding: 15,
              marginLeft: 30,
            }}>
            <Button onPress={Submit} title="Submit" />
          </View>
          {/* </TouchableOpacity> */}
        </View>
      </KeyboardAwareScrollView>

      {/* <Modal isVisible={isModalVisible} style={{padding: 0, margin: 0}}>
        <View>
          <FlatList
            data={state.data}
            renderItem={renderItem}
            //setSelect={setSelect}
            keyExtractor={item => item.id}
          />
        </View>
      </Modal> */}
    </View>
  );
}

export default AddCategory;
