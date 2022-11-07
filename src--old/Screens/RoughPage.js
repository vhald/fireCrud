import {View, Text, Image, Button, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ImagePicker, {openCamera} from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-action-sheet';

const RoughPage = ({navigation, route}) => {
  const [pic, setPic] = useState('https://via.placeholder.com/150');

  // const openActionSheet = () => {
  //   const BUTTONSandroid = ['Camera', 'Gallery', 'Cancel'];

  //   var CANCEL_INDEX = 3;

  //   ActionSheet.showActionSheetWithOptions(
  //     {
  //       options:BUTTONSandroid,
  //       cancelButtonIndex: CANCEL_INDEX,
  //       tintColor: 'blue',
  //     },
  //     buttonIndex => {
  //       console.log('button clicked :', buttonIndex);
  //     },
  //   );
  // };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setPic(image.path);
    });
  };

  // const openPicker = () => {
  //   ImagePicker.openPicker({
  //     width: 300,
  //     height: 400,
  //     cropping: true,
  //   }).then(image => {
  //     setPic(image.path);
  //   });
  // };

  const submitForm = () => {
    const datee = Date.now();

    console.log('Inside Submit form', pic);

    return storage()
      .ref(`${datee}`)
      .putFile(pic)
      .then(res => {
        console.log('res', res);
        navigation.navigate('Home');
        return storage().ref(`${datee}`).getDownloadURL();
      })
      .then(url => {
        console.log('url: ', url);
        firestore.collection('Posts').update({image: url});
      })
      .catch(e => console.log(e));
    // firestore().collection('Posts').add({title, body, status: true})
    // .then((res) => {
    //     console.log(res.id)
    //     storage().ref('sample.jpeg').putFile(selectedImage.path)
    // }).catch(e => {
    //     console.log(e)
    // })
  };

  return (
    <View>
      <Text>RoughPage</Text>
      <View style={{height: 240, width: 250, borderWidth: 2, margin: 10}}>
        <Image source={{uri: pic}} style={{height: '99%', width: '99%'}} />
      </View>
      <TouchableOpacity
        style={{
          height: '50%',
          width: '40%',
          margin: 10,
          borderWidth: 2,
        }}
        // onPress={() => {fun1()}}
        onPress={() => openCamera()}>
        <Text style={{textAlign: 'center'}}>Tap to upload</Text>
      </TouchableOpacity>
      {/* <Button
        onPress={async () => {
          // path to existing file on filesystem
          const pathToFile = `${utils.FilePath.PICTURES_DIRECTORY}/black-t-shirt-sm.png`;
          // uploads file
          await reference.putFile(pathToFile);
        }}
      /> */}
      <Button title="submit" onPress={() => submitForm()} />
    </View>
  );
};

export default RoughPage;
