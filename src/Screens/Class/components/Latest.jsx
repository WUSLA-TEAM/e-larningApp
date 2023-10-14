import React, {Component} from 'react';
import {Text, View, StyleSheet, Alert, Dimensions} from 'react-native';
import Video from 'react-native-video';

const {width, height} = Dimensions.get('window');

class Latest extends Component {
  render() {
    // Get the parameters from the route prop.
    const {imageUrl, title, description, videoUrl} = this.props.route.params;
    console.log('Video URL: ', videoUrl);

    return (
      <View style={styles.container}>
        <View style={styles.ClassBox}>
          <Text style={[styles.h1Text, styles.classText]}>CLASESS VIDEO</Text>
        </View>
        <Video
          source={videoUrl ? {uri: videoUrl} : Alert.alert('Wait')}
          ref={ref => {
            this.player = ref;
          }}
          style={styles.video}
          controls={true}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
    );
  }
}

export default Latest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131D35',
    justifyContent: 'center',
    alignItems: 'center',
  },
  h1Text: {
    fontFamily: 'OpenSans-ExtraBold',
    fontSize: height * 0.04,
  },
  pText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: height * 0.017,
    fontWeight: '400',
  },
  ClassBox: {
    width: width * 0.5,
    height: height * 0.08,
    borderRadius: width * 0.024,
    backgroundColor: '#FFF',
  },
  classText: {
    color: '#8352DE',
  },
  video: {
    height: 200,
    width: 200,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
});
