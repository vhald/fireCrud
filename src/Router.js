import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomePage from './App';
import AddPost from './Screens/AddPage';
import DetailPage from './Screens/DetailPage';
import EditPage from './Screens/EditPage';
import RoughPage from './Screens/RoughPage';
import LoginPage from './Screens/LoginPage';
import PushNotif from './Screens/PushNotif';
import ShareLib from './Screens/ShareLib';
import AddCategory from './Screens/AddCategory';
import CategoryList from './Screens/CategoryList';

import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import SplashScreen from 'react-native-splash-screen';

import {useDispatch} from 'react-redux';
import {getCategory} from './redux/Actions/categoryActions';

const ReadGroupStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <Drawer.Navigator initialRouteName="home">
      <Drawer.Screen
        name="tabs"
        component={BotTabs}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

export const ReadGroup = () => {
  return (
    <ReadGroupStack.Navigator>
      <ReadGroupStack.Screen
        name="read"
        component={HomePage}
        options={{headerShown: false}}
      />
      <ReadGroupStack.Screen name="edit" component={EditPage} />
      <ReadGroupStack.Screen name="detail" component={DetailPage} />
    </ReadGroupStack.Navigator>
  );
};
export const BotTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'readgroup') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else if (route.name === 'add') {
            iconName = focused ? 'at' : 'ios-list';
          } else if (route.name === 'addcategory') {
            iconName = focused ? 'ios-list' : 'ios-list';
          } else if (route.name === 'categorylist') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="readgroup"
        component={ReadGroup}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="add"
        component={AddPost}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="addcategory"
        component={AddCategory}
        options={{headerShown: false}}
      />
      <Tab.Screen name="categorylist" component={CategoryList} />
    </Tab.Navigator>
  );
};

function App(props) {
  const dispatch = useDispatch();
  const [state, setState] = useState({loading: true, currentUser: null});

  useEffect(() => {
    SplashScreen.hide();

    dispatch(getCategory());

    auth().onAuthStateChanged(user => {
      console.log('user');
      if (user) {
        var uid = user.uid;
        console.log('uid onAuthStateChanged', uid);
        setState(prev => ({...prev, currentUser: uid, loading: false}));
      } else {
        console.log('user is signout');
        setState(prev => ({...prev, currentUser: null, loading: false}));
      }
    });

    getRequest();

    // when you app will be in the foreground
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      // if(remoteMessage.data.url === 'google'){
      //
      // }
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      //console.log('Message handled in the background!', remoteMessage);
    });
  }, []);
  // const LoginPage = () => {
  //   const currentUser = auth().currentUser;
  //   console.log('currentUser on router', currentUser);
  //   setState(prev => ({...prev, currentUser, loading: false}));
  // };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '460774933374-1up8d6g3guhk5t79o5oddrmp7bpqppl2.apps.googleusercontent.com',
    });
  }, []);

  // messaging().getToken();
  const getRequest = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      //console.log('Authorization status:', authStatus);
      getToken();
    }
  };

  const getToken = () => {
    messaging()
      .getToken()
      .then(token => {
        //console.log('token for notifications',token)
        // if(auth().currentUser === null){
        //     firestore().collection('unregistedusers').add({ token: token })
        // }
        // else {
        //   firestore().collection('users').doc(auth().currentUser.uid).update({ token: token })
        // }
      })
      .catch(error => {
        console.log('erro to get a token', error);
      });

    //taxi > employees, drivers , customers // all
    messaging()
      .subscribeToTopic('customers')
      .then(() => {
        //console.log('subscribeed to topic customers')
      });
  };

  const loginPage = () => {
    const currentUser = auth().currentUser;
    setstate(prev => ({...prev, currentUser, loading: false}));
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {!state.currentUser ? (
          <Stack.Screen name="Login" component={LoginPage} />
        ) : (
          <>
            <Stack.Screen
              name="home"
              component={MyDrawer}
              // screenOptions={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
