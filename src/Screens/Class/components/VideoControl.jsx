import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import Video from 'react-native-video';

class VideoControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: true,
    };
  }

  play() {
    this.setState({isPlaying: true});
  }

  pause() {
    this.setState({isPlaying: false});
  }

  render() {
    const {isPlaying} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.controls}>
          <Button
            title="Play"
            onPress={this.play.bind(this)}
            style={styles.button}
          />
          <Button
            title="Pause"
            onPress={this.pause.bind(this)}
            style={styles.button}
          />
        </View>
        <View style={styles.video}>
          <Video
            source={require('../../../../assets/video/video1.mp4')}
            isPlaying={isPlaying}
            controls={false}
            style={styles.video}
            videoHeight={1080}
            videoWidth={1920}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controls: {
    flexDirection: 'row',
    width: 100,
    height: 40,
    justifyContent: 'space-around',
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#000',
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
  video: {
    width: '100%',
    height: '50%',
  },
});

export default VideoControl;
