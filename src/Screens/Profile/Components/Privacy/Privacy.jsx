import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import {TouchableRipple} from 'react-native-paper';

const NextButton = ({isLight, ...props}) => (
  <TouchableRipple {...props}>
    <Ionicons
      name="arrow-forward"
      size={24}
      color={isLight ? 'black' : 'white'}
    />
  </TouchableRipple>
);

const Dot = ({selected, isLight}) => {
  const backgroundColor = isLight
    ? selected
      ? '#131D35'
      : '#FFF'
    : selected
    ? '#fff'
    : '#131D35';
  return (
    <Animatable.View
      style={[styles.dot, {backgroundColor}]}
      animation={selected ? 'pulse' : undefined}
    />
  );
};

const Privacy = () => {
  const navigation = useNavigation();
  return (
    <Onboarding
      pages={[
        {
          backgroundColor: '#fff',
          image: (
            <Image
              source={require('../../../../../assets/images/human1.png')}
              style={{width: 300, height: 400}}
            />
          ),
          title: 'Secure',
          subtitle:
            'Your data is secure with us. We use the latest security measures to protect your information.',
        },
        {
          backgroundColor: '#fff',
          image: (
            <Image
              source={require('../../../../../assets/images/human-2.png')}
              style={{width: 300, height: 400}}
            />
          ),
          title: 'Private',
          subtitle:
            'Your privacy is important to us. We will never sell or share your data with third parties without your consent',
        },
        {
          backgroundColor: '#fff',
          image: (
            <Image
              source={require('../../../../../assets/images/human3.png')}
              style={{width: 300, height: 400}}
            />
          ),
          title: 'Controlled',
          subtitle:
            'You are in control of your data. You can choose what data you share with us and how we use it',
        },
        {
          backgroundColor: '#fff',
          image: (
            <Image
              source={require('../../../../../assets/images/human3.png')}
              style={{width: 300, height: 400}}
            />
          ),
          title: 'Transparent',
          subtitle:
            'We are transparent about how we collect and use your data. You can read our privacy policy at any time.',
        },
        {
          backgroundColor: '#fff',
          image: (
            <Image
              source={require('../../../../../assets/images/human3.png')}
              style={{width: 300, height: 400}}
            />
          ),
          title: 'Trusted',
          subtitle:
            'We are a trusted learning app provider. We have been helping students learn for over 5 years.',
        },
      ]}
      onDone={() => navigation.navigate('Profile')}
      showSkip={false}
      controlStatusBar={false}
      style={styles.container}
      bottomBarColor={'#FFF'}
      NextButtonComponent={NextButton}
      DotComponent={Dot}
    />
  );
};

export default Privacy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
});
