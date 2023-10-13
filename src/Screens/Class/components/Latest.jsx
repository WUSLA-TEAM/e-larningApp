import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Video from 'react-native-video';

class Latest extends Component {
  render() {
    // Get the parameters from the route prop.
    const {imageUrl, title, description, videoUrl} = this.props.route.params;

    return (
      <View style={styles.container}>
        <Video
          source={{uri: videoUrl}} // Use the passed URL as the video source
          ref={ref => {
            this.player = ref;
          }} // Store reference
          style={styles.video} // Adjusted style to take full height
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
  },
  video: {
    flex: 1,
    height: 200,
    width: 200,
    // Set video to take the full height of the container
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
