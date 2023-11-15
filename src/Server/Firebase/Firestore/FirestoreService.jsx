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

  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  );
};

export default FirestoreService;
