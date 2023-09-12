import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';

// Import react-native-image-crop-picker
import ImagePicker from 'react-native-image-crop-picker';

// Import react-native-fetch-blob
import RNFetchBlob from 'react-native-fetch-blob';

// Import @react-native-firebase/storage and @react-native-firebase/firestore
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const Storage = () => {
  const [video, setVideo] = useState();

  // Define a function to handle the button press
  const handleButtonPress = () => {
    // Launch the image picker
    ImagePicker.openPicker({
      mediaType: 'video',
    }).then(response => {
      // Get the video uri
      const uri = response.path;

      // Set the video state to the uri
      setVideo(uri);

      // Create a blob from the video uri
      RNFetchBlob.fs.readFile(uri, 'base64').then(data => {
        let blob = RNFetchBlob.polyfill.Blob.build(data, {
          type: 'video/mp4;BASE64',
        });

        // Get a reference to the storage bucket
        const reference = storage().ref(video);

        // Upload the blob to Firebase Storage
        reference.put(blob).then(() => {
          console.log('Video uploaded successfully');

          // Get the download URL of the video
          reference.getDownloadURL().then(url => {
            console.log('Video download URL: ', url);

            // Upload the title, description and download URL to Firestore
            firestore()
              .collection('videos')
              .add({
                title: 'Some title',
                description: 'Some description',
                url: url,
              })
              .then(() => {
                console.log('Video data uploaded to Firestore');
              })
              .catch(error => {
                console.log('Video data upload error: ', error);
              });
          });
        });
      });
    });
  };

  return (
    <View>
      <Text>Storage</Text>
      <Button title="Select Video" onPress={handleButtonPress} />
    </View>
  );
};

export default Storage;
