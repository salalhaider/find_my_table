import { useLinkBuilder } from '@react-navigation/native';
import * as React from 'react';
import { Button, View, Text, StyleSheet, Dimensions, Image, Pressable, Alert } from 'react-native';
import { Card, Input } from 'react-native-elements';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import jsonserver from '../../server/jsonServer'
import sty from '../../styles/style'
import Modal from 'react-native-modal';



function Profile({ route, navigation }) {
    const { data } = route.params;
    const [temp, setTemp] = React.useState(data)
    // const [data, setData] = React.useState(data1)

    const [showReservation, setshowReservation] = React.useState(false)
    const [showUpdateProfile, setshowUpdateProfile] = React.useState(false)
    const [showDeliveries, setShowDeliveries] = React.useState(false)
    const [pending, setpending] = React.useState([])
    const [showPendings, setshowPendings] = React.useState(false)
    const [showConfimedReservations, setShowConfirmedReservations] = React.useState(false)
    const [userName, setUserName] = React.useState(data.name)
    const [userAddress, setUserAddress] = React.useState(data.location)
    const [userPhone, setUserPhone] = React.useState(data.phone)
    const [confirmed, setConfirmed] = React.useState([])
    const [reservationHistory, setReservationHistory] = React.useState([])
    const [showPastReservations, setShowPastReservations] = React.useState(false)
    const [pendingDeliveries, setPendingDeliveries] = React.useState([])
    const [showPendingDeliveries, setshowPendingDeliveries] = React.useState(false)
    const [showConfimedDeliveries, setShowConfirmedDeliveries] = React.useState(false)
    const [confirmedDeliveries, setConfirmedDeliveries] = React.useState([])
    const [DeliveriesHistory, setDeliveriesHistory] = React.useState([])
    const [showPastDeliveries, setShowPastDeliveries] = React.useState(false)
    const [review, setReview] = React.useState("")
    const [showReview, setShowReview] = React.useState(false)
    const [showMenu, setShowMenu] = React.useState(false)
    const [addMenu, setAddMenu] = React.useState(false)
    const [editMenuModal, setEditMenuModal] = React.useState(false)
    const [selectId, setSelectId] = React.useState("")
    const [mname, setMName] = React.useState("")
    const [mPrice, setMPrice] = React.useState("")
    const [mDis, setMDis] = React.useState("")
    const [mDec, setMDec] = React.useState("")
    const [editMenu, setEditMenu] = React.useState(false)
    const [addCat, setAddCat] = React.useState(false)





    // console.log(data);

    const changeUpdateProfile = () => {

        setshowUpdateProfile(!showUpdateProfile)

    }

    const ModalShow = (id) => {
        // alert(id)
        setSelectId(id)
        setEditMenuModal(!editMenuModal)


    }
    return (
        <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center', alignContent: "center" }}>
            <ScrollView style={styles.innercont}>
                <View style={styles.logoplusinfo}>
                    <Image source={require("../../media/logo.png")} style={{ width: 100, height: 100 }} />
                    <View style={{ marginLeft: 25 }}>
                        <Text style={{ fontSize: 36, color: "white" }}>{temp.name}</Text>
                        <Text style={{ fontSize: 20, color: "#e1e1e1" }}>{temp.email}</Text>
                        <Text style={{ fontSize: 20, color: "#e1e1e1" }}>0{temp.phone}</Text>

                    </View>

                </View>


                <Card.Divider />
                <Pressable style={{ height: 50, flexDirection: "row", alignItems: "center", backgroundColor: "#c18a2c" }} onPress={changeUpdateProfile}>
                    <Text style={styles.text}>Edit Profile</Text>
                    <Ionicons name="chevron-down-outline" size={20} color="black" style={{}} />
                </Pressable>

                {showUpdateProfile &&
                    <View style={{ marginBottom: 10 }}>

                        <Card style={{ marginBottom: 25 }}>
                            <Card.Title>Update Profile</Card.Title>
                            <Card.Divider />
                            <ScrollView >

                                <Input
                                    leftIcon={<Ionicons name="person-outline" />}
                                    value={userName}
                                    onChangeText={(val) => {
                                        setUserName(val)


                                    }}
                                    label="Name"

                                />
                                <Input
                                    leftIcon={<Ionicons name="location-outline" />}
                                    value={userAddress}
                                    onChangeText={(val1) => { setUserAddress(val1) }}
                                    label="Address"

                                />
                                <Input
                                    leftIcon={<Ionicons name="call-outline" />}
                                    value={userPhone}
                                    onChangeText={(val2) => { setUserPhone(val2) }}
                                    // keyboardType="number-pad"
                                    label="Phone"

                                />
                                <Pressable style={sty.opt} onPress={() => {
                                    // console.log(userName, userAddress, userPhone);

                                    jsonserver.put('user/' + data._id, {
                                        name: userName,
                                        phone: userPhone,
                                        address: userAddress,
                                    })
                                        .then((response) => {

                                            // console.log("this is response", response.data);
                                            // data = response.data
                                            alert("successfully changed")

                                            setTemp(response.data)
                                        })
                                        .catch(function (error) {
                                            alert(error)
                                        })

                                }} ><Text style={sty.textbtnprop} >Update</Text></Pressable>



                            </ScrollView>
                        </Card>

                    </View>
                }









                <Card.Divider />
                <Pressable style={{ height: 50, flexDirection: "row", alignItems: "center", backgroundColor: "#c18a2c" }} onPress={() => {

                    setShowMenu(!showMenu)
                }}>
                    <Text style={styles.text}>Menu</Text>
                    <Ionicons name="chevron-down-outline" size={20} color="black" style={{}} />
                </Pressable>



                {showMenu &&

                    <View style={{ marginBottom: 10 }}>
                        <Card.Divider />
                        <Pressable style={{ height: 30, flexDirection: "row", alignItems: "center", backgroundColor: "#c18a2c", width: "80%" }} onPress={() => {

                            setEditMenu(!editMenu)
                        }}>
                            <Text style={styles.text}>Show and edit menu</Text>
                            <Ionicons name="chevron-down-outline" size={20} color="black" style={{}} />
                        </Pressable>
                        {editMenu &&
                            <Card style={{ marginBottom: 25 }}>
                                <Card.Title>Menu</Card.Title>
                                <Card.Divider />
                                <ScrollView >
                                    {

                                        data.menu.map((f) => {

                                            return (
                                                <View>
                                                    <Text>
                                                        Name: {f.name}
                                                    </Text>
                                                    <Text>
                                                        Price: {f.price}
                                                    </Text>
                                                    <Text>
                                                        Discription: {f.discription}
                                                    </Text>
                                                    <View style={{ flexDirection: "row" }}>
                                                        <Text style={{ width: "90%" }}>
                                                            Catagory: {f.categie}
                                                        </Text>
                                                        <Pressable onPress={() => ModalShow(f._id)}>
                                                            <Ionicons name="create-outline" size={25} />
                                                        </Pressable>

                                                    </View>


                                                    <Card.Divider />

                                                </View>

                                            )

                                        })
                                    }
                                    <Modal isVisible={editMenuModal} backdropOpacity={0.7}>

                                        <View style={{ backgroundColor: "#feb334", alignItems: "center", borderRadius: 15 }}>
                                            <View style={{ flexDirection: "row", justifyContent: "center" }} >
                                                <Text style={{ color: "white", fontSize: 26, width: "85%" }}>Edit Menu</Text>
                                                <Pressable onPress={() => {
                                                    setEditMenuModal(!editMenuModal)
                                                }}>
                                                    <Ionicons name="close-outline" size={30} style={{}} />
                                                </Pressable>
                                            </View>
                                            <Input placeholder="Name" onChangeText={(mn) => { setMName(mn) }} />
                                            <Input placeholder="Price" keyboardType="number-pad" onChangeText={(mp) => { setMPrice(mp) }} />
                                            <Input placeholder="Discription" onChangeText={(md) => { setMDis(md) }} />
                                            <Input placeholder="Catagory" onChangeText={(mc) => { setMDec(mc) }} />
                                            <Pressable style={{ width: "90%", backgroundColor: "white", alignItems: "center", height: 40, justifyContent: "center", borderRadius: 15 }} onPress={() => {
                                                jsonserver.put('/resturant/menuupdate/' + selectId, {
                                                    name: mname,
                                                    discription: mDis,
                                                    price: mPrice,
                                                    menucategie: mDec
                                                })
                                                    .then((response) => {
                                                        // console.log(response.data);
                                                        alert("Sucessfully updated")
                                                        setEditMenuModal(!editMenuModal)


                                                    })
                                                    .catch(function (error) {
                                                        console.log(error);

                                                    })

                                            }}>
                                                <Text style={{ fontSize: 18, color: "black" }} >Update</Text>
                                            </Pressable>
                                            <Text></Text>
                                        </View>

                                    </Modal>

                                </ScrollView>
                            </Card>



                        }



                        <Card.Divider />
                        <Pressable style={{ height: 30, flexDirection: "row", alignItems: "center", backgroundColor: "#c18a2c", width: "80%" }} onPress={() => {

                            setAddMenu(!addMenu)
                        }}>
                            <Text style={styles.text}>Add menu</Text>
                            <Ionicons name="chevron-down-outline" size={20} color="black" style={{}} />
                        </Pressable>
                        {addMenu &&
                            <Card style={{ marginBottom: 25 }}>
                                <Card.Title>Add Menu</Card.Title>
                                <Card.Divider />
                                <ScrollView >
                                    <Input placeholder="Name" onChangeText={(mn) => { setMName(mn) }} />
                                    <Input placeholder="Price" keyboardType="number-pad" onChangeText={(mp) => { setMPrice(mp) }} />
                                    <Input placeholder="Discription" onChangeText={(md) => { setMDis(md) }} />
                                    <Input placeholder="Catagory" onChangeText={(mc) => { setMDec(mc) }} />
                                    <Pressable style={{ width: "95%", backgroundColor: "#feb334", alignItems: "center", height: 40, justifyContent: "center", borderRadius: 15 }} onPress={() => {
                                        jsonserver.post('/resturant/addMenu/' + data._id, {
                                            name: mname,
                                            discription: mDis,
                                            price: mPrice,
                                            menucategie: mDec
                                        })
                                            .then((response) => {
                                                // console.log(response.data);
                                                alert("Sucessfully Added")
                                                // setEditMenuModal(!editMenuModal)


                                            })
                                            .catch(function (error) {
                                                console.log(error);

                                            })

                                    }}>
                                        <Text style={{ fontSize: 18, color: "black" }} >Add</Text>
                                    </Pressable>

                                </ScrollView>
                            </Card>



                        }



                        <Card.Divider />
                        <Pressable style={{ height: 30, flexDirection: "row", alignItems: "center", backgroundColor: "#c18a2c", width: "80%" }} onPress={() => {

                            setAddCat(!addCat)
                        }}>
                            <Text style={styles.text}>Add Catagory</Text>
                            <Ionicons name="chevron-down-outline" size={20} color="black" style={{}} />
                        </Pressable>
                        {addCat &&
                            <Card style={{ marginBottom: 25 }}>
                                <Card.Title>Add Catagory</Card.Title>
                                <Card.Divider />
                                <ScrollView >
                                    <Input placeholder="Catagory" onChangeText={(mn) => { setMName(mn) }} />
                                    
                                    <Pressable style={{ width: "95%", backgroundColor: "#feb334", alignItems: "center", height: 40, justifyContent: "center", borderRadius: 15 }} onPress={() => {
                                        jsonserver.post('/resturant/addMenucategies/' + data._id, {
                                            name: mname,
                                            
                                        })
                                            .then((response) => {
                                                // console.log(response.data);
                                                alert("Sucessfully Added")
                                                // setEditMenuModal(!editMenuModal)


                                            })
                                            .catch(function (error) {
                                                console.log(error);

                                            })

                                    }}>
                                        <Text style={{ fontSize: 18, color: "black" }} >Add Catagory</Text>
                                    </Pressable>

                                </ScrollView>
                            </Card>



                        }





                    </View>
                }

                <Card.Divider />
                <Pressable style={{ height: 50, flexDirection: "row", alignItems: "center", backgroundColor: "#c18a2c" }} onPress={() => {

                    setshowReservation(!showReservation)
                }}>
                    <Text style={styles.text}>Reservations</Text>
                    <Ionicons name="chevron-down-outline" size={20} color="black" style={{}} />
                </Pressable>

                {showReservation &&
                    <View style={{ marginBottom: 10 }}>
                        <Pressable style={{ width: "80%", height: 30, flexDirection: "row", alignItems: "center", backgroundColor: "#c18a2c", marginTop: 5 }} onPress={() => {
                            // console.log("from pending");
                            jsonserver.get('/resturant/Reservetion/placed/' + data._id)
                                .then((response) => {

                                    setpending(response.data)
                                    // console.log("pending comming ", response.data);
                                })
                                .then((error) => {
                                    console.log(error);
                                })
                            setshowPendings(!showPendings)
                        }}>
                            <Text style={styles.text}>Pending</Text>
                            <Ionicons name="chevron-down-outline" size={20} color="black" style={{}} />
                        </Pressable>
                        {showPendings &&

                            <Card style={{ marginBottom: 25 }}>
                                <Card.Title>Reservated Resturant</Card.Title>
                                <Card.Divider />
                                <ScrollView >
                                    {

                                        pending.map((a) => {

                                            return (
                                                <View>
                                                    <Text>
                                                        Name of Customer: {a.user.userName}
                                                    </Text>
                                                    <Text>
                                                        Phone Number: {a.user.userPhone}
                                                    </Text>
                                                    <Text>
                                                        No of Persons: {a.noOfPersons}
                                                    </Text>
                                                    <Text>
                                                        Date of Reservation: {a.dateOfReservation}
                                                    </Text>
                                                    <Text>
                                                        Easypaisa Name: {a.userEasyPaisaName}
                                                    </Text>
                                                    <Text>
                                                        Easypaisa Phone: {a.userEasyPaisaPhoneNo}
                                                    </Text>
                                                    <Text>
                                                        Patment Before Reservation: {a.paymentBeforeReservation}
                                                    </Text>

                                                    <View>
                                                        {
                                                            a.order.map((b) => {
                                                                return (
                                                                    <View style={{ flexDirection: "column" }}>
                                                                        <Text>Menu name: {b.name}</Text>
                                                                        <Text>Price is: {b.price}</Text>
                                                                    </View>
                                                                )
                                                            })
                                                        }
                                                    </View>
                                                    <View style={{ flexDirection: "row" }}>
                                                        <Pressable style={sty.opt} onPress={() => {
                                                            // console.log(userName, userAddress, userPhone);

                                                            jsonserver.get('/resturant/confirmReservation/' + a._id)
                                                                .then((response) => {
                                                                    // console.log("this is response", response.data);
                                                                    alert("successfully Accepted")

                                                                })
                                                                .catch(function (error) {
                                                                    alert(error)
                                                                })

                                                        }} ><Text style={sty.textbtnprop} >Confirm</Text></Pressable>

                                                        <Pressable style={sty.opt} onPress={() => {
                                                            // console.log(userName, userAddress, userPhone);

                                                            jsonserver.put('resturant/rejectReservation/' + a._id, {
                                                                rejectionReason: "unknown"
                                                            })
                                                                .then((response) => {
                                                                    // console.log("this is response", response.data);
                                                                    alert("successfully canceled")

                                                                })
                                                                .catch(function (error) {
                                                                    alert(error)
                                                                })

                                                        }} ><Text style={sty.textbtnprop} >Reject</Text></Pressable>
                                                    </View>


                                                    <Card.Divider />

                                                </View>

                                            )

                                        })
                                    }
                                </ScrollView>
                            </Card>





                        }

                        <Card.Divider />

                        <Pressable style={{ width: "80%", height: 30, flexDirection: "row", alignItems: "center", backgroundColor: "#c18a2c", marginTop: 5 }} onPress={() => {
                            jsonserver.get('resturant/confirmdReservation/' + data._id)
                                .then((response) => {

                                    setConfirmed(response.data)
                                    // console.log("confirmed comming ", response.data);
                                    // alert("working")


                                })
                                .then((error) => {
                                    console.log(error);
                                })
                            setShowConfirmedReservations(!showConfimedReservations);

                        }}>
                            <Text style={styles.text}>Confirmed</Text>
                            <Ionicons name="chevron-down-outline" size={20} color="black" style={{}} />
                        </Pressable>
                        {showConfimedReservations &&

                            <Card style={{ marginBottom: 25 }}>
                                <Card.Title>Reservated Resturant</Card.Title>
                                <Card.Divider />
                                <ScrollView >
                                    {

                                        confirmed.map((a) => {

                                            return (
                                                <View>
                                                    <Text>
                                                        Name of Customer: {a.user.userName}
                                                    </Text>
                                                    <Text>
                                                        Phone Number: {a.user.userPhone}
                                                    </Text>
                                                    <Text>
                                                        No of Persons: {a.noOfPersons}
                                                    </Text>
                                                    <Text>
                                                        Date of Reservation: {a.dateOfReservation}
                                                    </Text>
                                                    <Text>
                                                        Easypaisa Name: {a.userEasyPaisaName}
                                                    </Text>
                                                    <Text>
                                                        Easypaisa Phone: {a.userEasyPaisaPhoneNo}
                                                    </Text>
                                                    <Text>
                                                        Patment Before Reservation: {a.paymentBeforeReservation}
                                                    </Text>
                                                    <View>
                                                        {
                                                            a.order.map((b) => {
                                                                return (
                                                                    <View style={{ flexDirection: "column" }}>
                                                                        <Text>Menu name: {b.name}</Text>
                                                                        <Text>Price is: {b.price}</Text>
                                                                    </View>
                                                                )
                                                            })
                                                        }
                                                    </View>
                                                    <Pressable style={sty.opt} onPress={() => {
                                                        // console.log(userName, userAddress, userPhone);

                                                        jsonserver.get('resturant/completeReservation/' + a._id, {
                                                            rejectionReason: "unknown"
                                                        })
                                                            .then((response) => {
                                                                // console.log("this is response", response.data);
                                                                alert("successfully Done")

                                                            })
                                                            .catch(function (error) {
                                                                alert(error)
                                                            })

                                                    }} ><Text style={sty.textbtnprop} >Done</Text></Pressable>



                                                    <Card.Divider />

                                                </View>

                                            )

                                        })
                                    }
                                </ScrollView>
                            </Card>





                        }


                        <Card.Divider />

                        <Pressable style={{ width: "80%", height: 30, flexDirection: "row", alignItems: "center", backgroundColor: "#c18a2c", marginTop: 5 }} onPress={() => {
                            jsonserver.get('resturant/completedReservation/' + data._id)
                                .then((response) => {

                                    setReservationHistory(response.data)
                                    // console.log("confirmed comming ", response.data);
                                    // alert("working")


                                })
                                .then((error) => {
                                    console.log(error);
                                })
                            setShowPastReservations(!showPastReservations);

                        }}>
                            <Text style={styles.text}>Past Reservations</Text>
                            <Ionicons name="chevron-down-outline" size={20} color="black" style={{}} />
                        </Pressable>
                        {showPastReservations &&

                            <Card style={{ marginBottom: 25 }}>
                                <Card.Title>Reservated Resturant</Card.Title>
                                <Card.Divider />
                                <ScrollView >
                                    {

                                        reservationHistory.map((a) => {

                                            return (
                                                <View>
                                                    <Text>
                                                        Name of Customer: {a.user.userName}
                                                    </Text>
                                                    <Text>
                                                        Phone Number: {a.user.userPhone}
                                                    </Text>
                                                    <Text>
                                                        No of Persons: {a.noOfPersons}
                                                    </Text>
                                                    <Text>
                                                        Date of Reservation: {a.dateOfReservation}
                                                    </Text>
                                                    <Text>
                                                        Easypaisa Name: {a.userEasyPaisaName}
                                                    </Text>
                                                    <Text>
                                                        Easypaisa Phone: {a.userEasyPaisaPhoneNo}
                                                    </Text>
                                                    <Text>
                                                        Patment Before Reservation: {a.paymentBeforeReservation}
                                                    </Text>
                                                    <Text>
                                                        Reservation Status: {a.reservationStatus}
                                                    </Text>


                                                    <View>
                                                        {
                                                            a.order.map((b) => {
                                                                return (
                                                                    <View style={{ flexDirection: "column" }}>
                                                                        <Text>Menu name: {b.name}</Text>
                                                                        <Text>Price is: {b.price}</Text>
                                                                    </View>
                                                                )
                                                            })
                                                        }
                                                    </View>



                                                    <Card.Divider />

                                                </View>

                                            )

                                        })
                                    }
                                </ScrollView>
                            </Card>





                        }





                    </View>
                }



                <Card.Divider />


























                <Pressable style={{ height: 50, flexDirection: "row", alignItems: "center", backgroundColor: "#c18a2c" }} onPress={() => {
                    setShowDeliveries(!showDeliveries)
                }}>
                    <Text style={styles.text}>Deliveries</Text>
                    <Ionicons name="chevron-down-outline" size={20} color="black" style={{}} />
                </Pressable>

                {showDeliveries &&
                    <View style={{ marginBottom: 10 }}>
                        <Pressable style={{ width: "80%", height: 30, flexDirection: "row", alignItems: "center", backgroundColor: "#c18a2c", marginTop: 5 }} onPress={() => {
                            // console.log("from pending");
                            jsonserver.get('resturant/Delivery/placed/' + data._id)
                                .then((response) => {

                                    setPendingDeliveries(response.data)
                                    // console.log("pending comming ", response.data);
                                })
                                .then((error) => {
                                    console.log(error);
                                })
                            setshowPendingDeliveries(!showPendingDeliveries)
                        }}>
                            <Text style={styles.text}>Pending</Text>
                            <Ionicons name="chevron-down-outline" size={20} color="black" style={{}} />
                        </Pressable>
                        {showPendingDeliveries &&

                            <Card style={{ marginBottom: 25 }}>
                                <Card.Title>Reservated Resturant</Card.Title>
                                <Card.Divider />
                                <ScrollView >
                                    {

                                        pendingDeliveries.map((a) => {

                                            return (
                                                <View>
                                                    <Text>
                                                        Name of Resturant: {a.resturant.resturantName}
                                                    </Text>
                                                    <Text>
                                                        Phone Number: {a.user.userPhone}
                                                    </Text>

                                                    <Text>
                                                        Date of Reservation: {a.dateOfReservation}
                                                    </Text>
                                                    <Text>
                                                        Easypaisa Name: {a.userEasyPaisaName}
                                                    </Text>
                                                    <Text>
                                                        Easypaisa Phone: {a.userEasyPaisaPhoneNo}
                                                    </Text>
                                                    <Text>
                                                        Patment Before Reservation: {a.paymentBeforeReservation}
                                                    </Text>
                                                    <View>
                                                        {
                                                            a.order.map((b) => {
                                                                return (
                                                                    <View style={{ flexDirection: "column" }}>
                                                                        <Text>Menu name: {b.name}</Text>
                                                                        <Text>Price is: {b.price}</Text>
                                                                    </View>
                                                                )
                                                            })
                                                        }
                                                    </View>
                                                    <View style={{ flexDirection: "row" }}>
                                                        <Pressable style={sty.opt} onPress={() => {
                                                            // console.log(userName, userAddress, userPhone);

                                                            jsonserver.get('resturant/confirmDelivery/' + a._id)
                                                                .then((response) => {
                                                                    // console.log("this is response", response.data);
                                                                    alert("successfully Accepted")

                                                                })
                                                                .catch(function (error) {
                                                                    alert(error)
                                                                })

                                                        }} ><Text style={sty.textbtnprop} >Confirm</Text></Pressable>

                                                        <Pressable style={sty.opt} onPress={() => {
                                                            // console.log(userName, userAddress, userPhone);

                                                            jsonserver.put('resturant/rejectDelivery/' + a._id, {
                                                                rejectionReason: "unknown"
                                                            })
                                                                .then((response) => {
                                                                    // console.log("this is response", response.data);
                                                                    alert("successfully canceled")

                                                                })
                                                                .catch(function (error) {
                                                                    alert(error)
                                                                })

                                                        }} ><Text style={sty.textbtnprop} >Reject</Text></Pressable>
                                                    </View>


                                                    <Card.Divider />

                                                </View>

                                            )

                                        })
                                    }
                                </ScrollView>
                            </Card>





                        }

                        <Card.Divider />


                        <Pressable style={{ width: "80%", height: 30, flexDirection: "row", alignItems: "center", backgroundColor: "#c18a2c", marginTop: 5 }} onPress={() => {
                            jsonserver.get('resturant/Delivery/confirm/' + data._id)
                                .then((response) => {

                                    setConfirmedDeliveries(response.data)
                                    // console.log("confirmed comming ", response.data);
                                    // alert("working")


                                })
                                .then((error) => {
                                    console.log(error);
                                })
                            setShowConfirmedDeliveries(!showConfimedDeliveries);

                        }}>
                            <Text style={styles.text}>Confirmed</Text>
                            <Ionicons name="chevron-down-outline" size={20} color="black" style={{}} />
                        </Pressable>
                        {showConfimedDeliveries &&

                            <Card style={{ marginBottom: 25 }}>
                                <Card.Title>Reservated Resturant</Card.Title>
                                <Card.Divider />
                                <ScrollView >
                                    {

                                        confirmedDeliveries.map((a) => {

                                            return (
                                                <View>
                                                    <Text>
                                                        Name of Customer: {a.user.userName}
                                                    </Text>
                                                    <Text>
                                                        Phone Number: {a.user.userPhone}
                                                    </Text>

                                                    <Text>
                                                        Date of Reservation: {a.dateOfReservation}
                                                    </Text>
                                                    <Text>
                                                        Address: {a.address}
                                                    </Text>
                                                    {/* <Text>
                                                        Easypaisa Name: {a.userEasyPaisaName}
                                                    </Text>
                                                    <Text>
                                                        Easypaisa Phone: {a.userEasyPaisaPhoneNo}
                                                    </Text> */}
                                                    {/* <Text>
                                                        Patment Before Reservation: {a.paymentBeforeReservation}
                                                    </Text> */}
                                                    <View>
                                                        {
                                                            a.order.map((b) => {
                                                                return (
                                                                    <View style={{ flexDirection: "column" }}>
                                                                        <Text>Menu name: {b.name}</Text>
                                                                        <Text>Price is: {b.price}</Text>
                                                                    </View>
                                                                )
                                                            })
                                                        }
                                                    </View>
                                                    <Pressable style={sty.opt} onPress={() => {
                                                        // console.log(userName, userAddress, userPhone);

                                                        jsonserver.get('resturant/completedDelivery/' + a._id, {
                                                            rejectionReason: "unknown"
                                                        })
                                                            .then((response) => {
                                                                // console.log("this is response", response.data);
                                                                alert("successfully Done")

                                                            })
                                                            .catch(function (error) {
                                                                alert(error)
                                                            })

                                                    }} ><Text style={sty.textbtnprop} >Complete</Text></Pressable>



                                                    <Card.Divider />

                                                </View>

                                            )

                                        })
                                    }
                                </ScrollView>
                            </Card>





                        }

                        <Card.Divider />

                        <Pressable style={{ width: "80%", height: 30, flexDirection: "row", alignItems: "center", backgroundColor: "#c18a2c", marginTop: 5 }} onPress={() => {
                            jsonserver.get('resturant/Delivery/Completed/' + data._id)
                                .then((response) => {

                                    setDeliveriesHistory(response.data)
                                    // console.log("confirmed deliviereis ", response.data);
                                    // alert("working")


                                })
                                .then((error) => {
                                    console.log(error);
                                })
                            setShowPastDeliveries(!showPastDeliveries);

                        }}>
                            <Text style={styles.text}>Past Deliveries</Text>
                            <Ionicons name="chevron-down-outline" size={20} color="black" style={{}} />
                        </Pressable>
                        {showPastDeliveries &&

                            <Card style={{ marginBottom: 25 }}>
                                <Card.Title>Reservated Resturant</Card.Title>
                                <Card.Divider />
                                <ScrollView >
                                    {

                                        DeliveriesHistory.map((a) => {

                                            return (
                                                <View>
                                                    <Text>
                                                        Name of Customer: {a.user.userName}
                                                    </Text>
                                                    <Text>
                                                        Phone Number: {a.user.userPhone}
                                                    </Text>

                                                    <Text>
                                                        Date of Reservation: {a.dateOfReservation}
                                                    </Text>

                                                    <Text>
                                                        Address: {a.address}
                                                    </Text>
                                                    <View>
                                                        {
                                                            a.order.map((b) => {
                                                                return (
                                                                    <View style={{ flexDirection: "column" }}>
                                                                        <Text>Menu name: {b.name}</Text>
                                                                        <Text>Price is: {b.price}</Text>
                                                                    </View>
                                                                )
                                                            })
                                                        }
                                                    </View>
                                                    <Text>
                                                        Delivery Status: {a.deliveryStatus}
                                                    </Text>



                                                    <Card.Divider />

                                                </View>

                                            )

                                        })
                                    }
                                </ScrollView>
                            </Card>





                        }










                    </View>
                }

                <Card.Divider />

                <Pressable style={{ height: 50, flexDirection: "row", alignItems: "center", backgroundColor: "#c18a2c" }} onPress={() =>
                    navigation.navigate('LoginRest')
                }>
                    <Text style={styles.text}>LogOut</Text>
                    <Ionicons name="log-out-outline" size={20} color="black" style={{}} />
                </Pressable>

            </ScrollView>

        </ScrollView >
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",


    },
    innercont: {
        width: Dimensions.get("window").width - 50,
        backgroundColor: "#feb334",
        marginTop: 20,
        borderRadius: 10

    },
    logoplusinfo: {
        flexDirection: "row",
        marginVertical: 5,
        marginLeft: 15

    },
    text: {
        fontSize: 26,
        color: "white",
        paddingLeft: 15,
        width: "90%"

    }
})

export default Profile;