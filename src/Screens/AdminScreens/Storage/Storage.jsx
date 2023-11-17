import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
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
  const [imageUri, setImageUri] = useState('');

  const handleVideoSelect = async () => {
    const options = {
      mediaType: 'video',
    };

    try {
      const response = await launchImageLibrary(options);

      if (response.didCancel) {
        Alert.alert('You cancelled video selection.');
      } else if (response.error) {
        Alert.alert('Error selecting video:', response.error);
      } else {
        setVideoUri(response.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error selecting video:', error.message);
    }
  };

  const handleImageSelect = async () => {
    const options = {
      mediaType: 'photo',
    };

    try {
      const response = await launchImageLibrary(options);

      if (response.didCancel) {
        Alert.alert('You cancelled Image selection.');
      } else if (response.error) {
        Alert.alert('Error selecting Image:', response.error);
      } else {
        setImageUri(response.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error selecting Image:', error.message);
    }
  };

  const handleUpload = async () => {
    if (!name || !description || !notes || (!videoUri && !imageUri)) {
      Alert.alert('All fields are required.');
      return;
    }

    try {
      const dataToUpload = {
        name,
        description,
        notes,
      };

      if (videoUri) {
        // Upload video to Firebase Storage
        const videoRef = storage().ref(`videos/${name}.mp4`);
        await videoRef.putFile(videoUri);

        // Get the download URL for the video
        const videoDownloadURL = await videoRef.getDownloadURL();

        // Add video data to upload object
        dataToUpload.type = 'video';
        dataToUpload.videoUrl = videoDownloadURL;
      }

      if (imageUri) {
        // Upload image to Firebase Storage
        const imageRef = storage().ref(`images/${name}.png`);
        await imageRef.putFile(imageUri);

        // Get the download URL for the image
        const imageDownloadURL = await imageRef.getDownloadURL();

        // Add image data to upload object
        dataToUpload.type = 'image';
        dataToUpload.imageUrl = imageDownloadURL;
      }

      // Upload metadata to Firestore for video or image
      await firestore().collection('StorageData').add(dataToUpload);

      Alert.alert('Data uploaded successfully!');
      setName('');
      setDescription('');
      setNotes('');
      setVideoUri('');
      setImageUri('');
    } catch (error) {
      Alert.alert('Error uploading data:', error.message);
    }
  };
  const responsiveStyles = StyleSheet.create({
    input: {
      width: width * 0.8,
    },
    button: {
      width: width * 0.1,
    },
    uploadButton: {
      width: width * 0.24,
    },
  });

  return (
    <ScrollView>
      <View style={style.container}>
        <View style={style.wrapper}>
          <View style={style.form}>
            <Text style={style.text}>Title</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              style={[style.input, responsiveStyles.input]}
              placeholder="Enter a title."
              placeholderTextColor="#e1e1e1"
            />
            <Text style={style.text}>Description</Text>
            <TextInput
              value={description}
              onChangeText={setDescription}
              style={[style.input, responsiveStyles.input]}
              multiline
              numberOfLines={4}
              placeholder="Enter a description."
              placeholderTextColor="#e1e1e1"
            />
            <Text style={style.text}>Notes</Text>
            <TextInput
              value={notes}
              onChangeText={setNotes}
              style={[style.input, responsiveStyles.input]}
              multiline
              numberOfLines={4}
              placeholder="Enter notes for users."
              placeholderTextColor="#e1e1e1"
            />
            <TouchableRipple
              style={[style.button, responsiveStyles.button]}
              onPress={handleVideoSelect}>
              <Image
                source={require('../../../../assets/images/plus.png')}
                style={style.plusButton}
              />
            </TouchableRipple>
            {videoUri ? (
              <Video
                source={{uri: videoUri}}
                resizeMode="contain"
                style={{
                  width: width * 0.8,
                  height: height * 0.3,
                }}
              />
            ) : (
              <Text style={style.text}>No video selected</Text>
            )}
            <TouchableRipple
              style={[style.button, responsiveStyles.button]}
              onPress={handleImageSelect}>
              <Image
                source={require('../../../../assets/images/plus.png')}
                style={style.plusButton}
              />
            </TouchableRipple>
            {imageUri ? (
              <Image
                source={{uri: imageUri}}
                style={{
                  width: width * 0.8,
                  height: height * 0.3,
                  borderRadius: width * 0.04,
                }}
              />
            ) : (
              <Text style={style.text}>No image selected</Text>
            )}
            <TouchableRipple onPress={handleUpload} style={style.uploadButton}>
              <Text style={style.uploadText}>Upload</Text>
            </TouchableRipple>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Storage;

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: height * 0.023,
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#724EB7',
    width: width * 0.9,
    borderRadius: width * 0.023,
    paddingTop: height * 0.05,
    paddingBottom: height * 0.05,
  },
  form: {
    width: width * 0.8,
  },
  input: {
    borderBottomWidth: height * 0.001,
    borderBottomColor: '#FFF',
    marginBottom: height * 0.02,
    color: '#FFF',
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.003,
  },
  uploadText: {
    color: '#242424',
    fontSize: height * 0.024,
  },
});
