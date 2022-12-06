import { useLinkBuilder } from '@react-navigation/native';
import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { Button, View, Text, StyleSheet, Dimensions, Image, Pressable } from 'react-native';
import { Card, Divider, Input } from 'react-native-elements';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import jsonserver from '../../server/jsonServer'
import STyles from '../../styles/style'

function Profile({ route }) {
    const { data } = route.params;
    const [pendingReservation, setPendingReservations] = useState(0)
    const [confirmReservation, setConfirmReservations] = useState(0)
    const [pastReservation, setPastReservations] = useState(0)

    const [control, setControl] = useState(true);

    const [pendingDeliveries, setPendingDeliveriess] = useState(0)
    const [confirmDeliveries, setConfirmDeliveriess] = useState(0)
    const [incomeDeliveries, setIncomeDeliveries] = useState(0)
    // console.log(data.name);





    const calling = () => {
        jsonserver.get('/resturant/Reservetion/placed/' + data._id)
            .then((response) => {
                setPendingReservations(response.data.length)
            })
            .then((error) => {
                console.log(error);
            })
        jsonserver.get('/resturant/confirmdReservation/' + data._id)
            .then((response) => {
                setConfirmReservations(response.data.length)
            })
            .then((error) => {
                console.log(error);
            })
        jsonserver.get('/resturant/Reservetion/Completed/' + data._id)
            .then((response) => {
                // console.log(response);
                var arr = response.data
                // console.log(arr);
                var total = 0

                arr.map((a) => {
                    total = total + a.totalBill
                })
                setPastReservations(total)
                // setPastReservations(response.data)
            })
            .then((error) => {
                console.log("errors are ", error);
            })



        jsonserver.get('/resturant/Delivery/placed/' + data._id)
            .then((response) => {
                // console.log("llllllllllllllllllllllllllllllllllllll",response.data);
                setPendingDeliveriess(response.data.length)
            })
            .then((error) => {
                console.log("errors are ", error);
            })
        jsonserver.get('/resturant/Delivery/confirm/' + data._id)
            .then((response) => {
                // console.log(response);
                setConfirmDeliveriess(response.data.length)
            })
            .then((error) => {
                console.log("errors are ", error);
            })
        jsonserver.get('/resturant/Delivery/Completed/' + data._id)
            .then((response) => {
                var arr = response.data
                // console.log(arr);
                var total = 0

                arr.map((a) => {
                    total = total + a.totalBill
                })
                setIncomeDeliveries(total)

            })
            .then((error) => {
                console.log("errors are ", error);
            })
    }

    if (control == true) {
        calling();
        setControl(false)
    };




    return (
        <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center', alignContent: "center" }}>
            <StatusBar hidden />

            <Text style={{ fontSize: 36, color: "white", alignSelf: "flex-start", marginLeft: "10%" }}>Reservations</Text>
            <View style={{ width: "80%", height: 100, backgroundColor: "white", marginVertical: 15, alignItems: "center" }}>
                <Text style={{ fontSize: 26, marginBottom: 15 }}>Pending</Text>
                <Divider style={{ backgroundColor: "black", width: "80%" }} />
                <Text style={{ fontSize: 40 }}>{pendingReservation}</Text>
            </View>

            <View style={{ width: "80%", height: 100, backgroundColor: "white", marginVertical: 15, alignItems: "center" }}>
                <Text style={{ fontSize: 26, marginBottom: 15 }}>Confirm</Text>
                <Divider style={{ backgroundColor: "black", width: "80%" }} />
                <Text style={{ fontSize: 40 }}>{confirmReservation}</Text>
            </View>

            <View style={{ width: "80%", height: 100, backgroundColor: "white", marginVertical: 15, alignItems: "center" }}>
                <Text style={{ fontSize: 26, marginBottom: 15 }}>Income</Text>
                <Divider style={{ backgroundColor: "black", width: "80%" }} />
                <Text style={{ fontSize: 40 }}>{pastReservation}</Text>
            </View>











            <Text style={{ fontSize: 36, color: "white", alignSelf: "flex-start", marginLeft: "10%" }}>Deliveries</Text>
            <View style={{ width: "80%", height: 100, backgroundColor: "white", marginVertical: 15, alignItems: "center" }}>
                <Text style={{ fontSize: 26, marginBottom: 15 }}>Pendings</Text>
                <Divider style={{ backgroundColor: "black", width: "80%" }} />
                <Text style={{ fontSize: 40 }}>{pendingDeliveries}</Text>
            </View>

            <View style={{ width: "80%", height: 100, backgroundColor: "white", marginVertical: 15, alignItems: "center" }}>
                <Text style={{ fontSize: 26, marginBottom: 15 }}>Confirmed</Text>
                <Divider style={{ backgroundColor: "black", width: "80%" }} />
                <Text style={{ fontSize: 40 }}>{confirmDeliveries}</Text>
            </View>

            <View style={{ width: "80%", height: 100, backgroundColor: "white", marginVertical: 15, alignItems: "center" }}>
                <Text style={{ fontSize: 26, marginBottom: 15 }}>Income</Text>
                <Divider style={{ backgroundColor: "black", width: "80%" }} />
                <Text style={{ fontSize: 40 }}>{incomeDeliveries}</Text>
            </View>

        </ScrollView>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#feb334",


    },
    input: {
        height: 50,
        width: 250,
        borderRadius: 15,
        paddingLeft: 15,
        fontSize: 16,
        marginTop: 15,
        color: "black"
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
        paddingLeft: 15

    }
})

export default Profile;