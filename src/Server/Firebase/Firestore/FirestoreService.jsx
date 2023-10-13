import React, {createContext, useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const UserContext = createContext();

const FirestoreService = ({children}) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Add an event listener to track changes in the user's authentication state
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        // User is authenticated, fetch user data from Firestore
        const userId = user.uid;
        const userDocument = firestore().collection('user').doc(userId);

        userDocument.get().then(documentSnapshot => {
          if (documentSnapshot.exists) {
            const data = documentSnapshot.data();
            setUserData(data);
          } else {
            console.error('User document does not exist');
          }
        });
      } else {
        // User is not authenticated
        console.error('User is not authenticated');
        setUserData(null);
      }
    });

    return () => {
      // Unsubscribe from the authentication state change event
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  );
};

export default FirestoreService;
