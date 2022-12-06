import * as React from 'react';
import {Button, View, Text, LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignupScreen from './src/screens/signup';
import LoginScreen from './src/screens/login';
import DashboardUser from './src/screens/user/dashboardUser';
import RestLoginScreen from './src/screens/RestLogIn';
import RestSignUpScreen from './src/screens/RestSignUp';
import RiderLogin from './src/screens/riderLogin';
import RiderSignUpScreen from './src/screens/riderSigup';
import DashboardRest from './src/screens/Restaurant/dashboardRest';
import SplashScreen from 'react-native-splash-screen';
import {Image} from 'react-native';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

function App() {
  React.useEffect(() => {
    // console.log("working");

    <View
      style={{
        flex: 1,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{fontSize: 100}}>hello from splash</Text>
    </View>;

    // SplashScreen.show()

    SplashScreen.hide();
  });

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginUser">
        <Stack.Screen
          name="LoginUser"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUpUser"
          component={SignupScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUpRest"
          component={RestSignUpScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="LoginRest"
          component={RestLoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUpRider"
          component={RiderSignUpScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="LoginRider"
          component={RiderLogin}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DasboardUser"
          component={DashboardUser}
          options={{
            headerLeft: () => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={require('./src/media/logo-removebg-preview.png')}
                  style={{width: 50, height: 50, marginLeft: 15}}
                />
                {/* <Input placeholder="Kya Chahiye?"  inputContainerStyle={{borderColor:"white",marginLeft:50}} leftIcon={<Ionicons name="search" size={30} color="white" style={{marginLeft:0}}/>} /> */}
              </View>
            ),
            headerTintColor: 'white',
            title: 'Find My Table',
            headerStyle: {
              backgroundColor: '#feb334',
            },
          }}
        />
        <Stack.Screen
          name="DasboardRest"
          component={DashboardRest}
          options={{
            headerLeft: () => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={require('./src/media/logo-removebg-preview.png')}
                  style={{width: 50, height: 50, marginLeft: 15}}
                />
                {/* <Input placeholder="Kya Chahiye?"  inputContainerStyle={{borderColor:"white",marginLeft:50}} leftIcon={<Ionicons name="search" size={30} color="white" style={{marginLeft:0}}/>} /> */}
              </View>
            ),
            headerTintColor: 'white',
            title: 'Find My Table',
            headerStyle: {
              backgroundColor: '#feb334',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
