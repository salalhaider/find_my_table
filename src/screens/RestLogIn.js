import React, { useEffect, useState } from 'react'
import { View, Text, Button, Pressable, StatusBar, TextInput, StyleSheet, Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';
import DashboardScreen from './user/dashboardUser'
import jsonserver from '../server/jsonServer'

import styles from '../styles/style'


import RiderLoginRender from './riderLogin'
import { Input } from 'react-native-elements';


const Stack = createStackNavigator();

const RestLoginRender = ({ navigation }) => {


    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [errorUp, setErrorUp] = useState("")
    const [btnValue, setBtnValue] = useState("LOGIN")


    const processRestLogIn = () => {

        let check = true;

        if (pass == "" || email == "") {


            setErrorUp("All field are required")
            check = false
            // console.log(errorUp)

        }
        if (check) {

            setBtnValue("Wait...")
            jsonserver.post('/resturant/login', {
                email: email,
                password: pass
            })
                .then((response) => {
                    // console.log(response.data);
                    setBtnValue("LOGIN")
                    // console.log("this is response", response.data);
                    navigation.navigate('DasboardRest',
                        {
                            datagiven: response.data

                        })
                })
                .catch(function (error) {
                    console.log(error);
                    if (error.message == "Request failed with status code 400") {
                        setErrorUp("Email or Password is incorrect")
                    } 
                    else if (error.message == "Network Error") {
                        setErrorUp("Internet Connection lost")
                    }
                    else {
                        setErrorUp("Something went wrong try again later")
                    }
                    setBtnValue("LOGIN")
                })

        }





    }






    return (

        <ScrollView style={{ flex: 1 }}>
            <View style={styles.mainContainer}>
                <View style={styles.upperRound}>
                    <Image source={require('../media/logo.png')} style={styles.logo} />
                </View>
                <View style={styles.formcontainer}>
                    <StatusBar translucent backgroundColor="black" />
                    <Text style={styles.labeltext}>RESTAURANT</Text>
                    <Text style={{ color: "red" }}>{errorUp}</Text>

                    <Input placeholder="Enter Your Email" leftIcon={{ type: 'font-awesome', name: 'envelope' }} placeholderTextColor="black" containerStyle={styles.input} onChangeText={(em) => setEmail(em)} require={true} />

                    <Input leftIcon={{ type: 'font-awesome', name: 'lock' }} placeholder="Enter Your Password" containerStyle={styles.input} secureTextEntry placeholderTextColor="black" onChangeText={(ps) => setPass(ps)} require={true} />
                    <Pressable style={styles.btn} onPress={processRestLogIn}><Text style={styles.textbtnprop}>{btnValue}</Text></Pressable>
                    <Pressable style={styles.txt} onPress={() => navigation.navigate('SignUpRest')}><Text style={styles.navigatortext}>Don't have an account? SignUp</Text></Pressable>

                </View>
                <View style={{flexDirection:"row"}}><Pressable style={styles.opt} onPress={()=>navigation.navigate('LoginUser')}><Text style={styles.black}>User?</Text></Pressable>
                    {/* <Pressable style={styles.opt} onPress={()=>navigation.navigate('LoginRider')}><Text style={styles.black}>Rider?</Text></Pressable> */}
                    </View>
                <Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text>

            </View>
        </ScrollView>
    );
}


export default RestLoginRender;

