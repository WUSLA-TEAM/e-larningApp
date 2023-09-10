import React from 'react';
import {View, Text, TouchableOpacity, Modal} from 'react-native';

const TermsModal = ({visible, closeModal}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      onSwipeComplete={() => setModalVisible(false)}
      swipeDirection="down">
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{backgroundColor: '#242424', borderRadius: 10}}>
          <View style={{padding: 20}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>
              Terms and Conditions
            </Text>
            <Text style={{color: '#fff'}}>
              This is the terms and conditions of the app. Please read it
              carefully before using the app.
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: '#FFF',
                padding: 10,
                borderRadius: 5,
                margin: 10,
              }}
              onPress={() => {
                closeModal();
              }}>
              <Text style={{color: '#242424'}}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TermsModal;
