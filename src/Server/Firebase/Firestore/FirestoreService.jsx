import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {UserContext} from '../contexts/UserContext';
import firestore from '@react-native-firebase/firestore';
const FirestoreService = () => {
  const [userData, setUserData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const userDocument = firestore().collection('user').doc(userId);
    const fetchUserData = async () => {
      try {
        const documentSnapshot = await userDocument.get();
        const userAdmin = {
          userId: 'e74KTV9RBNXTW6HeNFp4gThKrcd2',
          isAdmin: false,
        };
        if (userId === userAdmin.userId) {
          setIsAdmin(true);
        }
        if (documentSnapshot.exists) {
          const data = documentSnapshot.data();
          setUserData(data);
        }
      } catch (error) {
        console.error('error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);
  return (
    <UserContext.Provider value={{userData, isAdmin}}>
      {children}
    </UserContext.Provider>
  );
};
export default FirestoreService;
