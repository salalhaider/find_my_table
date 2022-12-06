import React, { useEffect, useState } from 'react'
import { Text, Image, View, Button, Pressable, Dimensions, StatusBar, BackHandler } from 'react-native'
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler'
import { Card, ListItem, Icon, Overlay, SocialIcon, withBadge, Badge, Input } from 'react-native-elements'
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import jsonserver from '../../server/jsonServer'
import styles from '../../styles/style'
import Ionicons from 'react-native-vector-icons/Ionicons';
import CartScreen from '../../screens/user/cart'
import DashBoardUser from '../../screens/user/dashboardUser'
import DatePicker from 'react-native-datepicker'


const Tab = createBottomTabNavigator();

const DashBoardGetter = (props) => {

    const getCurrentDate = () => {

        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        return year + '-' + month + '-' + date;
    }

    const [tempid, setTempId] = useState("")

    const [data, setData] = useState([])
    const [visible, setVisible] = useState(false);
    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [control, setControl] = useState(true);
    const [cartstatus, setCartStatus] = useState(0)
    const [cartData, setCartData] = useState([])
    const [userData, setUserData] = useState(props.UserData)
    const [date, setDate] = useState(getCurrentDate())
    const [textreservation, setTextReservation] = useState("CONFIRM DELIVERY")
    const [totalPrice, setTotalPrice] = useState(0)
    const [address, setAddress] = useState("")




    const [menu, setMenu] = useState([]);
    // console.log("this is user data in dashboardgetter : ", userData);

    const toggleOverlay1 = () => {
        setVisible1(!visible1);
    };
    const toggleOverlay2 = () => {
        setVisible2(!visible2);
    };

    const toggleOverlay = (id) => {


        jsonserver.get('/resturant/menu/' + id)
            .then((response) => {
                console.log("menu is : ", response.data);
                setMenu(response.data)
            })
            .then((error) => {
                console.log(error);
            })
        setVisible(!visible);

    };
    const getRestarent = () => {
        jsonserver.get('/resturant/delivery')
            .then((response) => {
                // console.log("------------------------------------------------------------", response.data.menucategies);
                setData(response.data)

            })
            .then((error) => {
                console.log(error);
            })
    };
    if (control == true) {
        getRestarent();
        setControl(false)
    };





    return (
        <ScrollView style={{ backgroundColor: "#feb334" }}>
            <Input placeholder="Search..." inputContainerStyle={{ borderColor: "white", marginLeft: 0 }} leftIcon={<Ionicons name="search" size={20} color="white" style={{ marginLeft: 0 }} />} onChangeText={
                (search) => {

                    if (search != "") {
                        jsonserver.get('/resturant/searchByType/' + search)
                            .then((response) => {
                                // console.log(response.data);
                                setData(response.data)

                            })
                            .then((error) => {
                                console.log(error);
                            })
                    } else {
                        jsonserver.get('/resturant/delivery')
                            .then((response) => {
                                // console.log(response.data);
                                setData(response.data)

                            })
                            .then((error) => {
                                console.log(error);
                            })
                    }



                }
            } />

            {/* <TextInput placeholder="Search Anything" style={{ borderWidth: 1, borderColor: "white" }} placeholderTextColor="white" /> */}
            <FlatList
                data={data}
                keyExtractor={data._id}
                renderItem={({ item }) =>
                    <Pressable onPress={() => {
                        setTempId(item._id)
                        console.log("tempid again is: ", tempid);
                        toggleOverlay(item._id);
                    }

                    }>


                        <Card style={{ backgroundColor: "pink" }}>
                            <Card.Title style={{ fontSize: 18 }}>{item.name}</Card.Title>
                            <Card.Divider />
                            <Card.Image source={{ uri: item.url }} />
                            <Text style={{ marginBottom: 10 }}>
                                <Text style={{ fontWeight: "bold" }}>Location:</Text> {item.address}
                            </Text>
                            <Pressable style={{ backgroundColor: "#feb334", alignItems: "center", height: 35, justifyContent: "center", borderRadius: 10 }} onPress={() => toggleOverlay(item._id)}>
                                <Text>SHOW MENU</Text>
                            </Pressable>


                            <View style={{ flex: 1 }}>

                                <Overlay isVisible={visible} onBackdropPress={
                                    () => {

                                        toggleOverlay(item._id);
                                    }
                                }>
                                    <View flexDirection="row">
                                        <Image source={require('../../media/logo.png')} style={{ width: 100, height: 100, marginLeft: 130 }} />
                                        <Pressable onPress={toggleOverlay}>
                                            {/* <Image source={require('../media/res/drawable-xxxhdpi/baseline_clear_black_24.png')} style={{ width: 30, height: 30, marginLeft: 120 }} /> */}
                                            <Ionicons name="close-outline" size={40} color="black" style={{ marginLeft: 90 }} />
                                        </Pressable>

                                    </View>

                                    <ScrollView>
                                        <Card style={{ marginBottom: 25, width: Dimensions.get("window").width - 20 }}>
                                            <Card.Title>Menu</Card.Title>
                                            <Card.Divider />
                                            <ScrollView >
                                                {
                                                    menu.map((a) => {
                                                        return (
                                                            <Pressable onPress={() => alert(a._id)}>
                                                                <View style={{ width: Dimensions.get('window').width - 100, borderRadius: 10, borderWidth: 1, borderColor: "black", marginBottom: 5, backgroundColor: "#feb334" }}>
                                                                    <Text style={{ fontSize: 26, fontWeight: "bold", paddingLeft: 10, color: "white" }}>{a.name}</Text>
                                                                    <View style={{ flexDirection: "row" }}>
                                                                        <Text style={{ fontSize: 18, fontWeight: "bold", fontStyle: "italic", paddingLeft: 10, color: "#e1e1e1" }}>PKR {a.price}.00</Text>
                                                                        <Pressable onPress={() => {
                                                                            setTotalPrice(totalPrice + a.price)
                                                                            setCartStatus(cartstatus + 1);
                                                                            let cartDataCopy = [...cartData];
                                                                            let forjson = { name: a.name, price: a.price }

                                                                            cartDataCopy.push(forjson);
                                                                            setCartData(cartDataCopy);
                                                                            setCartData(cartDataCopy);
                                                                            // console.log(cartData)
                                                                        }} >
                                                                            {/* <Image source={require('../../media/res/drawable-xxxhdpi/baseline_add_circle_outline_black_48.png')} style={{ width: 30, height: 30, marginLeft: Dimensions.get("window").width }} /> */}
                                                                            <Ionicons name="add-circle-outline" size={25} style={{ marginLeft: Dimensions.get("window").width - 225 }} />
                                                                            {/* <Text>hello</Text> */}
                                                                        </Pressable>
                                                                    </View>
                                                                </View>
                                                            </Pressable>
                                                        );
                                                    })
                                                }
                                            </ScrollView>
                                        </Card>
                                    </ScrollView>
                                    <Pressable onPress={toggleOverlay2}>
                                        <View style={{ backgroundColor: "#feb334", height: 50, marginTop: 5, borderRadius: 15, alignContent: "center", alignItems: "center", justifyContent: "center" }}>
                                            <Badge value={cartstatus} status="primary" />
                                            <Badge value={<Text style={styles.textbtnprop}>CHECK ORDER</Text>} badgeStyle={{ backgroundColor: "transparent", borderWidth: 0 }} />

                                        </View>
                                    </Pressable>

                                    <Overlay isVisible={visible2} onBackdropPress={toggleOverlay2} overlayStyle={{ borderRadius: 25 }} backdropStyle={{}}>
                                        <View style={styles.formcontainer}>
                                            <StatusBar translucent backgroundColor="#feb334" />
                                            <Pressable onPress={toggleOverlay2}>
                                                <Ionicons name="close-outline" size={40} style={{ alignItems: "flex-end" }} />
                                            </Pressable>
                                            <Text style={styles.labeltext}>YOUR ORDER</Text>

                                            {
                                                cartData.map((c) => {
                                                    return (
                                                        <ScrollView>
                                                            <View style={{ width: Dimensions.get("window").width, backgroundColor: "white", marginBottom: 25, height: 70, justifyContent: "center" }}>
                                                                <Text style={{ marginLeft: 20, fontSize: 20 }}>{c.name}                 {c.price}.00</Text>

                                                            </View>
                                                        </ScrollView>
                                                    )
                                                })

                                            }
                                            <Text style={{ fontSize: 20 }}>Total : {totalPrice}</Text>




                                        </View>
                                    </Overlay>
                                    <Pressable onPress={toggleOverlay1}>
                                        <View style={{ backgroundColor: "#feb334", height: 50, marginTop: 5, borderRadius: 15, alignContent: "center", alignItems: "center", justifyContent: "center" }}>

                                            <Text style={styles.textbtnprop}>
                                                DELIVER
                                            </Text>
                                        </View>
                                    </Pressable>

                                    <Overlay isVisible={visible1} onBackdropPress={toggleOverlay1} overlayStyle={{ borderRadius: 25 }} backdropStyle={{}}>
                                        <View style={styles.formcontainer}>
                                            <StatusBar translucent backgroundColor="#feb334" />
                                            <Pressable onPress={toggleOverlay1}>
                                                <Ionicons name="close-outline" size={40} style={{ alignItems: "flex-end" }} />
                                            </Pressable>
                                            <Text style={styles.labeltext}>DETAILS</Text>
                                            {/* <Text style={{ color: "red" }}>{errorUp}</Text> noofpersons,date,time,comments */}
                                            {/* <Input placeholder="Number of Persons" keyboardType="number-pad" leftIcon={{ type: 'font-awesome', name: 'users' }} placeholderTextColor="black" containerStyle={styles.input} onChangeText={(noperson) => setNoOfPerson(noperson)} /> */}
                                            <Input placeholder="Address" leftIcon={{ type: 'font-awesome', name: 'map-marker-alt' }} placeholderTextColor="black" containerStyle={styles.input} onChangeText={(ad) => setAddress(ad)} />
                                            <DatePicker
                                                style={{
                                                    height: 50,
                                                    width: 200,

                                                    borderRadius: 15,
                                                    paddingLeft: 15,
                                                    fontSize: 16,
                                                    marginTop: 15,
                                                    color: "black"
                                                }}
                                                date={date}
                                                mode="date"
                                                placeholder="select date"
                                                format="YYYY-MM-DD"
                                                minDate="2020-11-10"
                                                maxDate="2020-12-31"
                                                confirmBtnText="Confirm"
                                                cancelBtnText="Cancel"
                                                customStyles={{
                                                    dateIcon: {
                                                        position: 'absolute',
                                                        left: 0,
                                                        top: 4,
                                                        marginLeft: 0
                                                    },
                                                    dateInput: {
                                                        marginLeft: 36
                                                    }
                                                    // ... You can check the source to find the other keys.
                                                }}
                                                onDateChange={(date) => { setDate(date) }}
                                            />


                                            {/* <Input leftIcon={{ type: 'font-awesome', name: 'lock' }} placeholder="Select Date" containerStyle={styles.input}  placeholderTextColor="black" onChangeText={(ps) => setPass(ps)}  /> */}
                                            <Pressable style={styles.btn} onPress={() => {
                                                // console.log("request sent");
                                                console.log(userData._id, tempid, cartData, address, date);
                                                jsonserver.post('/delivery', {
                                                    userId: userData._id,
                                                    resturantId: tempid,
                                                    totalBill: totalPrice,
                                                    address: address,

                                                    order: cartData
                                                })
                                                    .then((response) => {
                                                        console.log("this is response", response.data);

                                                        alert("confimed")

                                                    })
                                                    .catch(function (error) {
                                                        console.log(error.message);

                                                    })
                                            }} ><Text style={styles.textbtnprop} >{textreservation}</Text></Pressable>
                                            <Text></Text>

                                        </View>
                                    </Overlay>



                                </Overlay>
                            </View>
                        </Card>

                    </Pressable>}
            />
            
            <Text></Text>

        </ScrollView>
    )
}



export default DashBoardGetter;