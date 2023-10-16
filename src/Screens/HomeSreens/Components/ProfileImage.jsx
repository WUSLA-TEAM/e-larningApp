// Import the necessary modules
import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Avatar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

// Define some constants
const options = {
  title: 'Select Image',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const defaultImage =
  'https://firebasestorage.googleapis.com/v0/b/react-native-firebase-9ad26.appspot.com/o/default.png?alt=media&token=8a28e1f8-556f-4d41-8b04-8d38f9dfecf9';

// Define the main component
const ProfileImage = () => {
  // Define the state variables
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);

  // Get the navigation prop
  const navigation = useNavigation();

  // Get the current user from Firebase Authentication
  const user = auth().currentUser;

  // Define a function to get the user image from Firebase Storage
  const getUserImage = async () => {
    try {
      // Get the image URL from Firebase Storage
      const url = await storage().ref(`images/${user.uid}`).getDownloadURL();
      // Set the image URI state
      setImageUri(url);
    } catch (error) {
      // Handle any errors
      console.log(error);
      // Set the image URI state to the default image
      setImageUri(defaultImage);
    }
  };

  // Define a function to select an image from the device gallery or camera
  const selectImage = () => {
    // Launch the image picker
    ImagePicker.showImagePicker(options, response => {
      // Handle any errors or cancellations
      if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.didCancel) {
        console.log('User cancelled image picker');
      } else {
        // Get the image URI from the response
        const uri = response.uri;
        // Set the image URI state
        setImageUri(uri);
      }
    });
  };

  // Define a function to upload an image to Firebase Storage
  const uploadImage = async () => {
    try {
      // Set the loading state to true
      setLoading(true);
      // Create a reference to the image in Firebase Storage
      const ref = storage().ref(`images/${user.uid}`);
      // Convert the image URI to a blob
      const blob = await uriToBlob(imageUri);
      // Upload the blob to Firebase Storage
      await ref.put(blob);
      // Set the loading state to false
      setLoading(false);
      // Navigate back to the previous screen
      navigation.goBack();
    } catch (error) {
      // Handle any errors
      console.log(error);
      // Set the loading state to false
      setLoading(false);
    }
  };

  // Define a function to update the user image in Firebase Firestore
  const updateUserImage = async () => {
    try {
      // Get the image URL from Firebase Storage
      const url = await storage().ref(`images/${user.uid}`).getDownloadURL();
      // Update the user image in Firebase Firestore
      await firestore().collection('users').doc(user.uid).update({
        image: url,
      });
    } catch (error) {
      // Handle any errors
      console.log(error);
    }
  };

  // Define a function to convert a URI to a blob
  const uriToBlob = uri => {
    return new Promise((resolve, reject) => {
      // Create a new XMLHttpRequest object
      const xhr = new XMLHttpRequest();
      // Open the request with the URI
      xhr.open('GET', uri, true);
      // Set the response type to blob
      xhr.responseType = 'blob';
      // Define the onload event handler
      xhr.onload = () => {
        // Check if the status is 200
        if (xhr.status === 200) {
          // Resolve the promise with the response blob
          resolve(xhr.response);
        } else {
          // Reject the promise with the status text
          reject(xhr.statusText);
        }
      };
      // Define the onerror event handler
      xhr.onerror = () => {
        // Reject the promise with the error
        reject(new Error('URI to Blob failed'));
      };
      // Send the request
      xhr.send();
    });
  };

  // Use the useEffect hook to get the user image when the component mounts
  useEffect(() => {
    getUserImage();
  }, []);

  // Return the UI elements
  return (
    <View style={styles.container}>
      <Avatar.Image size={200} source={{uri: imageUri}} />
      <Button mode="contained" onPress={selectImage}>
        Select Image
      </Button>
      <Button mode="contained" onPress={uploadImage} loading={loading}>
        Update Image
      </Button>
    </View>
  );
};

// Define the styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

// Export the component
export default ProfileImage;
