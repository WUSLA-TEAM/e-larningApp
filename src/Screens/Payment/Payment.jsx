import {StyleSheet, Text, View, Dimensions, Alert, Linking} from 'react-native';
import React from 'react';
import {TouchableRipple} from 'react-native-paper';
import {StripeProvider} from '@stripe/stripe-react-native';

const {width, height} = Dimensions.get('window');

const Payment = ({route, navigation}) => {
  const {firstName, lastName, email, password, code, phoneNumber} =
    route.params;
  const handlePaymnet = () => {
    navigation.navigate('BottomTab', {
      firstName,
      lastName,
      email,
      password,
    });
  };

  return (
    <StripeProvider publishableKey="pk_test_51NjbBhSDhXlv7KOUYaGMBxrxA39jeTeyafJi5IkE1o253hFF3lslRjGiP0U6IO848O4ri8ACRDBGLRxTKROQrfIC00v5P0Ezp3">
      <View style={styles.contianer}>
        <View style={styles.topSectiom}>
          <Text style={[styles.h1text, styles.userName]}>
            {firstName} {lastName}
          </Text>
          <Text style={[styles.p1text, styles.EmailUser]}>{email}</Text>
          <View style={styles.PriceBox}>
            <Text style={[styles.h1text, styles.priceTag]}>$300</Text>
          </View>
        </View>
        <View style={styles.bottomSection}>
          <TouchableRipple style={styles.buttonPayment} onPress={handlePaymnet}>
            <Text style={[styles.h1text, styles.PaymentText]}>Payment</Text>
          </TouchableRipple>
          <Text>Terms and Condition</Text>
        </View>
      </View>
    </StripeProvider>
  );
};

export default Payment;

const styles = StyleSheet.create({
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
  contianer: {
    flex: 1,
  },
  topSectiom: {
    backgroundColor: '#131D35',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.6,
    borderBottomLeftRadius: width * 0.05,
    borderBottomRightRadius: width * 0.05,
  },
  userName: {
    color: '#FFF',
  },
  EmailUser: {
    color: '#FFF',
  },
  PriceBox: {
    backgroundColor: '#FFF',
    height: height * 0.08,
    width: width * 0.4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width * 0.023,
    marginTop: height * 0.023,
  },
  bottomSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.4,
    // backgroundColor: '#242424',
  },
  buttonPayment: {
    height: height * 0.1,
    width: width * 0.6,
    backgroundColor: '#131D35',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width * 0.023,
  },
  PaymentText: {
    color: '#FFF',
    fontSize: height * 0.03,
  },
});
