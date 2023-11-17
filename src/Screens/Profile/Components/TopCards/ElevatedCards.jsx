import {ScrollView, StyleSheet, Text, View, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TouchableRipple} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const ElevatedCards = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    // Check if the user is an admin
    // This could be done by fetching the user's role from a database or API
    setIsAdmin(true);
  }, []);
  const navigation = useNavigation();

  const handleChat = () => {
    navigation.navigate('Chat');
  };
  return (
    <ScrollView style={styles.Container}>
      <TouchableRipple
        onPress={handleChat}
        style={[styles.card, {marginTop: 0}]}>
        <Text style={[styles.h1Text, styles.cardText]}>Text</Text>
      </TouchableRipple>
      {isAdmin && (
        <TouchableRipple
          style={[styles.card]}
          onPress={() => {
            navigation.navigate('Storage');
          }}>
          <Text style={[styles.h1Text, styles.cardText]}>Admin</Text>
        </TouchableRipple>
      )}
      <TouchableRipple style={[styles.card]}>
        <Text style={[styles.h1Text, styles.cardText]}>Text</Text>
      </TouchableRipple>
      <TouchableRipple style={[styles.card]}>
        <Text style={[styles.h1Text, styles.cardText]}>Text</Text>
      </TouchableRipple>
      <TouchableRipple style={[styles.card]}>
        <Text style={[styles.h1Text, styles.cardText]}>Text</Text>
      </TouchableRipple>
      <TouchableRipple style={[styles.card]}>
        <Text style={[styles.h1Text, styles.cardText]}>Text</Text>
      </TouchableRipple>
      <TouchableRipple style={[styles.card]}>
        <Text style={[styles.h1Text, styles.cardText]}>Text</Text>
      </TouchableRipple>
      <TouchableRipple style={[styles.card]}>
        <Text style={[styles.h1Text, styles.cardText]}>Text</Text>
      </TouchableRipple>
    </ScrollView>
  );
};

export default ElevatedCards;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  card: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#131D35',
    width: width * 0.9,
    height: height * 0.093,
    borderRadius: width * 0.023,
    marginTop: height * 0.023,
  },
  h1Text: {
    fontFamily: 'OpenSans-Bold',
    fontSize: height * 0.023,
  },
  cardText: {
    color: '#FFF',
  },
});
