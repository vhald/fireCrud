import {
  View,
  Text,
  Image,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

const myIcon = <Icon name="arrowleft" size={20} color="#111" />;

const edit = <Icon name="edit" size={20} color={'black'} />;

const DetailPage = ({ navigation, route }) => {
  const id = route.params.id;
  const title = route.params.title;
  const image = route.params.image;
  const description = route.params.description;
  const category = route.params.categoryName;

  return (
    <View style={styles.container}>
      <View>
        {/* <Text>{id}</Text> */}
        <Image
          source={{ uri: image }}
          style={{
            height: 250,
            width: '100%',
            resizeMode: 'cover',
          }}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            position: 'absolute',
            backgroundColor: 'rgba(216, 207, 215, 0.3)',
            borderRadius: 30,
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexDirection: 'row',
            margin: 10,
            padding: 10,
            fontFamily: 'Roboto',
          }}>
          {myIcon}
          <Text style={{ color: 'black' }}> Dashboard</Text>
        </TouchableOpacity>
        <View style={styles.detail1}>
          <ScrollView>
            <View
              style={{
                flexDirection: 'row',
                marginLeft: 10,
                paddingRight: 10,
                justifyContent: 'space-between',
              }}>
              <Text style={styles.tags}>{category}</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('edit', {
                    id,
                    title,
                    description,
                    image,
                    // reload: getData(),
                  });
                }}>
                <Text style={styles.tagsEdit}>{edit}</Text>
              </TouchableOpacity>
            </View>
            <View style={{ margin: 25 }}>
              <Text style={{ fontSize: 30 }}>{title}</Text>
              <Text style={{ padding: 10, fontSize: 14 }}>{description}</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image1: {
    height: '35%',
    width: '100%',
  },
  detail1: {
    padding: 10,
    borderRadius: 30,
    height: '58%',
    marginTop: -25,
    backgroundColor: 'white',
  },
  tags: {
    backgroundColor: 'rgba(216, 207, 215, 0.6)',
    height: 35,
    borderRadius: 30,
    flexDirection: 'row',
    margin: 5,
    padding: 10,
    fontSize: 12,
    color: 'blue',
  },
  tagsEdit: {
    backgroundColor: 'rgba(255,220,0,0.5)',
    borderRadius: 40,
    flexDirection: 'row',
    padding: 10,
    fontSize: 12,
    color: 'black',
  },
});

export default DetailPage;
