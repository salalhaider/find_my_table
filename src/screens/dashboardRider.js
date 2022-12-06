import React from 'react'
import {Text,StyleSheet, View,Pressable,BackHandler} from 'react-native'
import { NavigationContainer,CommonActions  } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './user/home'
import LikedScreen from './user/liked'
import CartScreen from './user/cart'
import ProfileScreen from './user/profile'




const Tab = createBottomTabNavigator();



export default DashboardRider=({ route, navigation })=>{

    const {emailgiven,namegiven} = route.params;
    
    
    BackHandler.addEventListener('hardwareBackPress', function() {
        
        return true;

        
      });
      
    return(
        <Tab.Navigator initialRouteName="Home"
        // screenOptions={({ route }) => ({
        //     tabBarIcon: ({ color, size }) => {
        //       const icons = {
        //         Home: 'home',
        //         Profile: 'account',
        //       };
        
        //       return (
        //         <MaterialCommunityIcons
        //           name={icons[route.name]}
        //           color={color}
        //           size={size}
        //         />
        //       );
        //     },
        //   })}
        >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Cart" component={CartScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Liked" component={LikedScreen} />
        
      </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "black",
        alignContent:"center"
    },
    upperRound: {
        height: 150,
        marginTop: 50,
        width: 250,
        borderRadius: 150,
        backgroundColor: "white"
    },
    mainContainer: {
        alignItems: "center",


    },
    btn: {
        height: 50,
        width: 250,
        borderWidth: 1,
        borderColor: "white",
        backgroundColor: "transparent",
        borderRadius: 15,
        fontSize: 20,
        marginTop: 50,
        color: "white",
        alignItems: "center",
        justifyContent: "center"
    }

})