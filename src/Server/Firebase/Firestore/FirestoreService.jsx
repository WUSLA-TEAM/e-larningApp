import React, {createContext, useState, useEffect} from 'react';
import {View, Text} from 'react-native';
// Import firestore and auth from '@react-native-firebase/firestore'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
// Create a user context
export const UserContext = createContext();
// Define a function component for the user provider
const FirestoreService = ({children}) => {
  // Use state to store the user data
  const [userData, setUserData] = useState({});
  const [userRole, setUserRole] = useState({});
  // Use effect to fetch the user data from Firestore
  useEffect(() => {
    // Get the current user object
    const user = auth().currentUser;
    // Get the user id
    const userId = user.uid;
    // Get a reference to the user document by the user id
    const userDocument = firestore().collection('user').doc(userId);
    // Get the document data
    userDocument.get().then(documentSnapshot => {
      // Check if the document exists
      if (documentSnapshot.exists) {
        // Set the user data state to the document data
        setUserData(documentSnapshot.data());
        setUserRole(documentSnapshot.data().role);
      }
    });
  }, []);
  // Return a user context provider with the user data value
  return (
    <UserContext.Provider value={{userData, userRole}}>
      {children}
    </UserContext.Provider>
  );
};
// Export the user provider component
export default FirestoreService;
