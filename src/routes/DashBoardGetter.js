import React, { useState, useCallback } from 'react'
import { Text, Image, View, Button, Pressable, Dimensions, StatusBar, BackHandler } from 'react-native'
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler'
import { Card, ListItem, Icon, Overlay, SocialIcon, withBadge, Badge, Input, Avatar } from 'react-native-elements'
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import jsonserver from '../server/jsonServer'
import styles from '../styles/style'
import Ionicons from 'react-native-vector-icons/Ionicons';
import CartScreen from '../screens/user/cart'
import DashBoardUser from '../screens/user/dashboardUser'
import DatePicker from 'react-native-datepicker'
import { ActivityIndicator } from 'react-native';
import { RefreshControl } from 'react-native';
import Modal from 'react-native-modal';


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
    const [textArea, setTextArea] = useState("")
    const [noOfPerson, setNoOfPerson] = useState(0)
    const [textreservation, setTextReservation] = useState("CONFIRM RESERVATION")
    const [totalPrice, setTotalPrice] = useState(0)
    const [checkCartData, setCheckCartData] = useState(true)
    const [easypaisaName, setEasypaisaName] = useState("")
    const [phoneNumber, setphoneNumber] = useState(0)
    const [amount, setAmount] = useState(0)
    const [activity, setActivity] = useState(true)
    const [activity1, setActivity1] = useState(true)
    const [activity2, setActivity2] = useState(true)
    const [refreshing, setRefreshing] = React.useState(false);
    const [popularRest, setPopularRest] = useState([])
    const [advanceSearch, setAdvanceSearch] = useState(false)
    const [aLocation, setALocation] = useState("")
    const [aType, setAType] = useState("")
    const [aBusget, setABudget] = useState(100)
    const [aDec, setADec] = useState("")

    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        jsonserver.get('/resturant/popularReservationRseturants')
            .then((response) => {
                // console.log("popular is: ----------->>>", response.data);
                setPopularRest(response.data)
                // alert("working")


            })
            .then((error) => {
                console.log("popular error ", error);
            })
        jsonserver.get('/resturant')
            .then((response) => {
                // console.log(response.data);
                setData(response.data)
                setActivity(false)

            })
            .then((error) => {
                console.log(error);
            })


        wait(2000).then(() => setRefreshing(false));
    }, []);





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
                // console.log("menu is : ", response.data);
                setMenu(response.data)
                setActivity1(false)
            })
            .then((error) => {
                console.log(error);
            })
        setVisible(!visible);

    };
    const getRestarent = () => {
        jsonserver.get('/resturant/popularReservationRseturants')
            .then((response) => {
                // console.log("popular is: ----------->>>", response.data);
                setPopularRest(response.data)


            })
            .then((error) => {
                console.log("popular error ", error);
            })
        jsonserver.get('/resturant')
            .then((response) => {
                console.log("---------------------------------------------------------------",response.data);
                setData(response.data)
                setActivity(false)

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
        <ScrollView style={{ backgroundColor: "#feb334" }}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }


        >
            {/* <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> */}
            {/* <ActivityIndicator color="white" animating={false} /> */}
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
                        jsonserver.get('/resturant')
                            .then((response) => {
                                setData(response.data)
                                setActivity(false)

                            })
                            .then((error) => {
                                console.log(error);
                            })
                    }



                }
            } />


            <Pressable style={{ width: "100%", flexDirection: "row" }} onPress={() => {
                setAdvanceSearch(!advanceSearch)
            }}

            >
                <Text style={{ color: "white", fontSize: 18, marginLeft: 15, width: "85%" }}>Apply filters</Text>
                <Ionicons name="filter-outline" size={20} color="white" style={{ alignSelf: "flex-end" }} />
            </Pressable>
            <View style={{ flex: 1,marginBottom:15 }}>


                <Modal isVisible={advanceSearch}>
                    <View style={{}}>
                        <View style={{ alignItems: "center", backgroundColor: "#feb334", borderRadius: 5 }}>
                            <View style={{ flexDirection: "row", justifyContent: "center" }} >
                                <Text style={{ color: "white", fontSize: 26, width: "85%" }}>Recomendation</Text>
                                <Pressable onPress={() => {
                                    setAdvanceSearch(!advanceSearch)
                                }}>
                                    <Ionicons name="close-outline" size={30} style={{}} />
                                </Pressable>
                            </View>
                            <Input placeholder="Location" inputContainerStyle={{ borderColor: "white", marginLeft: 0 }} leftIcon={<Ionicons name="search" size={20} color="white" style={{ marginLeft: 0 }} onChangeText={(al) => setALocation(al)} />} />
                            <Input placeholder="Type of Resturaunt" inputContainerStyle={{ borderColor: "white", marginLeft: 0 }} leftIcon={<Ionicons name="search" size={20} color="white" style={{ marginLeft: 0 }} />} onChangeText={(at) => setAType(at)} />
                            <Input placeholder="Budget (100,500,1000)" inputContainerStyle={{ borderColor: "white", marginLeft: 0 }} leftIcon={<Ionicons name="search" size={20} color="white" style={{ marginLeft: 0 }} />} onChangeText={(ab) => setABudget(ab)} />
                            <Input placeholder="what you want to eat?" inputContainerStyle={{ borderColor: "white", marginLeft: 0 }} leftIcon={<Ionicons name="search" size={20} color="white" style={{ marginLeft: 0 }} />} onChangeText={(ad) => setADec(ad)} />
                            <Pressable style={{ width: "90%", backgroundColor: "white", alignItems: "center", height: 40, justifyContent: "center", borderRadius: 15 }} onPress={() => {
                                jsonserver.post('/resturant/recomandationSearch', {
                                    location: aLocation,
                                    typeOfResturant: aType,
                                    averagePriceInMenu:aBusget,
                                    menuname:aDec
                                })
                                    .then((response) => {
                                        console.log(response.data);
                                        setData(response.data)
                                        setAdvanceSearch(!advanceSearch)
                                        
                                    })
                                    .catch(function (error) {
                                        console.log(error);
                                        
                                    })

                            }}>
                                <Text style={{ fontSize: 18, color: "black" }} >Search</Text>
                            </Pressable>
                            <Text></Text>
                        </View>


                    </View>
                </Modal>
            </View>












            {/* <TextInput placeholder="Search Anything" style={{ borderWidth: 1, borderColor: "white" }} placeholderTextColor="white" /> */}
            {activity ?
                <ActivityIndicator animating={activity} color="black" /> :

                <ScrollView


                >
                    <Text style={{ marginTop: 5, fontSize: 26, color: "white", marginLeft: 15 }} >Popular Restuarants</Text>
                    <FlatList

                        horizontal={true}


                        data={popularRest}
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
                                        <Text style={{ fontWeight: "bold" }}>Location:</Text> {item.location}

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
                                                <Image source={require('../media/logo.png')} style={{ width: 100, height: 100, marginLeft: 130 }} />
                                                <Pressable onPress={toggleOverlay}>
                                                    {/* <Image source={require('../media/res/drawable-xxxhdpi/baseline_clear_black_24.png')} style={{ width: 30, height: 30, marginLeft: 120 }} /> */}
                                                    <Ionicons name="close-outline" size={40} color="black" style={{ marginLeft: 90 }} />
                                                </Pressable>

                                            </View>

                                            <ScrollView>
                                                <Card style={{ marginBottom: 25, width:10 }} >
                                                    <Card.Title>Menu</Card.Title>
                                                    <Card.Divider />

                                                    {activity1 ? <ActivityIndicator color="black" animating={activity1} /> :
                                                        <ScrollView >
                                                            {
                                                                menu.map((a) => {
                                                                    return (
                                                                        <Pressable onPress={() => alert(a._id)}>
                                                                            <View style={{ width: Dimensions.get('window').width - 100, borderRadius: 10, borderWidth: 1, borderColor: "black", marginBottom: 5, backgroundColor: "#feb334" }}>
                                                                                <Text style={{ fontSize: 26, fontWeight: "bold", paddingLeft: 10, color: "white" }}>{a.name}</Text>
                                                                                <Text style={{ fontSize: 18, fontWeight: "bold", fontStyle: "italic", paddingLeft: 10, color: "#e1e1e1" }}>{a.discription}</Text>
                                                                                <View style={{ flexDirection: "row" }}>
                                                                                    <Text style={{ fontSize: 18, fontWeight: "bold", fontStyle: "italic", paddingLeft: 10, color: "#e1e1e1" }}>PKR {a.price}.00</Text>
                                                                                    <Pressable onPress={() => {
                                                                                        setCheckCartData(false)
                                                                                        setTotalPrice(totalPrice + a.price)
                                                                                        setCartStatus(cartstatus + 1);
                                                                                        let cartDataCopy = [...cartData];
                                                                                        let forjson = { name: a.name, price: a.price, discription: a.discription }
                                                                                        cartDataCopy.push(forjson);
                                                                                        setCartData(cartDataCopy);
                                                                                        setCartData(cartDataCopy);
                                                                                        // console.log(cartData)
                                                                                    }} >
                                                                                        <Image source={require('../media/res/drawable-xxxhdpi/baseline_add_circle_outline_black_48.png')} style={{ width: 30, height: 30, alignSelf: "flex-end" }} />
                                                                                    </Pressable>
                                                                                </View>
                                                                            </View>
                                                                        </Pressable>
                                                                    );
                                                                })
                                                            }
                                                        </ScrollView>
                                                    }
                                                </Card>
                                            </ScrollView>
                                            <Pressable onPress={toggleOverlay2}>
                                                <View style={{ backgroundColor: "#feb334", height: 50, marginTop: 5, borderRadius: 15, alignContent: "center", alignItems: "center", justifyContent: "center" }}>
                                                    <Badge value={cartstatus} status="primary" />
                                                    <Badge value={<Text style={styles.textbtnprop}>CHECK MENU</Text>} badgeStyle={{ backgroundColor: "transparent", borderWidth: 0 }} />

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
                                                                        <Text style={{ fontSize: 20, }}>{c.name}            {c.price}


                                                                            <Pressable onPress={() => {

                                                                                setCheckCartData(false)
                                                                                setTotalPrice(totalPrice - c.price)
                                                                                setCartStatus(cartstatus - 1);
                                                                                let arr = [];
                                                                                arr = cartData

                                                                                function checkAdult(cartdata) {
                                                                                    return cartdata.name === c.name;
                                                                                }
                                                                                let ind = cartData.findIndex(checkAdult)
                                                                                console.log("before ", arr);
                                                                                console.log(ind);
                                                                                arr.splice(ind, 1)
                                                                                console.log("after ", arr);

                                                                                setCartData(arr)

                                                                            }}>
                                                                                <Ionicons name="trash-outline" size={30} color="black" style={{ marginLeft: 20 }} />
                                                                            </Pressable>

                                                                        </Text>


                                                                    </View>
                                                                </ScrollView>
                                                            )
                                                        })

                                                    }
                                                    {checkCartData ?
                                                        <View style={{ width: Dimensions.get("window").width, backgroundColor: "white", marginBottom: 25, height: 70, justifyContent: "center" }}>
                                                            <Text style={{ marginLeft: 20, fontSize: 20 }}>You have no order</Text>

                                                        </View> :
                                                        <Text></Text>

                                                    }
                                                    <Text style={{ fontSize: 20 }}>Total : {totalPrice}</Text>




                                                </View>
                                            </Overlay>
                                            <Pressable onPress={toggleOverlay1}>
                                                <View style={{ backgroundColor: "#feb334", height: 50, marginTop: 5, borderRadius: 15, alignContent: "center", alignItems: "center", justifyContent: "center" }}>

                                                    <Text style={styles.textbtnprop}>
                                                        RESERVE
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

                                                    <Input placeholder="Number of Persons" keyboardType="number-pad" leftIcon={{ type: 'font-awesome', name: 'users' }} placeholderTextColor="black" containerStyle={styles.input} onChangeText={(noperson) => setNoOfPerson(noperson)} />
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
                                                    <Input placeholder="Easypaisa username" leftIcon={{ type: 'font-awesome', name: 'users' }} placeholderTextColor="black" containerStyle={styles.input} onChangeText={(ename) => setEasypaisaName(ename)} />
                                                    <Input placeholder="phone number" keyboardType="number-pad" leftIcon={{ type: 'font-awesome', name: 'users' }} placeholderTextColor="black" containerStyle={styles.input} onChangeText={(phonen) => setphoneNumber(phonen)} />
                                                    <Input placeholder='amount' keyboardType="number-pad" leftIcon={{ type: 'font-awesome', name: 'users' }} placeholderTextColor="black" containerStyle={styles.input} onChangeText={(am) => setAmount(am)} />

                                                    {/* <Input leftIcon={{ type: 'font-awesome', name: 'lock' }} placeholder="Select Date" containerStyle={styles.input}  placeholderTextColor="black" onChangeText={(ps) => setPass(ps)}  /> */}
                                                    <Pressable style={styles.btn} onPress={() => {
                                                        console.log("request sent");
                                                        console.log(userData._id, tempid, cartData, noOfPerson, date, textArea, easypaisaName, phoneNumber, amount);
                                                        jsonserver.post('/reservation', {

                                                            userId: userData._id,
                                                            resturantId: tempid,
                                                            noOfPersons: noOfPerson,
                                                            dateOfReservation: date,
                                                            order: cartData,
                                                            userEasyPaisaName: easypaisaName,
                                                            userEasyPaisaPhoneNo: phoneNumber,
                                                            paymentBeforeReservation: amount,
                                                            totalBill: totalPrice


                                                        })
                                                            .then((response) => {
                                                                console.log("this is response", response.data);
                                                                alert("CONFIRMED")

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
















                    <Text style={{ marginTop: 5, fontSize: 26, color: "white", marginLeft: 15 }} >All Restuarants</Text>
                    {/* <Text>workdddddding</Text>
                    <Text style={{fontSize:150,color:"white",width:300,backgroundColor:"red",marginLeft:15}}>
                        {
                            data.map((z)=>{
                                <Text>{z._id}</Text>
                            })
                        }
                    </Text> */}

                    <FlatList

                        horizontal={false}


                        data={data}
                        keyExtractor={data._id}
                        renderItem={({ item }) =>
                            <Pressable onPress={() => {
                                setTempId(item._id)
                                // console.log("tempid again is: ", tempid);
                                toggleOverlay(item._id);
                            }

                            }>


                                <Card style={{ backgroundColor: "pink" }}>
                                    <Card.Title style={{ fontSize: 18 }}>{item.name}</Card.Title>
                                    <Card.Divider />
                                    <Card.Image source={{ uri: item.url }} />
                                    <Text style={{ marginBottom: 10 }}>
                                        <Text style={{ fontWeight: "bold" }}>Location:</Text> {item.location}

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
                                                <Image source={require('../media/logo.png')} style={{ width: 100, height: 100, marginLeft: 130 }} />
                                                <Pressable onPress={toggleOverlay}>
                                                    {/* <Image source={require('../media/res/drawable-xxxhdpi/baseline_clear_black_24.png')} style={{ width: 30, height: 30, marginLeft: 120 }} /> */}
                                                    <Ionicons name="close-outline" size={40} color="black" style={{ marginLeft: 90 }} />
                                                </Pressable>

                                            </View>

                                            <ScrollView>
                                                <Card style={{ marginBottom: 25, width: Dimensions.get("window").width - 20 }}>
                                                    <Card.Title>Menu</Card.Title>
                                                    <Card.Divider />

                                                    {activity1 ? <ActivityIndicator color="black" animating={activity1} /> :
                                                        <ScrollView >
                                                            {
                                                                menu.map((a) => {
                                                                    return (
                                                                        <Pressable onPress={() => alert(a._id)}>
                                                                            <View style={{ width: Dimensions.get('window').width - 100, borderRadius: 10, borderWidth: 1, borderColor: "black", marginBottom: 5, backgroundColor: "#feb334", flexDirection: "row" }}>
                                                                                <View>


                                                                                </View>
                                                                                <View style={{ width: "85%" }}>
                                                                                    <Text style={{ fontSize: 26, fontWeight: "bold", paddingLeft: 10, color: "white", flexDirection: "column" }}>{a.name}</Text>
                                                                                    <Text style={{ fontSize: 18, fontWeight: "bold", fontStyle: "italic", paddingLeft: 10, color: "#e1e1e1" }}>{a.discription}</Text>
                                                                                    <Text style={{ fontSize: 18, fontWeight: "bold", fontStyle: "italic", paddingLeft: 10, color: "#e1e1e1" }}>PKR {a.price}</Text>

                                                                                </View>
                                                                                <View style={{ justifyContent: "center", width: "10%" }}>


                                                                                    <Pressable
                                                                                        style={{ alignSelf: "flex-end" }}

                                                                                        onPress={() => {

                                                                                            setCheckCartData(false)
                                                                                            setTotalPrice(totalPrice + a.price)
                                                                                            setCartStatus(cartstatus + 1);
                                                                                            let cartDataCopy = [...cartData];
                                                                                            let forjson = { name: a.name, price: a.price, discription: a.discription }
                                                                                            cartDataCopy.push(forjson);
                                                                                            setCartData(cartDataCopy);
                                                                                            setCartData(cartDataCopy);
                                                                                            // console.log(cartData)
                                                                                        }} >
                                                                                        <Image source={require('../media/res/drawable-xxxhdpi/baseline_add_circle_outline_black_48.png')} style={{ width: 30, height: 30 }} />
                                                                                    </Pressable>
                                                                                </View>


                                                                            </View>
                                                                        </Pressable>
                                                                    );
                                                                })
                                                            }
                                                        </ScrollView>
                                                    }
                                                </Card>
                                            </ScrollView>
                                            <Pressable onPress={toggleOverlay2}>
                                                <View style={{ backgroundColor: "#feb334", height: 50, marginTop: 5, borderRadius: 15, alignContent: "center", alignItems: "center", justifyContent: "center" }}>
                                                    <Badge value={cartstatus} status="primary" />
                                                    <Badge value={<Text style={styles.textbtnprop}>CHECK MENU</Text>} badgeStyle={{ backgroundColor: "transparent", borderWidth: 0 }} />

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
                                                                        <Text style={{ fontSize: 20, }}>{c.name}            {c.price}


                                                                            <Pressable onPress={() => {

                                                                                // console.log("orignal is : ", cartData)
                                                                                setCheckCartData(false)
                                                                                setTotalPrice(totalPrice - c.price)
                                                                                setCartStatus(cartstatus - 1);
                                                                                let arr = [];
                                                                                arr = cartData

                                                                                function checkAdult(cartdata) {
                                                                                    return cartdata.name === c.name;
                                                                                }
                                                                                let ind = cartData.findIndex(checkAdult)
                                                                                console.log("before ", arr);
                                                                                console.log(ind);
                                                                                arr.splice(ind, 1)
                                                                                console.log("after ", arr);

                                                                                setCartData(arr)



                                                                            }}>
                                                                                <Ionicons name="trash-outline" size={30} color="black" style={{ marginLeft: 20 }} />
                                                                            </Pressable>

                                                                        </Text>


                                                                    </View>
                                                                </ScrollView>
                                                            )
                                                        })

                                                    }
                                                    {checkCartData ?
                                                        <View style={{ width: Dimensions.get("window").width, backgroundColor: "white", marginBottom: 25, height: 70, justifyContent: "center" }}>
                                                            <Text style={{ marginLeft: 20, fontSize: 20 }}>You have no order</Text>

                                                        </View> :
                                                        <Text></Text>

                                                    }
                                                    <Text style={{ fontSize: 20 }}>Total : {totalPrice}</Text>




                                                </View>
                                            </Overlay>
                                            <Pressable onPress={toggleOverlay1}>
                                                <View style={{ backgroundColor: "#feb334", height: 50, marginTop: 5, borderRadius: 15, alignContent: "center", alignItems: "center", justifyContent: "center" }}>

                                                    <Text style={styles.textbtnprop}>
                                                        RESERVE
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

                                                    <Input placeholder="Number of Persons" keyboardType="number-pad" leftIcon={{ type: 'font-awesome', name: 'users' }} placeholderTextColor="black" containerStyle={styles.input} onChangeText={(noperson) => setNoOfPerson(noperson)} />
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
                                                    <Input placeholder="Easypaisa username" leftIcon={{ type: 'font-awesome', name: 'users' }} placeholderTextColor="black" containerStyle={styles.input} onChangeText={(ename) => setEasypaisaName(ename)} />
                                                    <Input placeholder="phone number" keyboardType="number-pad" leftIcon={{ type: 'font-awesome', name: 'users' }} placeholderTextColor="black" containerStyle={styles.input} onChangeText={(phonen) => setphoneNumber(phonen)} />
                                                    <Input placeholder='amount' keyboardType="number-pad" leftIcon={{ type: 'font-awesome', name: 'users' }} placeholderTextColor="black" containerStyle={styles.input} onChangeText={(am) => setAmount(am)} />

                                                    {/* <Input leftIcon={{ type: 'font-awesome', name: 'lock' }} placeholder="Select Date" containerStyle={styles.input}  placeholderTextColor="black" onChangeText={(ps) => setPass(ps)}  /> */}
                                                    <Pressable style={styles.btn} onPress={() => {
                                                        console.log("request sent");
                                                        console.log(userData._id, tempid, cartData, noOfPerson, date, textArea, easypaisaName, phoneNumber, amount);
                                                        jsonserver.post('/reservation', {

                                                            userId: userData._id,
                                                            resturantId: tempid,
                                                            noOfPersons: noOfPerson,
                                                            dateOfReservation: date,
                                                            order: cartData,
                                                            userEasyPaisaName: easypaisaName,
                                                            userEasyPaisaPhoneNo: phoneNumber,
                                                            paymentBeforeReservation: amount,
                                                            totalBill: totalPrice


                                                        })
                                                            .then((response) => {
                                                                console.log("this is response", response.data);
                                                                alert("CONFIRMED")

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

                </ScrollView>
            }
            <Text></Text>

        </ScrollView>
    )
}



export default DashBoardGetter;