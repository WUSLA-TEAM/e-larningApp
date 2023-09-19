import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import Video from 'react-native-video';
import {TouchableRipple} from 'react-native-paper';

const {width, height} = Dimensions.get('window');

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
        setVideoUri(response.assets[0].uri);
        console.log(response.assets[0].uri);
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

    console.log(up);
  };

  return (
    <View style={style.container}>
      <View style={style.wrapper}>
        <View style={style.form}>
          <Text style={style.text}>Title of the Vidoe</Text>
          <TextInput value={name} onChangeText={setName} style={style.input} />
          <Text style={style.text}>Description of the video</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            style={style.input}
          />
          <Text style={style.text}>Notes for the users</Text>
          <TextInput
            value={notes}
            onChangeText={setNotes}
            style={style.input}
          />
          <TouchableRipple style={[style.button]} onPress={handleVideoSelect}>
            <Image
              source={require('../../../../assets/images/plus.png')}
              style={style.plusButton}
            />
          </TouchableRipple>
          {/* <Button title="Select Video" /> */}
          {videoUri ? (
            <Video
              source={{uri: videoUri}}
              resizeMode="contain"
              style={{
                width: width * 0.8,
                height: height * 0.3,
                // borderRadius: width * 0.4,
              }}
            />
          ) : (
            <Text style={style.text}>No video selected</Text>
          )}
          <TouchableRipple onPress={handleUpload} style={style.uploadButton}>
            <Text style={style.uploadText}>Upload</Text>
          </TouchableRipple>
          {/* <Button title="Upload" onPress={handleUpload} /> */}
        </View>
      </View>
    </View>
  );
};

export default Storage;

const style = StyleSheet.create({
  container: {
    // display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#724EB7',
    width: width * 0.9,
    height: height * 0.7,
    borderRadius: width * 0.023,
  },
  form: {
    width: width * 0.8,
  },
  input: {
    borderBottomWidth: height * 0.001,
    borderBottomColor: '#FFF',
    marginBottom: height * 0.02,
  },
  text: {
    fontSize: height * 0.02,
    fontWeight: 'bold',
    color: '#FFF',
  },
  button: {
    height: height * 0.054,
    backgroundColor: '#724EB7',
    width: width * 0.1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width * 0.034,
  },
  plusButton: {
    height: height * 0.04,
    width: width * 0.065,
  },
  uploadButton: {
    width: width * 0.24,
    height: height * 0.054,
    backgroundColor: '#FFF',
    borderRadius: width * 0.023,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.003,
  },
  uploadText: {
    color: '#242424',
    fontSize: height * 0.024,
    // fontWeight: 'bold',
    fontFamily: 'OpenSans-ExtraBold',
  },
});
