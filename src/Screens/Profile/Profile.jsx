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
import ElevatedCards from './Components/TopCards/ElevatedCards';

const {width, height} = Dimensions.get('window');

const Profile = ({navigation}) => {
  const userData = useContext(UserContext);

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
  const [data, setData] = useState([]);

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image
          source={require('../../../assets/images/logo.png')}
          style={styles.imageOfUser}
        />
        <Text style={[styles.UserName, styles.h1Text]}>
          {userData.userData.name}
        </Text>
      </View>
      <View style={styles.middleSection}>
        <ElevatedCards style={styles.CardBox} />
      </View>
      <View style={styles.BottomSection}>
        <Text style={styles.BottomText}>Wusla</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
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
    height: height * 0.51,
    borderBottomLeftRadius: width * 0.23,
    borderBottomRightRadius: width * 0.23,
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
  CardBox: {
    backgroundColor: '#FFF',
  },
});

export default Profile;
