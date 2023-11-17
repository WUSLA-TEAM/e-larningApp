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
