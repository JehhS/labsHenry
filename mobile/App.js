import 'react-native-gesture-handler';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AppbarHenry from './src/components/AppBar';
import Login from './src/components/Login';
import Lectures from './src/components/Lectures';
import { createStackNavigator } from '@react-navigation/stack';
// const { Navigator, Screen } = createStackNavigator();
const Stack = createStackNavigator();

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App = () => {

  useEffect( () => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', remoteMessage.notification.title );
    });
    
     ( async function () {
      const token = await messaging().getToken()
      console.log(token)
      // setToken(token)
    })();

    const topicSubscriber = messaging().subscribeToTopic(`gordoPuto`)
      .then(() => console.log("Estoy suscripto a gordoPuto"))
    
    const backgroundHandler = messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log("Notification en Background, " , remoteMessage.notification  );
    })

    return () => {
      unsubscribe();
      topicSubscriber;
      backgroundHandler;
      };
  }, []);


    return (
      <Stack.Navigator>
			<Stack.Screen 
				name="Login"
				component={Login}
			/>
			<Stack.Screen 
				name="Home"
				component={AppbarHenry}
				// options={{ title: 'Home' }}
			/>
			<Stack.Screen
				name="Lectures"
				component={Lectures}
			/>
      </Stack.Navigator>
    )
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;