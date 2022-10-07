import {View, Text, TextInput, Button} from 'react-native';
import React, {useState} from 'react';

const PushNotif = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  return (
    <>
      <View style={{margin: 10, padding: 10}}>
        <Text>This is push notification form</Text>
        <Text>title</Text>
        <TextInput
          value={title}
          onChangeText={text => setTitle(text)}
          style={{
            borderWidth: 1,
            borderColor: 'grey',
            borderRadius: 4,
            padding: 3,
          }}
        />

        <Text>body</Text>

        <TextInput
          value={description}
          onChangeText={text => setDescription(text)}
          style={{
            borderWidth: 1,
            borderColor: 'grey',
            borderRadius: 4,
            padding: 3,
            marginBottom: 5,
          }}
        />
        <Button title="submit" onPress={() => {}} />
      </View>
    </>
  );
};

export default PushNotif;
