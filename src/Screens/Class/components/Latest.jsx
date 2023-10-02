import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Button,
  TouchableOpacity,
} from 'react-native';
import {Text} from 'react-native-paper';
import Video from 'react-native-video';
import Icons from 'react-native-vector-icons/MaterialIcons';
// import SvgUri from 'react-native-svg-uri';

const ForwardIcon = require('../../../../assets/icons/forward.svg');

const {width, height} = Dimensions.get('window');

const Latest = ({route}) => {
  const {imageUrl, title, description, videoUri} = route.params;
  const [currentTime, setCurrentTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const videoPlayerRef = useRef(null);

  const handlePlayPause = () => setIsPaused(!isPaused);

  const handleSkipForward = () => {
    const newTime = currentTime + 10;
    videoPlayerRef.current.seek(newTime);
  };

  const handleSkipBackward = () => {
    const newTime = currentTime - 10;
    videoPlayerRef.current.seek(newTime);
  };

  return (
    <View style={styles.container}>
      <View style={styles.HeadingText}>
        <Text style={styles.h1text}>Class Video</Text>
      </View>
      <Video
        source={{uri: videoUri}}
        resizeMode="contain"
        style={styles.video}
        onProgress={({currentTime}) => setCurrentTime(currentTime)}
        onEnd={() => console.log('The video ended.')}
        paused={isPaused}
        ref={videoPlayerRef}
      />
      <Button title={isPaused ? 'Play' : 'Pause'} onPress={handlePlayPause} />
      <TouchableOpacity
        onPress={handleSkipForward}
        style={{width: 100, height: 100}}>
        {/* <SvgUri width="100" height="100" fill="white" source={ForwardIcon} /> */}
        <Icons name="chevron-right" size={24} color="#FFF" />
      </TouchableOpacity>
      <Button title="Skip Backward 10s" onPress={handleSkipBackward} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#131D35',
  },
  HeadingText: {
    backgroundColor: '#FFF',
    width: width * 0.53,
    height: height * 0.074,
    borderRadius: width * 0.024,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  h1text: {
    fontSize: height * 0.033,
    color: '#8352DE',
    fontFamily: 'OpenSans-ExtraBold',
  },
  video: {
    width: width * 0.9,
    height: height * 0.24,
    borderRadius: width * 0.024,
  },
});

export default Latest;
