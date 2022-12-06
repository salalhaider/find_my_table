import React from 'react'
import { Text, StyleSheet, View, Pressable, BackHandler } from 'react-native'
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './home'
import LikedScreen from './liked'
import CartScreen from './cart'
import ProfileScreen from './profile'
import DashBoardGetter from '../../routes/DashBoardGetter'
import LoginScreen from '../login'


const Tab = createBottomTabNavigator();
export default Choose = ({ route, navigation }) => {

  const { datagiven } = route.params;
  // console.log("recieveed data is ",datagiven)


  BackHandler.addEventListener('hardwareBackPress', function () {

    return true;



  });

  return (
    <Tab.Navigator initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          }  else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#feb334',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={Home}
        initialParams={{ data: datagiven }}

      />
      <Tab.Screen name="Profile" component={ProfileScreen} initialParams={{ data: datagiven }} />
      
      

      




    </Tab.Navigator>
  )
}

