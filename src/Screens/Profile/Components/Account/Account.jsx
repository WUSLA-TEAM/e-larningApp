import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React, {useContext} from 'react';

//user DAtA
import {UserContext} from '../../../../Server/Firebase/Firestore/FirestoreService';
import {TouchableRipple} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const Account = () => {
  const userData = useContext(UserContext);

  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.navigate('Sign');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.accInfo}>Account Info</Text>
      </View>
      <View
        style={{
          borderBottomColor: '#FFF',
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
      <View style={styles.middileSection}>
        <View style={styles.inputBox}>
          <Text style={[styles.userNameStyle, styles.textStyle]}>
            User Name
          </Text>
          <TouchableRipple style={styles.inputText}>
            <Text>{userData.name}</Text>
          </TouchableRipple>
        </View>
        <View style={styles.inputBox}>
          <Text style={[styles.emailStyle, styles.textStyle]}>Email</Text>
          <TouchableRipple style={styles.inputText}>
            <Text>{userData.email}</Text>
          </TouchableRipple>
        </View>
        <View style={styles.inputBox}>
          <Text style={[styles.phonestyle, styles.textStyle]}>
            Phone Number
          </Text>
          <TouchableRipple style={styles.inputText}>
            <Text>{userData.phoneNumber}</Text>
          </TouchableRipple>
        </View>
      </View>
      <View style={styles.bottomSection}>
        <TouchableRipple style={styles.button} onPress={handleLogout}>
          <Text style={styles.log}>Logout</Text>
        </TouchableRipple>
      </View>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131D35',
  },
  topSection: {
    height: height * 0.1,
    // backgroundColor: '#242424',
    display: 'flex',
    justifyContent: 'center',
  },
  accInfo: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: width * 0.09,
    fontFamily: 'OpenSans-Bold',
  },
  middileSection: {
    paddingVertical: height * 0.054,
    paddingHorizontal: width * 0.094,
  },
  textStyle: {
    fontSize: height * 0.024,
    fontFamily: 'OpenSans-Bold',
    color: '#e2e2e2',
  },
  inputText: {
    borderBottomWidth: height * 0.001,
    borderBottomColor: '#FFF',
    marginVertical: height * 0.01,
    display: 'flex',
    // alignItems: 'center',
    padding: width * 0.024,
  },
  bottomSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#724EB7',
    height: height * 0.08,
    width: width * 0.34,
    borderRadius: width * 0.024,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  log: {
    fontSize: height * 0.02,
    fontFamily: 'OpenSans-Regular',
  },
});
