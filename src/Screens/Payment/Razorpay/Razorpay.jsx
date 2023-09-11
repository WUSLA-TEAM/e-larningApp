import React from 'react';
import {View, StyleSheet, Text, Image, Button, Alert} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';

const Razorpay = () => {
  const handlePayment = () => {
    let options = {
      name: 'Wusla',
      description: 'fast secure',
      currency: 'INR',
      amount: 50000,
      key: 'rzp_test_3bVAi7XMPRnnwe',
      prefill: {
        email: 'ss@gmail.com',
        contact: '9747522318',
        name: 'Tester',
      },
      theme: {color: '#f37251'},
    };
    RazorpayCheckout.open(options)
      .then(data => {
        console.log('data', data);
        Alert.alert('sucess fully payed');
      })
      .catch(error => {
        console.log(error);
        Alert.alert(`Error : ${error.code} | ${error.description}`);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>React</Text>
      <Image
        style={styles.productImage}
        source={require('./assets/dark.png')}
      />
      <Text style={styles.text}>Rs. 500</Text>
      <View style={styles.button}>
        <Button title="Buy" onPress={() => handlePayment()} />
      </View>
    </View>
  );
};

export default Razorpay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 25,
  },
  button: {
    width: 200,
  },
});
