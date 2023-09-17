import React, {createContext, useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const UserContext = createContext();

const FirestoreService = ({children}) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth().currentUser;

        if (user) {
          const userId = user.uid;
          const userDocument = firestore().collection('user').doc(userId);
          const documentSnapshot = await userDocument.get();

          if (documentSnapshot.exists) {
            const data = documentSnapshot.data();
            setUserData(data);
          } else {
            console.error('User document does not exist');
          }
        } else {
          console.error('User is not authenticated');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  );
};

export default FirestoreService;
