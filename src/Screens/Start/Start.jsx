import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

//Resposive for the App
const {height, width} = Dimensions.get('window');

const Start = ({navigation}) => {
  //For NAvigation Pages Connection
  const handleSign = () => {
    navigation.navigate('Sign');
    console.log('Sign Page');
  };
  const handleLogin = () => {
    navigation.navigate('Login');
    console.log('Login Page');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBox}></View>
      <View style={styles.CompanyLogo}>
        <Image source={require('../../../assets/images/logo.png')} />
      </View>
      <View style={styles.Companytext}>
        <Text style={[styles.h1text, styles.companyName]}>Company Name</Text>
        <Text style={[styles.ptext, styles.companyDes]}>Company Des</Text>
      </View>
      <View style={styles.buttonArea}>
        <TouchableOpacity style={styles.login} onPress={handleLogin}>
          <Text style={[styles.h1text, styles.loginButton]}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sign} onPress={handleSign}>
          <Text style={[styles.h1text, styles.signButton]}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Start;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  h1text: {
    fontFamily: Platform.OS === 'android' ? 'OpenSans-Bold' : 'SF-Pro',
    fontSize: height * 0.028,
    fontWeight: 'bold',
  },
  ptext: {
    fontFamily: 'OpenSans-Regular',
    fontSize: height * 0.017,
    fontWeight: '400',
  },
  topBox: {
    height: height * 0.5,
    backgroundColor: '#131D35',
    borderBottomLeftRadius: height * 0.05,
    borderBottomRightRadius: height * 0.05,
  },
  CompanyLogo: {
    position: 'absolute',
    top: height * 0.42,
    left: width * 0.38,
    borderRadius: width * 1,
    backgroundColor: '#FFF',
    height: width * 0.3,
    width: width * 0.3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Companytext: {
    height: height * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.08,
  },
  companyName: {
    color: '#000',
  },
  companyDes: {
    color: '#000',
    marginTop: height * 0.009,
  },
  buttonArea: {
    // backgroundColor: '#7D59BC',
    height: height * 0.21,
    marginTop: height * 0.21,
    marginHorizontal: width * 0.1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center', //removing from the screen
  },
  login: {
    height: height * 0.07,
    width: width * 0.4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButton: {
    color: '#7D59BC',
    fontSize: height * 0.02,
  },
  sign: {
    height: height * 0.07,
    width: width * 0.4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7D59BC',
    borderRadius: width * 0.03,
  },
  signButton: {
    fontSize: height * 0.02,
    color: '#FFF',
  },
});
