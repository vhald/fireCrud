import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Share from 'react-native-share';
import Icon from 'react-native-vector-icons/AntDesign';
// const hell = require('../assets/images/hell.png');
const hell =
  'https://res.cloudinary.com/dtrz6ksme/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1663825492/sample.jpg';

// this is base 64th image stored in an variable.
// const base64 = '';
// const base64Data =

const ShareLib = file_url => {
  // let imagePath = null;
  // if (image) {
  //   RNFetchBlob.config({
  //     fileCache: true,
  //   })
  //     .fetch('GET', image)

  //     const url = 'https:';

  //     .then(resp => {
  //       imagePath = resp.path();
  //       console.log('image: ',imagePath, resp.readFile('base64'));
  //       return resp.readFile('base64');
  //     })
  //     .then(base64Data => {

  // let imageUrl = 'data:image/jpeg;base64,' + '';

  //   let imagePath = null;
  //   RNFetchBlob.config({
  //     fileCache: true,
  //   })
  //     .fetch('GET', file_url)
  //     // the image is now dowloaded to device's storage
  //     .then(resp => {
  //       // the image path you can use it directly with Image component
  //       imagePath = resp.path();
  //       return resp.readFile('base64');
  //     })
  //     .then(async base64Data => {
  //       var base64Data = `data:image/png;base64,` + base64Data;
  //       // here's base64 encoded image
  //       await Share.open({url: base64Data});
  //       // remove the file from storage
  //       return fs.unlink(imagePath);
  //     });
  // }

  // const BASE_STRING =

  // let shareImage = {
  //   message: `this is message`,
  //   url: `${BASE_STRING}`,
  // };

  // Share.open(shareImage)
  //   .then(res => {
  //     console.log(res);
  //   })
  //   .catch(err => {
  //     err && console.log('kon bola', err);
  //   });
  // const shareContent = () => {
  //   Share.open({
  //     title: 'this is title',
  //     message: 'This is the share message, which is usually an URL',
  //     url: '',
  //   })
  //     .then(res => {
  //       console.log(res);
  //     })
  //     .catch(err => {
  //       err && console.log(err);
  //     });
  const dwFile = file_url => {
    let imagePath = null;
    RNFetchBlob.config({
      fileCache: true,
    })
      .fetch('GET', file_url)
      // the image is now dowloaded to device's storage
      .then(a => {
        // the image path you can use it directly with Image component
        imagePath = a.path();
        return a.readFile('base64');
      })
      .then(async base64Data => {
        var base64Data = `data:image/png;base64,` + base64Data;
        // here's base64 encoded image
        await Share.open({url: base64Data});
        // remove the file from storage
        return fs.unlink(imagePath);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={{flex: 1, padding: 20}}>
      <Text>ShareLib</Text>
      <TouchableOpacity
        style={{backgroundColor: 'yellow', width: 100, height: 100}}
        activeOpacity={0.6}
        onPress={() => dwFile(hell)}>
        <Text style={{padding: 20}}>
          <Icon name="sharealt" size={40} color={'#E0E'} style />
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default ShareLib;
