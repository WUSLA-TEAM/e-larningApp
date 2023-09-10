import React, {Component} from 'react';
import {Image, Text, View, StyleSheet} from 'react-native';
import Video from 'react-native-video';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '50%',
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

class Latest extends Component {
  render() {
    // Get the parameters from the route prop.
    const {imageUrl, title, description} = this.props.route.params;

    return (
      <View style={styles.container}>
        <Video
          source={require('../../../../assets/video/video1.mp4')} // Can be a URL or a local file.
          ref={ref => {
            this.player = ref;
          }} // Store reference
          onBuffer={this.onBuffer} // Callback when remote video is buffering
          onError={this.videoError} // Callback when video cannot be loaded
          style={styles.image}
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
