import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableHighlight,
  Alert,
  TextInput,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {Grid} from './Components/Grid';

import {UserContext} from '../../Server/Firebase/Firestore/FirestoreService';

//auth
import FirestoreService from '../../Server/Firebase/Firestore/FirestoreService';

const {width, height} = Dimensions.get('window');

const Home = () => {
  const userData = useContext(UserContext);

  // Check if userInfo is null before accessing its properties
  if (!userData) {
    return (
      <View style={styles.topSectionbox}>
        <Text style={[styles.h1text, styles.userGreeting]}>
          Loading user data...
        </Text>
      </View>
    );
  }
  console.log(`user home ${userData.userData}`);
  return (
    <View style={styles.container}>
      <View style={styles.topSectionbox}>
        <Text style={[styles.h1text, styles.userGreeting]}>
          Hello {userData.userData.name},
        </Text>
        <Text style={[styles.h1text, styles.WelcomeText]}>Start Lesson!</Text>
        <View style={styles.lessonsSection}>
          <Text style={[styles.p1text, styles.lesstonText]}>Lessons</Text>
          <View style={styles.icons}>
            <TouchableHighlight onPress={() => Alert.alert('Wait')}>
              <Image
                source={require('../../../assets/images/gridicon.png')}
                style={[styles.iconsImage, styles.gridIcon]}
              />
            </TouchableHighlight>
            <TouchableHighlight onPress={() => Alert.alert('Wait')}>
              <Image
                source={require('../../../assets/images/icon-list.png')}
                style={[styles.iconsImage, styles.iconList]}
              />
            </TouchableHighlight>
          </View>
        </View>
      </View>
      <Grid />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSectionbox: {
    backgroundColor: '#131D35',
    height: height * 0.45,
    borderBottomLeftRadius: width * 0.078,
    borderBottomRightRadius: width * 0.078,
    paddingLeft: width * 0.099,
  },
  h1text: {
    fontFamily: Platform.OS === 'android' ? 'OpenSans-Bold' : 'SF-Pro',
    fontSize: height * 0.04,
    fontWeight: 'bold',
  },
  p1text: {
    fontFamily: 'OpenSans-Regular',
    fontSize: height * 0.017,
    fontWeight: '400',
  },
  userGreeting: {
    color: '#FFF',
    marginTop: height * 0.08,
    fontSize: height * 0.018,
  },
  WelcomeText: {
    color: '#FFF',
    marginTop: height * 0.024,
    width: width * 0.6,
    fontSize: height * 0.07,
  },
  lessonsSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: width * 0.099,
    flexDirection: 'row',
    marginTop: height * 0.054,
  },
  lesstonText: {
    color: '#FFF',
  },
  icons: {
    display: 'flex',
    // backgroundColor: '#FFF',
    width: width * 0.099,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
