import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
  Alert,
} from 'react-native';
import {TouchableRipple} from 'react-native-paper';

import {UserContext} from '../../Server/Firebase/Firestore/FirestoreService';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const Profile = () => {
  const userData = useContext(UserContext);
  const navigation = useNavigation();

  // Check if userInfo is null before accessing its properties
  if (!userData) {
    return (
      <View style={styles.topSectionbox}>
        <Text style={[styles.h1Text, styles.userGreeting]}>
          Loading user data...
        </Text>
      </View>
    );
  }
  const handleChageProfile = () => {
    navigation.navigate('ProfileImage');
  };
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <TouchableRipple onPress={handleChageProfile}>
          <Image source={{uri: userData.imageUrl}} style={styles.imageOfUser} />
        </TouchableRipple>

        <Text style={[styles.UserName, styles.h1Text]}>{userData.name}</Text>
      </View>
      <View style={styles.middleSection}>
        <TouchableRipple
          onPress={() => navigation.navigate('Account')}
          rippleColor="rgba(0, 0, 0, .32)"
          style={[styles.box]}>
          <Text style={[styles.pText, styles.boxText]}>Account Info</Text>
        </TouchableRipple>
        <TouchableRipple
          onPress={() => navigation.navigate('Privacy')}
          rippleColor="rgba(0, 0, 0, .32)"
          style={[styles.box]}>
          <Text style={[styles.pText, styles.boxText]}>Privacy Policy</Text>
        </TouchableRipple>
        <TouchableRipple
          onPress={() => navigation.navigate('Chat')}
          rippleColor="rgba(0, 0, 0, .32)"
          style={[styles.box]}>
          <Text style={[styles.pText, styles.boxText]}>Chat</Text>
        </TouchableRipple>
        <TouchableRipple
          onPress={() => console.log('Pressed')}
          rippleColor="rgba(0, 0, 0, .32)"
          style={[styles.box]}>
          <Text style={[styles.pText, styles.boxText]}>Press anywhere</Text>
        </TouchableRipple>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#fff',
  },
  h1Text: {
    fontFamily: Platform.OS === 'android' ? 'OpenSans-Bold' : 'SF-Pro',
    fontSize: height * 0.04,
    fontWeight: 'bold',
  },
  pText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: height * 0.017,
    fontWeight: '400',
  },
  topSection: {
    backgroundColor: '#131D35',
    backgroundColor: '#131D35',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.3,
    borderBottomLeftRadius: height * 0.098,
    borderBottomRightRadius: height * 0.098,
  },
  imageOfUser: {
    backgroundColor: '#FFF',
    borderRadius: width * 0.5,
    width: 100, // Set the width and height according to your design
    height: 100,
  },
  UserName: {
    color: '#FFF',
    marginTop: height * 0.021,
  },
  middleSection: {
    flex: 1,
    // backgroundColor: '#242424', // Add background color for the product list
    padding: 20,
    height: height * 0.9,
  },
  productItem: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#724EB7',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  FlatListItem: {},
  box: {
    backgroundColor: '#724EB7',
    height: height * 0.074,
    display: 'flex',
    justifyContent: 'center',
    // alignItems: 'center',
    padding: height * 0.015,
    marginTop: height * 0.015,
    borderRadius: width * 0.024,
    color: '#FFF',
  },
  boxText : {
    color : '#FFF',
    overflow: 'visible'
  }
});

export default Profile;
