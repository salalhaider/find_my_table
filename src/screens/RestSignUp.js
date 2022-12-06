import React, { useEffect, useState } from 'react'
import { View, Text, Button, Pressable, StatusBar, TextInput, StyleSheet, Image, Picker } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';
import DashboardScreen from './user/dashboardUser'
import styles from '../styles/style'
import { Input, CheckBox } from 'react-native-elements';
import RadioButtonRN from 'radio-buttons-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import jsonserver from '../server/jsonServer'

const Stack = createStackNavigator();
const RestSignupRender = ({ navigation }) => {


    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState(0)
    const [pass, setPass] = useState("")
    const [cpass, setcPass] = useState("")
    const [errorUp, setErrorUp] = useState("")
    const [DineChecked, setDineChecked] = useState(false)
    const [DeliveryChecked, setDeliveryChecked] = useState(false)
    const [TakeChecked, setTakeChecked] = useState(false)
    const [services, setServices] = useState([])
    const [typeRest, setTypeRest] = useState("")
    const [averagePrice, setAveragePrice] = useState(100)
    const [location, setLocation] = useState("")
    const [easyPaisaName, setEasyPaisaName] = useState("")
    const [easyPaisaNumber, setEasyPaisaNumber] = useState(0)


    const dataRadio = [
        {
            label: 'Yes'
        },
        {
            label: 'No'
        }

    ];

    const processRestSignUp = () => {
        let check = true;
        if (name == "" || email == "" || phone == 0 || pass == "" || location == "" || typeRest == "" || averagePrice == "" || services == [] || easyPaisaName == "" || easyPaisaNumber == 0) {
            setErrorUp("All field are required")
            check = false
            console.log(errorUp)
        }
        if (pass != cpass) {
            check = false
            setErrorUp("Password did'nt match")
        }
        if (check) {

            console.log(name, phone, email, pass, location, services, typeRest, averagePrice,easyPaisaName,easyPaisaNumber);
            jsonserver.post('/resturant/signup', {
                name: name,
                phone: phone,
                email: email,
                password: pass,
                location: location,
                services: services,
                typeOfResturant: typeRest,
                averagePriceInMenu: averagePrice,
                easyPaisaName:easyPaisaName,
                easyPaisaPhoneNo:easyPaisaNumber

            })
                .then((response) => {
                    // console.log(response);
                    navigation.navigate('DasboardRest',
                        {
                            datagiven: response.data
                        })
                })
                .catch(function (error) {
                    console.log( error);
                    if(error.message=="Request failed with status code 400"){
                        setErrorUp("Something is incorrect check again")
                    }
                    else if(error.message=="Network Error"){
                        setErrorUp("Internet Connection lost")
                    }
                    else{
                        setErrorUp("Something went wrong try again later")
                    }
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
                    <Text style={styles.labeltext}>RESTAURANT</Text>
                    <Text style={{ color: "red" }}>{errorUp}</Text>
                    <Input leftIcon={{ type: 'font-awesome', name: 'user' }} placeholder="Enter Your Name" containerStyle={styles.input} placeholderTextColor="black" onChangeText={(text) => setName(text)} />
                    <Input leftIcon={{ type: 'font-awesome', name: 'envelope' }} placeholder="Enter Your Email" containerStyle={styles.input} placeholderTextColor="black" onChangeText={(em) => setEmail(em)} />
                    <Input leftIcon={{ type: 'font-awesome', name: 'phone' }} keyboardType="number-pad" placeholder="Enter Your Phone" containerStyle={styles.input} placeholderTextColor="black" onChangeText={(ph) => setPhone(ph)} />
                    <Input leftIcon={{ type: 'font-awesome', name: 'lock' }} placeholder="Enter Your Password" containerStyle={styles.input} secureTextEntry placeholderTextColor="black" onChangeText={(ps) => setPass(ps)} />
                    <Input leftIcon={{ type: 'font-awesome', name: 'lock' }} placeholder="Confirm Your Password" containerStyle={styles.input} secureTextEntry placeholderTextColor="black" onChangeText={(pcs) => setcPass(pcs)} />
                    <Input leftIcon={{ type: 'Ionicons', name: 'home' }} placeholder="Enter Your Address" containerStyle={styles.input} placeholderTextColor="black" onChangeText={(lo) => setLocation(lo)} />
                    <View style={{ width: "100%", alignItems: "flex-start", justifyContent: "flex-start", alignContent: "flex-start" }}>
                        <Text style={{ fontSize: 24, marginTop: 15, fontWeight: "bold", marginLeft: "14%" }}>SERVICES</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignContent: "center" }}>
                        <CheckBox
                            title='DineIn'
                            checked={DineChecked}
                            onPress={() => {
                                setDineChecked(!DineChecked)
                                console.log("this is going", DineChecked);
                                if (DineChecked === false) {
                                    let serve = [...services]
                                    serve.push("DineIn")
                                    // console.log(serve)
                                    setServices(serve)
                                    // console.log(services);
                                } else {
                                    let serve = [...services]
                                    serve.pop("DineIn")
                                    // console.log(serve)
                                    setServices(serve)
                                    // console.log(services);
                                }
                            }}
                            containerStyle={{ backgroundColor: "transparent", borderWidth: 0, width: "30%" }}
                        />
                        {/* <CheckBox
                            title='TakeAway'
                            checked={TakeChecked}
                            onPress={() => {
                                setTakeChecked(!TakeChecked)


                                if (TakeChecked === false) {
                                    let serve = [...services]
                                    serve.push("TakeAway")
                                    // console.log/(serve)
                                    setServices(serve)
                                    // console.log(services);
                                } else {
                                    let serve = [...services]
                                    serve.pop("TakeAway")
                                    // console.log(serve)
                                    setServices(serve)
                                    // console.log(services);
                                }
                            }}
                            containerStyle={{ backgroundColor: "transparent", borderWidth: 0, width: "32%", marginLeft: -20 }}
                        /> */}
                        <CheckBox
                            title='Delivery'
                            checked={DeliveryChecked}
                            onPress={() => {
                                setDeliveryChecked(!DeliveryChecked)




                                if (DeliveryChecked === false) {
                                    let serve = [...services]
                                    serve.push("Delivery")
                                    // console.log(serve)
                                    setServices(serve)
                                    // console.log(services);
                                } else {
                                    let serve = [...services]
                                    serve.pop("Delivery")
                                    // console.log(serve)
                                    setServices(serve)
                                    // console.log(services);
                                }
                            }}
                            containerStyle={{ backgroundColor: "transparent", borderWidth: 0, width: "32%", marginLeft: -10 }}
                        />

                    </View>
                    <View style={{ width: "100%", alignItems: "flex-start", justifyContent: "flex-start", alignContent: "flex-start" }}>
                        <Text style={{ fontSize: 24, marginTop: 15, fontWeight: "bold", marginLeft: "14%" }}>Type of Restaurant</Text>
                    </View>
                    <Picker
                        style={{ height: 50, width: 150, borderColor: "black", borderWidth: 5 }}
                        itemStyle={{ borderColor: "black", borderWidth: 5 }}
                        selectedValue={typeRest}
                        onValueChange={(v, itemIndex) => setTypeRest(v)}
                    >
                        <Picker.Item label="Chineese" value="Chineese" />
                        <Picker.Item label="Local" value="Local" />
                        <Picker.Item label="Italian" value="Italian" />
                        <Picker.Item label="Continental" value="Continental" />
                        <Picker.Item label="Arabic" value="Arabic" />
                        <Picker.Item label="Local" value="Local" />
                        <Picker.Item label="Others" value="other" />
                    </Picker>
                    <View style={{ width: "100%", alignItems: "flex-start", justifyContent: "flex-start", alignContent: "flex-start" }}>
                        <Text style={{ fontSize: 24, marginTop: 15, fontWeight: "bold", marginLeft: "14%" }}>Average price of product</Text>
                    </View>
                    <Picker
                        style={{ height: 50, width: 150, borderColor: "black", borderWidth: 5 }}
                        itemStyle={{ borderColor: "black", borderWidth: 5 }}
                        selectedValue={averagePrice}

                        onValueChange={(cost, itemIndex) => setAveragePrice(cost)}
                    >
                        <Picker.Item label="100" value={100} />
                        <Picker.Item label="500" value={500} />
                        <Picker.Item label="1000" value={1000} />
                        <Picker.Item label="1500" value={1500} />
                        <Picker.Item label="2000" value={2000} />
                        <Picker.Item label="3000" value={3000} />

                    </Picker>
                    <Input leftIcon={{ type: 'font-awesome', name: 'user' }} placeholder="Enter EasyPaisa Name" containerStyle={styles.input} placeholderTextColor="black" onChangeText={(ename) => setEasyPaisaName(ename)} />
                    <Input leftIcon={{ type: 'font-awesome', name: 'phone' }} placeholder="Enter EasyPaisa Phone" keyboardType="number-pad" containerStyle={styles.input} placeholderTextColor="black" onChangeText={(ephone) => setEasyPaisaNumber(ephone)} />


                    <Pressable style={styles.btn} onPress={processRestSignUp}><Text style={styles.textbtnprop}>REGISTER</Text></Pressable>
                    <Pressable style={styles.txt} onPress={() => navigation.navigate("LoginRest")}><Text style={styles.navigatortext}>Already have an account? SignIn</Text></Pressable>

                </View>
                <View style={{ flexDirection: "row" }}>
                    <Pressable style={styles.opt} onPress={() => navigation.navigate("SignUpUser")}><Text style={styles.black}>User?</Text></Pressable>
                    {/* <Pressable style={styles.opt} onPress={() => navigation.navigate("SignUpRider")}><Text style={styles.black}>Rider?</Text></Pressable> */}

                </View>




            </View>
        </ScrollView>
    );
}



export default RestSignupRender;

