import {Image, StyleSheet, Text, View, Dimensions, Alert} from 'react-native';
import React, {useState} from 'react';
import {TextInput, TouchableRipple} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import app from '@react-native-firebase/app';
import Firestore from '@react-native-firebase/firestore';

//termModal
import TermsModal from '../Modal/TermsModal';

const userCollection = Firestore().collection('user');

//responsive
const {width, height} = Dimensions.get('window');

const Login = ({navigation}) => {
  // auth
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //modal
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  //auth
  const handleAuth = () => {
    Alert.alert('Hi');
  };

  //payment button
  const handlepayment = () => {
    if (
      firstName.trim() === '' ||
      lastName.trim() === '' ||
      email.trim() === '' ||
      code.trim() === '' ||
      phoneNumber.trim() === '' ||
      password.trim() === ''
    ) {
      // Show an alert or error message indicating that all fields are required.
      Alert.alert('All fields are required');
    } else {
      navigation.navigate('Payment', {
        firstName,
        lastName,
        email,
        password,
        code,
        phoneNumber,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.sectionCompany}>
        <Image
          style={styles.Logo}
          source={require('../../../assets/images/logo.png')}
        />
        <Text style={[styles.h1text, styles.companyName]}>Company Name</Text>
        <Text style={[styles.p1text, styles.companyDes]}>Company Des</Text>
      </View>
      <View style={styles.formBox}>
        <View style={styles.topSection}>
          <View style={styles.Names}>
            <TextInput
              // value="Arsh"
              style={[styles.input, styles.nameInputs, styles.First]}
              placeholder="First Name"
              placeholderTextColor={'#828282'}
              textContentType="name"
              mode="outline"
              onChangeText={setFirstName}
              value={firstName}
            />
            <TextInput
              // value="Arsh"
              style={[styles.input, styles.nameInputs, styles.Last]}
              placeholder="Last Name"
              placeholderTextColor={'#828282'}
              textContentType="name"
              mode="outline"
              onChangeText={setLastName}
              value={lastName}
            />
          </View>
          <TextInput
            // value="Arsh"
            style={[styles.input, styles.emailInputs]}
            placeholder="Email"
            placeholderTextColor={'#828282'}
            textContentType="emailAddress"
            mode="outline"
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
          />
          <View style={styles.Number}>
            <TextInput
              // value="Arsh"
              style={[styles.input, styles.phoneInput, styles.codeInput]}
              placeholder="Code"
              placeholderTextColor={'#828282'}
              textContentType="telephoneNumber"
              mode="outline"
              onChangeText={setCode}
              value={code}
              keyboardType="numeric"
            />
            <TextInput
              // value="Arsh"
              style={[styles.input, styles.phoneInput, styles.phoneNumberInput]}
              placeholder="Phone Number"
              placeholderTextColor={'#828282'}
              textContentType="telephoneNumber"
              mode="outline"
              onChangeText={setPhoneNumber}
              value={phoneNumber}
              keyboardType="numeric"
            />
          </View>
          <TextInput
            // value="Arsh"
            style={[styles.input, styles.emailInputs]}
            placeholder="Password"
            placeholderTextColor={'#828282'}
            textContentType="password"
            mode="outline"
            onChangeText={setPassword}
            value={password}
            secureTextEntry={true}
          />
          <TouchableRipple style={styles.buttonPaymnet} onPress={handlepayment}>
            <Text style={[styles.h1text, styles.payment]}>Payment</Text>
          </TouchableRipple>
        </View>
        <View
          style={{
            borderBottomWidth: height * 0.001,
            borderBottomColor: '#4A4A4A',
            width: width * 0.8,
            marginLeft: width * 0.1,
          }}
        />
        <View style={styles.authDifferent}>
          <TouchableRipple onPress={handleAuth} style={styles.authButton}>
            <Image
              source={require('../../../assets/images/google-logo.png')}
              style={[styles.googleImage, styles.authImage]}
            />
          </TouchableRipple>
          <TouchableRipple
            onPress={handleAuth}
            style={[styles.authButton, styles.facebookAuth]}>
            <Image
              source={require('../../../assets/images/facebook-logo.png')}
              style={[styles.facebookImage, styles.authImage]}
            />
          </TouchableRipple>
        </View>
        <TouchableRipple
          style={styles.Terms}
          onPress={openModal}
          rippleColor="#131D35">
          <Text style={[styles.h1text, styles.termsText]}>
            By continuing, you agree to our Terms and conditions
          </Text>
        </TouchableRipple>
        <TermsModal visible={modalVisible} closeModal={closeModal} />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#242424',
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
  sectionCompany: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.35,
  },
  companyName: {
    color: '#242424',
  },
  companyDes: {
    color: '#242424',
    marginTop: height * 0.0021,
  },
  formBox: {
    backgroundColor: '#131D35',
    height: height * 0.65,
    borderTopLeftRadius: width * 0.09,
    borderTopRightRadius: width * 0.09,
  },
  topSection: {
    height: height * 0.45,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'white',
  },
  input: {
    width: width * 0.89,
    backgroundColor: '#131D35',
    color: '#FFF',
    borderBottomWidth: height * 0.001,
    borderBottomColor: '#FFF',
  },
  Names: {
    display: 'flex',
    flexDirection: 'row',
  },
  nameInputs: {
    width: width * 0.43,
  },
  Last: {
    marginLeft: width * 0.021,
    borderBottomWidth: height * 0.001,
    borderBottomColor: '#FFF',
  },
  Number: {
    display: 'flex',
    flexDirection: 'row',
  },
  phoneInput: {
    width: width * 0.55,
  },
  codeInput: {
    width: width * 0.19,
  },
  phoneNumberInput: {
    marginLeft: width * 0.021,
    borderBottomWidth: height * 0.001,
    borderBottomColor: '#FFF',
    width: width * 0.68,
  },
  buttonPaymnet: {
    backgroundColor: '#7D59BC',
    height: height * 0.078,
    width: width * 0.45,
    marginTop: height * 0.04,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width * 0.009,
  },
  payment: {
    color: '#FFF',
    fontSize: height * 0.03,
  },
  authDifferent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: height * 0.12,
  },
  authButton: {
    backgroundColor: '#FFF',
    width: width * 0.2,
    height: height * 0.058,
    borderRadius: width * 0.02,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  facebookAuth: {
    marginLeft: width * 0.024,
  },
  Terms: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.028,
  },
  termsText: {
    fontSize: height * 0.01,
    color: '#FFF',
    width: width * 0.33,
  },
});
