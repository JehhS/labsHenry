import messaging from '@react-native-firebase/messaging';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import {Text, withTheme, Avatar} from 'react-native-paper';
import 'react-native-gesture-handler';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import AppbarHenry from './src/components/AppBar';
import ButtonBar from './src/components/ButtonBar';
import CompleteProfileAlert from "./src/components/CompleteProfileAlert";
import Lectures from './src/components/Lectures';
import Login from './src/components/Login';
import UserContext from "./src/context/user/UserContext";
import axios from 'axios';
import {API_URL} from './config'

const Stack = createStackNavigator();



const App = () => {
  
  const { token, userLoggedIn } = useContext(UserContext);
  const [photo, setPhoto] = useState("")

  useEffect(()=> {
    if(userLoggedIn.id){
      axios.get(`${API_URL}/api/users/getAvatar/${userLoggedIn.id}`).then(res => setPhoto(res.data))
    }
  },[userLoggedIn])

  console.log(photo)
  
 
  useEffect( () => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    
     ( async function () {
      const token = await messaging().getToken()
      // setToken(token)
    })();

    const topicSubscriber = messaging().subscribeToTopic(`gordoPuto`)
      .then(() => console.log("Estoy suscripto a gordoPuto"))
    
    const backgroundHandler = messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log("Notification en Background, " , remoteMessage );
    })

    return () => {
      unsubscribe();
      topicSubscriber;
      backgroundHandler;
      };
  }, []);
  
  
    return (
      <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#000000',
          height: 70
        },
        headerTintColor: 'yellow',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
        {token !== null ? userLoggedIn.completeProfile === 'pending' ? 
          (
          <Stack.Screen name="CompleteProfile"component={CompleteProfileAlert}/>
          ) : (
        < >
          <Stack.Screen name="Home" component={ButtonBar}
          options={{ headerTitle: props => 
            <View style={styles.headerProfile}>
              <Text style={styles.name}> {userLoggedIn.firstName} </Text>
              <Avatar.Image size={52} source={{ uri: photo }} />
              {/* <Avatar.Icon style={styles.avatar} size={32} icon="person-circle" color="#000000"/> */}
            </View>
        }}/>
          {/* <Stack.Screen name="Lectures" component={Lectures}/> */}
        </>
          ) : (
          <Stack.Screen name="Login" component={Login} options={{
            headerShown: false
          }}/>
          )
        }
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
  headerProfile:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: "1%"
  },
  name: {
		textAlign: "center",
    fontSize: 36,
    color: "yellow",
    marginRight: 10
	},
	 avatar: {
		marginLeft: 40
	}
});

export default App;
