import {
  View,
  Text,
  Image,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const DetailPage = ({navigation, route}) => {
  const id = route.params.id;
  const title = route.params.title;
  const image = route.params.image;
  const description = route.params.description;
  const category = route.params.categoryName;

  return (
    <View style={styles.container}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {/* <Text>{id}</Text> */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Edit', {
                id,
                title,
                description,
                image,
                // reload: getData(),
              });
            }}>
            <Text>EDIT</Text>
          </TouchableOpacity>
        </View>
        <Text style={{fontSize: 30}}>{title}</Text>
        <Image
          source={{uri: image}}
          style={{
            height: 300,
            width: 300,
            margin: 20,
            padding: 20,
            resizeMode: 'stretch',
          }}
        />
        <Text style={{color: 'green', fontSize: 14}}>{category}</Text>
        <Text style={{fontSize: 20}}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
});

export default DetailPage;
