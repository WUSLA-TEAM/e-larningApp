import {StyleSheet, Text, View, Dimensions, Image, Alert} from 'react-native';
import React, {useContext, useState} from 'react';
import {TextInput, TouchableRipple} from 'react-native-paper';

//firebase auth
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {UserContext} from '../../Server/Firebase/Firestore/FirestoreService';
// import TermsModal from '../src/Privacy/TermsModal';

const {width, height} = Dimensions.get('window');

const Sign = ({navigation}) => {
  //auth
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const {userData, userRole} = useContext(UserContext);

  const hndleContinue = async () => {
    if ((email === '') | (password === '')) {
      Alert.alert('Inputs are required');
      return;
    }
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );

      if (userCredential && userCredential.user) {
        const userUid = userCredential.user.uid;

        navigation.navigate('BottomTab');
      }
    } catch (error) {
      console.log(`Error : ${error}`);
      Alert.alert(`Error: ${error}`);
    }
  };

  const handleMotion = () => {
    navigation.navigate('BottomTab');
    // console.log('Hi');
  };
  //   const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    // setModalVisible(true);
    console.log('Hi');
  };

  const closeModal = () => {
    // setModalVisible(false);
    console.log('Hi');
  };

  return (
    <View style={styles.container}>
      <View style={styles.Companysection}>
        <Image
          source={require('../../../assets/images/logo.png')}
          style={styles.imageLogo}
        />
        <Text style={[styles.h1Text, styles.companyName]}>Company Name</Text>
        <Text style={[styles.pText, styles.companyDes]}>Company Des</Text>
      </View>
      <View style={styles.bottom}>
        <View style={styles.topSection}>
          <TextInput
            // value="Arsh"
            // theme={{colors: {text: '#fff'}}}
            autoCorrect={false}
            style={[styles.input, styles.emailInput]}
            placeholder="Email"
            placeholderTextColor={'#FFF'}
            textContentType="emailAddress"
            mode="outline"
            value={email}
            onChangeText={setEmail}
            selectTextOnFocus={true}

          />
          <TextInput
            // value="Arsh"
            style={[styles.input, styles.emailInput]}
            placeholder="Password"
            placeholderTextColor={'#FFF'}
            textContentType="password"
            value={password}
            onChangeText={setPassword}
<<<<<<< HEAD
            selectTextOnFocus={true}
            secureTextEntry={true}
=======
            secureTextEntry={true}
<<<<<<< HEAD
            selectTextOnFocus={true}
=======
>>>>>>> check
>>>>>>> main
          />
          <TouchableRipple
            style={styles.buttonContinue}
            onPress={hndleContinue}
            rippleColor="#C5A5FF">
            <Text style={[styles.h1Text, styles.buttonText]}>Continue</Text>
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

        {/* google and facebook auth code  */}
        <View style={styles.authPage}>
          <TouchableRipple
            style={[styles.buttonAuth, styles.googleButton]}
            onPress={() => Alert.alert('JustWait')}>
            <View style={styles.googleButton}>
              <Image
                source={require('../../../assets/images/google-logo.png')}
                style={styles.googleImage}
              />
              <Text style={[styles.h1Text, styles.googleText]}>
                Sign up with Google
              </Text>
            </View>
          </TouchableRipple>

          {/* facebook  */}
          <TouchableRipple
            style={[styles.buttonAuth, styles.facebookButton]}
            onPress={() => Alert.alert('JustWait')}>
            <View style={styles.facebookButton}>
              <Image
                source={require('../../../assets/images/facebook-logo.png')}
                style={styles.facebookImage}
              />
              <Text style={[styles.h1Text, styles.facebookText]}>
                Sign up with Facebook
              </Text>
            </View>
          </TouchableRipple>
        </View>
        <TouchableRipple
          style={styles.Terms}
          onPress={openModal}
          rippleColor="#131D35">
          <Text style={[styles.h1Text, styles.termsText]}>
            By continuing, you agree to our Terms and conditions
          </Text>
        </TouchableRipple>
        {/* {modalVisible && (
          <TermsModal modalVisible={modalVisible} closeModal={closeModal} />
        )} */}
      </View>
    </View>
  );
};

export default Sign;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  Companysection: {
    height: height * 0.38,
    // backgroundColor: '#000',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  companyName: {
    color: '#000',
    marginTop: height * 0.009,
  },
  companyDes: {
    color: '#000',
    marginTop: height * 0.003,
  },
  bottom: {
    backgroundColor: '#131D35',
    height: height * 0.62,
    borderTopLeftRadius: width * 0.09,
    borderTopRightRadius: width * 0.09,
  },
  topSection: {
    height: height * 0.35,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: width * 0.89,
    backgroundColor: 'transparent',
    color: '#FFF',
    borderBottomWidth: height * 0.001,
    borderBottomColor: '#FFF',
  },
  emailInput: {
    color: '#FFF',
  },
  buttonContinue: {
    backgroundColor: '#7D59BC',
    width: width * 0.45,
    height: height * 0.081,
    marginTop: height * 0.021,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width * 0.021,
  },
  buttonText: {
    fontSize: height * 0.028,
    color: '#FFF',
  },
  authPage: {
    height: height * 0.15,
    marginTop: height * 0.01,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonAuth: {
    width: width * 0.5,
    height: height * 0.051,
    backgroundColor: '#FFF',
    borderRadius: width * 0.01,
  },
  googleButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  googleText: {
    fontSize: height * 0.018,
    marginLeft: width * 0.021,
    color: '#242424',
  },
  //facebook
  facebookButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: height * 0.0099,
  },
  facebookText: {
    fontSize: height * 0.018,
    marginLeft: width * 0.021,
    color: '#242424',
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
