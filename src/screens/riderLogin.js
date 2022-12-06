import React, { useEffect, useState } from 'react'
import { View, Text, Button, Pressable, StatusBar, TextInput, StyleSheet,Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';
import DashboardScreen from './user/dashboardUser'
import styles from '../styles/style'
import { Input } from 'react-native-elements';

const Stack = createStackNavigator();

const RiderLoginRender = ({ navigation }) => {


    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [errorUp, setErrorUp] = useState("")

    const processRiderLogIn = () => {

        let check = true;

        if (pass == "" || email == "" ) {


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
                    <Text style={styles.labeltext}>RIDER</Text>
                    <Text style={{ color: "red" }}>{errorUp}</Text>

                    <Input placeholder="Enter Your Email" leftIcon={{ type: 'font-awesome', name: 'envelope' }}  placeholderTextColor="black" containerStyle={styles.input} onChangeText={(em) => setEmail(em)} require={true} />

                    <Input leftIcon={{ type: 'font-awesome', name: 'lock' }} placeholder="Enter Your Password" containerStyle={styles.input} secureTextEntry placeholderTextColor="black" onChangeText={(ps) => setPass(ps)} require={true} />
                    <Pressable style={styles.btn} onPress={processRiderLogIn}><Text style={styles.textbtnprop}>LOGIN</Text></Pressable>
                    <Pressable style={styles.txt} onPress={()=>navigation.navigate('SignUpRider')}><Text style={styles.navigatortext}>Don't have an account? SignUp</Text></Pressable>
                   
                </View>
                <View style={{flexDirection:"row"}}>
                    <Pressable style={styles.opt} onPress={()=>navigation.navigate('LoginRest')}><Text style={styles.black}>Restaurant?</Text></Pressable>
                    <Pressable style={styles.opt} onPress={()=>navigation.navigate('LoginUser')}><Text style={styles.black}>User?</Text></Pressable>
                    
                    </View>
                    <Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text>


            </View>
        </ScrollView>
    );
}





export default RiderLoginRender;

