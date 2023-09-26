// Latest.js
import React from 'react';
import {View, StyleSheet} from 'react-native';
import Video from 'react-native-video';

const Latest = ({route}) => {
  const {imageUrl, title, description} = route.params;

  return (
    <View style={styles.container}>
      <Video
        source={{uri: imageUrl}}
        resizeMode="contain"
        style={styles.video}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // Set background color as needed
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
});

export default Latest;
