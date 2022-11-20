import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  ToastAndroid,
  ScrollView
} from 'react-native';
import React, { useEffect, useState } from 'react';

import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { addNews } from '../redux/Actions/postActions';

const EditPage = ({ navigation, route }) => {
  const id = route.params.id;
  const title = route.params.title;
  const image = route.params.image;
  const description = route.params.description;
  const categoryName = route.params.categoryName;

  const [state, setState] = useState({
    title: route.params.data,
    body: route.params.body,
    categoryName: route.params.categoryName,
  });
  const [head, setHead] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    setBody(description);
    setHead(title);
    setCategory(category);
    // dispatch(addNews(data));

  }, []);

  // useEffect(() => {
  // }, []);

  // console.log('edit wala page', route.params);

  const ImagePick = () => {
    // choose from gallery
    //    ImagePicker.openPicker({
    //   width: 300,
    //   height: 400,
    //   cropping: true,
    // }).then(image => {
    //   setPic(image.path)
    // });

    // choose from camera
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setPic(image.path);
    });
  }

  const onSubmit = () => {
    console.log('Inside insubmit: ' + head);
    console.log('Inside body: ' + body);
    console.log('Inside body: ' + id);
    console.log('Inside category: ' + categoryName);
    dispatch(addNews(data));
    navigation.goBack();
    // route.params.reloadData();
  };

  return (
    <View>
      <Button
        title={'save changes'}
        onPress={() => {
          onSubmit();
        }}
      />
      <Text>EditPage</Text>
      <Text>{id}</Text>
      <TextInput
        autoFocus
        style={styles.inputF}
        value={head}
        onChangeText={title => setHead(title)}
      />
      <TouchableOpacity
        onPress={() => {
          ImagePick();
        }}>
        <Image
          source={{
            uri: image,
          }}
          style={{
            height: '40%',
            width: '80%',
            margin: 30,
            resizeMode: "contain",
          }}
        />
      </TouchableOpacity>
      <TextInput
        style={styles.inputF}
        value={category}
        onChangeText={value => setCategory(value)}
      />
      <TextInput
        style={styles.inputF}
        value={body}
        onChangeText={value => setBody(value)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputF: {
    borderWidth: 2,
    backgroundColor: 'white',
    margin: 14,
    color: 'black',
  },
});

export default EditPage;
