import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  ImageBackground,
  Alert,
  Button,
  DevSettings,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import firestore from '@react-native-firebase/firestore';
import toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import DropDownPicker from 'react-native-dropdown-picker';
import _ from 'lodash';
// import PushController from './Screens/PushNotif';
import {deleteNews, getAllNews} from './redux/Actions/postActions';
import {getCategory} from './redux/store/categoryActions';

const bell = (
  <Icon
    name="bells"
    size={30}
    color={'red'}
    style={{padding: 20, alignContent: 'flex-start'}}
  />
);
const user = (
  <Icon
    name="user"
    size={30}
    color={'#111'}
    style={{padding: 20, alignContent: 'flex-start'}}
  />
);
const filter = (
  <Icon
    name="filter"
    size={30}
    color={'#f1f1d1'}
    style={{padding: 20, alignContent: 'flex-start'}}
  />
);
const del = (
  <Icon
    name="delete"
    size={20}
    color={'red'}
    style={{padding: 20, alignContent: 'flex-start'}}
  />
);
const add = (
  <Icon
    name="pluscircle"
    size={20}
    color={'#777'}
    style={{padding: 20, alignContent: 'flex-start'}}
  />
);
const edit = (
  <Icon
    name="edit"
    size={20}
    color={'black'}
    style={{padding: 20, alignContent: 'flex-start'}}
  />
);
const share = (
  <Icon
    name="sharealt"
    size={20}
    color={'black'}
    style={{padding: 20, alignContent: 'flex-start'}}
  />
);
const menu = <Icon name={'menufold'} size={24} color={'blue'} />;

