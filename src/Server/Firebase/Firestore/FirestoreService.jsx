import React, {createContext, useState, useEffect} from 'react';
import {View, Text} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const UserContext = createContext();

const FirestoreService = ({children}) => {
  const [userData, setUserData] = useState({});
  const [isAdmin, setIsAdmin] = useState(false); // Set the initial value accordingly

  useEffect(() => {
    const checkUser = auth().currentUser;

    if (checkUser) {
      const userId = checkUser.uid;

      const userDocument = firestore().collection('user').doc(userId);

      console.log(userData);

      userDocument.get().then(documentSnapshot => {
        if (documentSnapshot.exists) {
          const userData = documentSnapshot.data();
          setUserData(userData);

          // Assuming isAdmin is a property in your user data
          setIsAdmin(userData.isAdmin || false);
        }
      });
    } else {
      // Handle the case when there is no user logged in
      // For example, you can set userData to an empty object or null
      setUserData({});
      setIsAdmin(false);
    }
  }, []);

  return (
    <UserContext.Provider value={{userData, isAdmin}}>
      {children}
    </UserContext.Provider>
  );
};

export default FirestoreService;
