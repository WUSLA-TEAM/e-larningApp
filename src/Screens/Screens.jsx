import React, {useContext} from 'react'; // Make sure to import useContext here
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

//screens import
import Home from './HomeSreens/Home';
import Start from './Start/Start';
import Login from './Login/Login';
import Sign from './Sign/Sign';
import Payment from './Payment/Payment';
import Class from './Class/Class';
import Latest from './Class/components/Latest';
import Profile from './Profile/Profile';
import Chat from './Massege/chat';
import Razorpay from './Payment/Razorpay/Razorpay';
import Storage from './AdminScreens/Storage/Storage';
import Admin from './AdminScreens/Admin';

import FirestoreService, {
  UserContext,
} from '../Server/Firebase/Firestore/FirestoreService';

const Stack = createNativeStackNavigator();
const Bottom = createMaterialBottomTabNavigator();

function BottomTab() {
  const userData = useContext(UserContext);

  return (
    <Bottom.Navigator initialRouteName="Home">
      <Bottom.Screen name="Home" component={Home} />
      <Bottom.Screen name="Class" component={Class} />
      <Bottom.Screen name="Profile" component={Profile} />
      <Bottom.Screen name="Chat" component={Chat} />
      {userData.isAdmin ? (
        <Bottom.Screen name="Admin" component={Admin} />
      ) : null}
    </Bottom.Navigator>
  );
}

function StackTab() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Start">
      <Stack.Screen name="Start" component={Start} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Sign" component={Sign} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="BottomTab" component={BottomTab} />
      <Stack.Screen name="Latest" component={Latest} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="Razorpay" component={Razorpay} />
      <Stack.Screen name="FirestoreService" component={FirestoreService} />
      <Stack.Screen name="Storage" component={Storage} />
    </Stack.Navigator>
  );
}

export const Screens = () => {
  return (
    <FirestoreService>
      <NavigationContainer>
        <StackTab />
      </NavigationContainer>
    </FirestoreService>
  );
};
