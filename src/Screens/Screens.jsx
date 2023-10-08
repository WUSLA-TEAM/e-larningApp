import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';

//navigaetion
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
import FirestoreService, {
  UserContext,
} from '../Server/Firebase/Firestore/FirestoreService';
import Storage from './AdminScreens/Storage/Storage';
import ElevatedCards from './Profile/Components/TopCards/ElevatedCards';
import Admin from './AdminScreens/Admin';

const Stack = createNativeStackNavigator();

//bottom navigation
const Bottom = createMaterialBottomTabNavigator();

const {userRole} = useContext(UserContext);

function BottomTab() {
  return (
    <Bottom.Navigator initialRouteName="Home">
      <Bottom.Screen name="Home" component={Home} />
      <Bottom.Screen name="Class" component={Class} />
      <Bottom.Screen name="Profile" component={Profile} />
      <Bottom.Screen name="Chat" component={Chat} />
      {userRole === 'admin' && <Bottom.Screen name="Admin" component={Admin} />}
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
      <Stack.Screen name="ElevatedCards" component={ElevatedCards} />
      <Stack.Screen name="Class" component={Class} />
      <Stack.Screen name="Admin" component={Admin} />
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
