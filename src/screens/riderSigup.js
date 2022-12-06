import React, { useEffect, useState } from 'react'
import { View, Text, Button, Pressable, StatusBar, TextInput, StyleSheet,Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';
import DashboardScreen from './dashboardRider'
import LoginRender from './login'
import SignupRender from './signup'
import RiderLoginRender from './riderLogin'
import RestSignupRender from './RestSignUp'
import styles from '../styles/style'
import { Input } from 'react-native-elements';


const Stack = createStackNavigator();

const riderSignupRender = ({ navigation }) => {


    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [pass, setPass] = useState("")
    const [errorUp, setErrorUp] = useState("")

    const processRiderSignUp = () => {

        let check = true;

        if (name == "" || email == "" || phone == "" || pass == "") {


            setErrorUp("All field are required")
            check = false
            console.log(errorUp)

        }
        if (check) {


            // const [resp] = SignUp()
            // console.warn(resp);
            navigation.navigate('FindMyTable',
                {
                    emailgiven: email,
                    namegiven: name

                })
        }





    }






    return (

        <ScrollView>
            <View style={styles.mainContainer}>
            <View style={styles.upperRound}>
                <Image source={require('../media/logo.png')} style={styles.logo} />
                </View>
                <View style={styles.formcontainer}>
                    <StatusBar translucent backgroundColor="black" />
                    <Text style={styles.labeltext}>RIDER</Text>
                    <Text style={{ color: "red" }}>{errorUp}</Text>
                    <Input leftIcon={{ type: 'font-awesome', name: 'user' }} placeholder="Enter Your Name" containerStyle={styles.input} placeholderTextColor="black" onChangeText={(text) => setName(text)} />
                    <Input leftIcon={{ type: 'font-awesome', name: 'envelope' }} placeholder="Enter Your Email" containerStyle={styles.input} placeholderTextColor="black" onChangeText={(em) => setEmail(em)} />
                    <Input leftIcon={{ type: 'font-awesome', name: 'phone' }} placeholder="Enter Your Phone" containerStyle={styles.input} placeholderTextColor="black" onChangeText={(ph) => setPhone(ph)} />
                    <Input leftIcon={{ type: 'font-awesome', name: 'lock' }} placeholder="Enter Your Password" containerStyle={styles.input} secureTextEntry placeholderTextColor="black" onChangeText={(ps) => setPass(ps)} />
                    <Pressable style={styles.btn} onPress={processRiderSignUp}><Text style={styles.textbtnprop}>REGISTER</Text></Pressable>
                    <Pressable style={styles.txt} onPress={()=>navigation.navigate("LoginRider")}><Text style={styles.navigatortext}>Already have an account? SignIn</Text></Pressable>
                    
                    </View>
                    <View style={{flexDirection:"row"}}>
                    <Pressable style={styles.opt} onPress={()=>navigation.navigate("SignUpRest")}><Text style={styles.black}>Restaurant?</Text></Pressable>
                    <Pressable style={styles.opt} onPress={()=>navigation.navigate("SignUpUser")}><Text style={styles.black}>User?</Text></Pressable>
                
                    </View>
                    <Text></Text><Text></Text>


            </View>
        </ScrollView>
    );
}




export default riderSignupRender;

