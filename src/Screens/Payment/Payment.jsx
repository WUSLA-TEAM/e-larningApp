import React from 'react';
import {StyleSheet, Text, View, Dimensions, Alert, Easing} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import auth from '@react-native-firebase/auth';
import {TouchableRipple} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

const {width, height} = Dimensions.get('window');

const Payment = ({route, navigation}) => {
  const {firstName, lastName, email, password, phoneNumber, code} =
    route.params;

  //firestore funtion work
  const handleSubmit = async () => {
    try {
      // Get the current user object
      const user = auth().currentUser;

      if (user) {
        // Get the user id
        const userId = user.uid;

        // Use the user id as the document name instead of the email
        await firestore()
          .collection('user')
          .doc(userId)
          .set({
            name: `${firstName} ${lastName}`,
            email: email,
            phoneNumber: `${code} ${phoneNumber}`,
            password: password,
            imageUrl: null,
          });

        console.log('Document successfully written!');
      } else {
        console.error('No authenticated user');
        // Handle the case where there is no authenticated user
      }
    } catch (error) {
      console.error('Error writing document: ', error);
    }
  };

  const handlePayment = () => {
    const options = {
      name: 'wusla',
      description: 'fast secure',
      currency: 'INR',
      amount: 100,
      key: 'rzp_test_3HRoVAqaDcF28T',
      prefill: {
        email: email,
        contact: phoneNumber, // Replace 'PHONE_NUMBER' with the actual phone number
        name: `${firstName} ${lastName}`,
      },
      theme: {color: '#f37251'},
    };

    RazorpayCheckout.open(options)
      .then(async data => {
        console.log('data', data);
        Alert.alert('Successfully paid');

        // Handle user authentication using Firebase
        await handleUserAuthentication(email, password);

        //after payment to the firestore
        handleSubmit();

        // Navigate to the desired screen upon successful payment
        navigation.navigate('BottomTab');
      })
      .catch(error => {
        console.log(error);
        Alert.alert(
          `Dear: ${lastName}, Thank you for your support. Please try again later.`,
        );
      });
  };

  const handleUserAuthentication = async (email, password) => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      // User creation successful
      // You can add additional logic here if needed
    } catch (error) {
      console.error('Error creating user:', error);
      // Handle errors (e.g., display an error message)
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={[styles.heading, styles.userName]}>
          {firstName} {lastName}
        </Text>
        <Text style={[styles.text, styles.email]}>{email}</Text>
        <View style={styles.priceBox}>
          <Text style={[styles.heading, styles.priceTag]}>$300</Text>
        </View>
      </View>
      <View style={styles.bottomSection}>
        <TouchableRipple style={styles.buttonPayment} onPress={handlePayment}>
          <Text style={[styles.heading, styles.paymentText]}>Payment</Text>
        </TouchableRipple>
        <Text>Terms and Condition</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontFamily: Platform.OS === 'android' ? 'OpenSans-Bold' : 'SF-Pro',
    fontSize: height * 0.04,
    fontWeight: 'bold',
  },
  text: {
    fontFamily: 'OpenSans-Regular',
    fontSize: height * 0.017,
    fontWeight: '400',
  },
  topSection: {
    backgroundColor: '#131D35',
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.6,
    borderBottomLeftRadius: width * 0.05,
    borderBottomRightRadius: width * 0.05,
  },
  userName: {
    color: '#FFF',
  },
  email: {
    color: '#FFF',
  },
  priceBox: {
    backgroundColor: '#FFF',
    height: height * 0.08,
    width: width * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width * 0.023,
    marginTop: height * 0.023,
  },
  bottomSection: {
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.4,
  },
  buttonPayment: {
    height: height * 0.1,
    width: width * 0.6,
    backgroundColor: '#131D35',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width * 0.023,
  },
  paymentText: {
    color: '#FFF',
    fontSize: height * 0.03,
  },
});

export default Payment;
