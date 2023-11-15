<<<<<<< HEAD
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

=======
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  Dimensions,
  ScrollView,
} from 'react-native';
import Video from 'react-native-video';

const {width, height} = Dimensions.get('window');

class Latest extends Component {
  render() {
    // Get the parameters from the route prop.
    const {imageUrl, name, description, videoUrl, notes} =
      this.props.route.params;

    return (
      <ScrollView style={styles.container}>
        <View style={styles.topcontainer}>
          <View style={styles.ClassBox}>
            <Text style={[styles.h1Text, styles.classText]}>CLASESS VIDEO</Text>
          </View>
          <View style={styles.videoBox}>
            <Video
              source={videoUrl ? {uri: videoUrl} : Alert.alert('Wait')}
              ref={ref => {
                this.player = ref;
              }}
              style={styles.video}
              controls={true}
            />
          </View>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <View style={styles.noteContainer}>
          <Text style={styles.noteText}>Notes</Text>
          <View style={styles.divContent}>
            <Text>{notes}</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

>>>>>>> check
export default Latest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131D35',
  },
  h1Text: {
    fontFamily: 'OpenSans-Bold',
    fontSize: height * 0.4,
  },
  pText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: height * 0.017,
    fontWeight: '400',
  },
  topcontainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.5,
  },
  ClassBox: {
    width: width * 0.5,
    height: height * 0.08,
    borderRadius: width * 0.024,
    backgroundColor: '#FFF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.034,
  },
  classText: {
    color: '#8352DE',
    fontSize: height * 0.02,
  },
  videoBox: {
    backgroundColor: '#8352DE',
    borderRadius: width * 0.024,
  },
  video: {
    height: height * 0.3,
    width: width * 0.8,
    borderRadius: width * 0.024,
  },
  content: {
    padding: 16,
    paddingHorizontal: width * 0.11,
  },
  title: {
    // textAlign: 'center',
    color: '#FFF',
    fontSize: height * 0.05,
    fontFamily: 'OpenSans-ExtraBold',
  },
  description: {
    fontSize: height * 0.02,
    color: '#A372FF',
    fontFamily: 'OpenSans-Medium',
    // textAlign: 'center',
  },
  noteContainer: {
    paddingHorizontal: width * 0.11,
    // width: width * 0.9,
  },
  noteText: {
    color: '#A372FF',
    fontSize: height * 0.03,
    fontFamily: 'OpenSans-ExtraBold',
  },
});
