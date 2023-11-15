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
<<<<<<< HEAD
import ElevatedCards from './Components/TopCards/ElevatedCards';
=======
import {useNavigation} from '@react-navigation/native';
>>>>>>> check

const {width, height} = Dimensions.get('window');

const Profile = ({navigation}) => {
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
<<<<<<< HEAD
  const [data, setData] = useState([]);

=======
  const handleChageProfile = () => {
    navigation.navigate('ProfileImage');
  };
>>>>>>> check
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
<<<<<<< HEAD
        <Image
          source={require('../../../assets/images/logo.png')}
          style={styles.imageOfUser}
        />
        <Text style={[styles.UserName, styles.h1Text]}>
          {userData.userData.name}
        </Text>
=======
        <TouchableRipple onPress={handleChageProfile}>
          <Image source={{uri: userData.imageUrl}} style={styles.imageOfUser} />
        </TouchableRipple>

        <Text style={[styles.UserName, styles.h1Text]}>{userData.name}</Text>
>>>>>>> main
      </View>
      <View style={styles.middleSection}>
<<<<<<< HEAD
        <ElevatedCards style={styles.CardBox} />
      </View>
      <View style={styles.BottomSection}>
        <Text style={styles.BottomText}>Wusla</Text>
=======
        <TouchableRipple
          onPress={() => navigation.navigate('Account')}
          rippleColor="rgba(0, 0, 0, .32)"
          style={[styles.box]}>
          <Text>Account Info</Text>
        </TouchableRipple>
        <TouchableRipple
          onPress={() => navigation.navigate('Privacy')}
          rippleColor="rgba(0, 0, 0, .32)"
          style={[styles.box]}>
          <Text>Privacy Policy</Text>
        </TouchableRipple>
        <TouchableRipple
          onPress={() => console.log('Pressed')}
          rippleColor="rgba(0, 0, 0, .32)"
          style={[styles.box]}>
          <Text>Press anywhere</Text>
        </TouchableRipple>
        <TouchableRipple
          onPress={() => console.log('Pressed')}
          rippleColor="rgba(0, 0, 0, .32)"
          style={[styles.box]}>
          <Text>Press anywhere</Text>
        </TouchableRipple>
>>>>>>> check
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    backgroundColor: '#FFF',
=======
    color: '#fff',
>>>>>>> check
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
<<<<<<< HEAD
    height: height * 0.51,
    borderBottomLeftRadius: width * 0.23,
    borderBottomRightRadius: width * 0.23,
=======
    height: height * 0.3,
    borderBottomLeftRadius: height * 0.098,
    borderBottomRightRadius: height * 0.098,
>>>>>>> check
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
<<<<<<< HEAD
  CardBox: {
    backgroundColor: '#FFF',
=======
  box: {
    backgroundColor: '#724EB7',
    height: height * 0.074,
    display: 'flex',
    justifyContent: 'center',
    // alignItems: 'center',
    padding: height * 0.015,
    marginTop: height * 0.015,
    borderRadius: width * 0.024,
>>>>>>> check
  },
});

export default Profile;
