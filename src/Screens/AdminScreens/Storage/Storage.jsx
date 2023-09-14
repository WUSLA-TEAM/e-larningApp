// UploadScreen.js

import React, {useState} from 'react';
import {View, Text, TextInput, Button, Alert} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const Storage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState('');
  const [videoUri, setVideoUri] = useState('');

  const handleVideoSelect = () => {
    const options = {
      mediaType: 'video',
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled video selection');
      } else if (response.error) {
        console.error('ImagePicker Error: ', response.error);
      } else {
        setVideoUri(response.uri);
      }
    });
  };

  const handleUpload = async () => {
    if (!name || !description || !notes || !videoUri) {
      Alert.alert('All fields are required.');
      return;
    }

    // Upload video to Firebase Storage
    const videoRef = storage().ref(`videos/${name}.mp4`);
    await videoRef.putFile(videoUri);

    // Get the download URL
    const downloadURL = await videoRef.getDownloadURL();

    // Upload metadata to Firestore
    await firestore().collection('videos').add({
      name,
      description,
      notes,
      url: downloadURL,
    });

    Alert.alert('Video uploaded successfully!');
    setName('');
    setDescription('');
    setNotes('');
    setVideoUri('');
  };

  return (
    <View>
      <Text>Name</Text>
      <TextInput value={name} onChangeText={setName} />
      <Text>Description</Text>
      <TextInput value={description} onChangeText={setDescription} />
      <Text>Notes</Text>
      <TextInput value={notes} onChangeText={setNotes} />
      <Button title="Select Video" onPress={handleVideoSelect} />
      {videoUri ? (
        <Text>Selected Video: {videoUri}</Text>
      ) : (
        <Text>No video selected</Text>
      )}
      <Button title="Upload" onPress={handleUpload} />
      {/* <Button title="View Videos" onPress={() => navigation.navigate('View')} /> */}
    </View>
  );
};

export default Storage;
