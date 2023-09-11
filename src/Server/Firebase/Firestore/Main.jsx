import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput, Button} from 'react-native';
import firebase from 'firebase/app';
import firestore from 'firebase/firestore';

const Main = () => {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    const ref = firebase.firestore().collection('user').doc();
    ref.set({name});
  };

  return (
    <View style={styles.container}>
      <Text>Enter your name:</Text>
      <TextInput value={name} onChangeText={setName} />
      <Button title="Upload" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Main;
