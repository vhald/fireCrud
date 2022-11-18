import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  TextInput,
  FlatList,
  Alert,
  SectionList,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AntDesign from 'react-native-vector-icons/AntDesign';
import toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import _ from 'lodash';
import {getAllNews} from '../redux/Actions/postActions';
import {getCategory} from '../redux/Actions/categoryActions';

import {useSelector, useDispatch} from 'react-redux';

const CategoryList = ({navigation}) => {
  const dispatch = useDispatch();

  const categories = useSelector(state => state.categories.newsCategories);
  //const [sectiondata, set_sectiondata] = useState(null)
  const [sectiondata, set_sectiondata] = useState([]);

  useEffect(() => {
    //dispatch(getCategory());
    console.log(categories);
  }, []);

  useEffect(() => {
    if (categories?.length > 0) {
      var parentsOnly = _.filter(categories, each => each.parentID === null);
      console.log('parentsOnly');
      console.log(parentsOnly);

      var data = [];
      _.map(parentsOnly, (each, index) => {
        var tmp2 = [];
        _.map(categories, each2 => {
          if (each2.parentID === each.value) {
            tmp2.push(each2);
          }
        });
        data.push({title: each, data: tmp2});
      });
      console.log('data finally', data);
      set_sectiondata(data);
    }
  }, [categories]);

  useEffect(() => {
    console.log('sectiondata', sectiondata);
  }, [sectiondata]);

  const renderItem = item => {
    console.log('item>>', item);
    return (
      <View
        style={{
          height: 50,
          justifyContent: 'center',
          borderBottomColor: 'black',
          borderBottomWidth: 0.5,
        }}>
        <Text style={{paddingLeft: 10, color: 'black'}}>{item.item.label}</Text>
      </View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
        paddingBottom: 0,
      }}>
      {sectiondata !== null && (
        <SectionList
          sections={sectiondata}
          keyExtractor={(item, index) => index}
          renderItem={renderItem}
          renderSectionHeader={({section: {title}}) => (
            <View
              style={{
                height: 50,
                justifyContent: 'center',
                borderBottomColor: 'black',
                borderBottomWidth: 0.5,
              }}>
              <Text style={{fontWeight: 'bold', color: 'black'}}>
                {title.label}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default CategoryList;