const HomePage = ({navigation, route, params}) => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.newsposts);
  // console.log('Post data here: ', posts);

  const [state, setState] = useState({
    loading: true,
    data: [],
    postData: [],
    commentsData: [],
  });

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  // const [visited, setVisited] = useState([])
  const [VisitedItem, setVisited] = useState([]);

  // it works like a state variable

  useEffect(() => {
    console.log('redux post before after', posts);
  }, [posts]);

  useEffect(() => {
    // getData();
    getAsyncData();
    console.log('Visited data: ' + VisitedItem);

    dispatch(getAllNews());
    // const tt = auth().currentUser;
    // console.log(tt);
  }, []);

  const getAsyncData = async () => {
    try {
      const res = await AsyncStorage.getItem('VisituniqueKey');
      if (res !== null) {
        var uidData = JSON.parse(res);
        setVisited(uidData);
        console.log('Response of async ' + res);
      }
    } catch (error) {
      // Error retrieving data
      console.log('error', error);
    }
  };

  const getData = async () => {
    var myData = [];
    firestore()
      .collection('ghosts')
      .get()
      .then(getData => {
        console.log('getData', getData);
        getData.docs.map(each => {
          console.log('data', each.data(), each.id);
          myData.push({...each.data(), id: each.id});
          setState(prev => ({...prev, loading: false, data: myData}));
        });
      })
      .catch(error => {
        console.log('error', error);
        setState(prev => ({...prev, loading: false}));
        toast.show('network problem', toast.LONG);
      });
  };

  // const catArray = [
  //   '1It2pDHEjyr5Srj2nYjH',
  //   '1ceK2UStFYGMeZkDTYtf',
  //   '702vBOr5iWpBYxd0n9xl',
  //   'HI6v3ny4iBthSgZig83G',
  //   'WNg7oOkLNg95dk8qrMxt',
  //   'WuoslbX3Tnjf2cAHGUQe',
  //   'YZZWOd5VOV8IGSrdKYp1',
  // ];

  // const category = () => {
  //   firestore()
  //     .collection('categoryList')
  //     .where('catID', 'in', catArray)
  //     .get()
  //     .then(res => {
  //       res.forEach(doc => {
  //         setData([doc.data()]);
  //       });
  //     });
  // };

  const deleteDocument = id => {
    dispatch(deleteNews(id));

    // firestore()
    //   .collection('ghosts')
    //   .doc(id)
    //   .delete()
    //   .then(() => {
    //     toast.show('post deleted successfully');
    //     getData();
    //   })
    //   .catch(error => {
    //     toast.show('Error to Delete');
    //   });
  };

  const preDelete = id => {
    Alert.alert('Alert', 'Are you sure, want to delete?', [
      {
        text: 'Cancel',
        onPress: () => {
          console.log('cancel pressed');
        },
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          deleteDocument(id);
        },
      },
    ]);
  };

  const description = async data => {
    // console.log('Data: ' + JSON.stringify(data));
    // console.log('VisitedItem: ', VisitedItem);
    navigation.navigate('Details', {
      id: data.id,
      title: data.title,
      description: data.description,
      image: data.image,
      category: data.categoryName,
    });
    const {id} = data;
    const tempVisited = VisitedItem;
    if (tempVisited.indexOf(id) == -1) {
      tempVisited.push(id);
    }
    setVisited([...tempVisited]);
    console.log('tempVisited: ', tempVisited);
    const convertToString = JSON.stringify(tempVisited);
    try {
      await AsyncStorage.setItem('VisituniqueKey', convertToString);
    } catch (error) {
      console.log('error', error);
      // Error saving data
    }
  };

  return (
    <>
      {/* <Button
        title={'rough Page'}
        onPress={() => navigation.navigate('Rough')}
      />

      <Button
        title={'Clear Async Storage'}
        onPress={() => {
          AsyncStorage.clear();
          DevSettings.reload(); // to make the page to reload.
        }}
      /> */}
      {/*  */}
      {/* <TouchableOpacity
        onPress={() => navigation.navigate('addcategory')}
        style={{
          position: 'absolute',
          width: 50,
          padding: 5,
          height: 40,
          borderRadius: 25,
          backgroundColor: '#8aa',
          justifyContent: 'center',
          alignItems: 'center',
          right: '22%',
          zIndex: 999,
          top: 10,
        }}>
        {add}
      </TouchableOpacity> */}

      {/* <TouchableOpacity
        onPress={() => navigation.navigate('categorylist')}
        style={{
          marginLeft: 20,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 4,
          right: '45%',
          backgroundColor: 'white',
        }}>
        {menu}
      </TouchableOpacity> */}

      {/* --  */}

      <TouchableOpacity
        style={{
          position: 'absolute',
          width: 110,
          padding: 5,
          height: 50,
          borderRadius: 25,
          backgroundColor: '#8fa',
          justifyContent: 'center',
          alignItems: 'center',
          bottom: 20,
          right: '35%',
          zIndex: 999,
        }}
        onPress={() => navigation.navigate('Add', {reloadData: getData})}>
        <Text style={{color: 'red', fontWeight: 'bold'}}> {add} Add News</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          position: 'absolute',
          width: 50,
          padding: 5,
          height: 40,
          borderRadius: 25,
          backgroundColor: '#8aa',
          justifyContent: 'center',
          alignItems: 'center',
          right: '2%',
          zIndex: 999,
          top: 10,
          // elevation: 1,
        }}
        onPress={async () => {
          auth().signOut();
          await GoogleSignin.signOut();
        }}>
        <Text style={{color: 'red', fontWeight: 'bold'}}>{user}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          position: 'absolute',
          width: 50,
          padding: 5,
          height: 40,
          borderRadius: 25,
          backgroundColor: '#8aa',
          justifyContent: 'center',
          alignItems: 'center',
          right: '14%',
          zIndex: 999,
          top: 10,
        }}
        onPress={() => {
          navigation.navigate('addcategory');
        }}>
        <Text style={{color: 'red', fontWeight: 'bold'}}>{filter}</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={{
          position: 'absolute',
          width: 50,
          padding: 5,
          height: 40,
          borderRadius: 25,
          backgroundColor: '#8aa',
          justifyContent: 'center',
          alignItems: 'center',
          left: '14%',
          top: 10,
          elevation: 2,
          zIndex: 999,
        }}
        onPress={() => {
          navigation.navigate('PushNotif');
        }}>
        <Text style={{color: 'red', fontWeight: 'bold'}}>{bell}</Text>
      </TouchableOpacity> */}
      {/* <TouchableOpacity
        style={{
          position: 'absolute',
          width: 40,
          padding: 5,
          height: 30,
          borderRadius: 25,
          backgroundColor: '#8aa',
          justifyContent: 'center',
          alignItems: 'center',
          left: '10%',
          zIndex: 999,
          top: 60,
        }}
        onPress={() => {
          navigation.navigate('Share');
        }}>
        <Text style={{color: 'black'}}>{share}</Text>
      </TouchableOpacity> */}
      {state.loading !== true && (
        <ActivityIndicator size="large" color="blue" />
      )}
      <View style={{height: 60}}>
        {/* <Text
          style={{
            color: 'red',
            fontWeight: 'bold',
            alignSelf: 'flex-end',
            right: 30,
            margin: 10,
          }}>
          {' '}
          {add} Add News
        </Text> */}
        <View
          style={{
            backgroundColor: '#171717',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 15,
            zIndex: 990,
          }}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            theme="DARK"
            multiple={true}
            mode="BADGE"
            listMode="MODAL"
            badgeDotColors={[
              '#e76f51',
              '#00b4d8',
              '#e9c46a',
              '#e76f51',
              '#8ac926',
              '#00b4d8',
              '#e9c46a',
            ]}
            style={{width: '50%', alignSelf: 'center'}}
          />
        </View>
      </View>
      <ScrollView>
        {posts?.map(data => (
          <TouchableOpacity
            onPress={() => {
              description(data);
              navigation.navigate('Details', {
                id: data.id,
                title: data.title,
                description: data.description,
                image: data.image,
                categoryName: data.categoryName,
              });
            }}
            key={data.id}>
            <View
              style={[
                {
                  borderWidth: 1,
                  borderColor: 'grey',
                  padding: 10,
                  width: '95%',
                  height: 220,
                  margin: 10,
                  borderRadius: 10,
                  backgroundColor:
                    VisitedItem.indexOf(data.id) !== -1 ? 'grey' : 'white',
                },
              ]}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{flex: 1}}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 17,
                      fontWeight: 'bold',
                    }}>
                    {data.title}
                  </Text>
                  <Text style={{color: 'green', fontSize: 12}}>
                    {data.categoryName}
                  </Text>
                  <Text
                    numberOfLines={5}
                    style={{
                      color: 'black',
                      fontSize: 14,
                      marginTop: 10,
                    }}>
                    {data.description}
                  </Text>
                  <Text style={{color: 'grey'}}>Click to read more ...</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    padding: 10,
                    alignItems: 'flex-end',
                  }}>
                  <Image
                    style={{width: 200, height: 120}}
                    source={{uri: data.image}}
                  />
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('Edit', {
                          id: data.id,
                          title: data.title,
                          description: data.description,
                          image: data.image,
                          categoryName: data.categoryName,
                          reload: getData(),
                        });
                      }}
                      style={{
                        backgroundColor: 'rgba(255,222,0,1)',
                        borderRadius: 50,
                        padding: 10,
                        margin: 10,
                        marginRight: 0,
                        alignContent: 'flex-end',
                      }}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 20,
                        }}>
                        {edit}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        preDelete(data.id);
                      }}
                      style={{
                        backgroundColor: 'rgba(255,0,0,0.2)',
                        borderRadius: 50,
                        padding: 10,
                        margin: 10,
                        marginRight: 0,
                        alignContent: 'flex-end',
                      }}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 20,
                        }}>
                        {del}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  modals: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },

  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default HomePage;
