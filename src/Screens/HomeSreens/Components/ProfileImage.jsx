import React, {useState, useContext} from 'react';
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
import {UserContext} from '../../../Server/Firebase/Firestore/FirestoreService';

const {width, height} = Dimensions.get('window');

const ProfileImage = () => {
  const userData = useContext(UserContext); // Use UserContext as an argument

  const [imageUrl, setimageUrl] = useState('');
  const dataToUpload = {};

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
        setimageUrl(response.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error selecting Image:', error.message);
    }
  };

  const handleUpload = async () => {
    if (!imageUrl) {
      Alert.alert('Please select an image first.');
      return;
    }

    try {
      // Upload image to Firebase Storage
      const imageRef = storage().ref(`users/${userData.email}`);
      await imageRef.putFile(imageUrl);

      // Get the download URL for the image
      const imageDownloadURL = await imageRef.getDownloadURL();

      // Set the updated imageUrl in the Firestore document
      await firestore().collection('user').doc(userData.email).update({
        imageUrl: imageDownloadURL,
      });

      Alert.alert('Image uploaded successfully!');
      setimageUrl(imageDownloadURL); // Update the local state with the new image URL
    } catch (error) {
      Alert.alert('Error uploading image:', error.message);
    }
  };

  return (
    <ScrollView>
      <View style={style.container}>
        <View style={style.wrapper}>
          <TouchableRipple style={style.button} onPress={handleImageSelect}>
            <Image
              source={require('../../../../assets/images/plus.png')}
              style={style.plusButton}
            />
          </TouchableRipple>
          {imageUrl ? (
            <Image
              source={{uri: imageUrl}}
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
    </ScrollView>
  );
};

export default ProfileImage;

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
