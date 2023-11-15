<<<<<<< HEAD
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
=======
import React, {createContext, useState, useEffect} from 'react';
import {View, Text} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const UserContext = createContext();

const FirestoreService = ({children}) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const checkUser = auth().currentUser;

    if (checkUser) {
      const userId = checkUser.uid;

      const userDocument = firestore().collection('user').doc(userId);

      console.log(userData);

      userDocument.get().then(documentSnapshot => {
        if (documentSnapshot.exists) {
          setUserData(documentSnapshot.data());
        }
      });
    } else {
      // Handle the case when there is no user logged in
      // For example, you can set userData to an empty object or null
      setUserData({});
    }
  }, []);

>>>>>>> main
  return (
    <UserContext.Provider value={{userData, isAdmin}}>
      {children}
    </UserContext.Provider>
  );
};
<<<<<<< HEAD
=======

>>>>>>> main
export default FirestoreService;
