import React from 'react'
import { Dimensions, StyleSheet } from 'react-native'



export default StyleSheet.create({



    input: {
        height: 50,
        width: 250,
        
        borderRadius: 15,
        paddingLeft: 15,
        fontSize: 16,
        marginTop: 15,
        color: "black"
    },
    btn: {
        height: 50,
        width: 250,
        borderWidth: 1,
        borderColor: "transparent",
        backgroundColor: "white",
        borderRadius: 15,
        fontSize: 20,
        marginTop: 25,
        color: "black",
        alignItems: "center",
        justifyContent: "center"
    },
    txt: {
        height: 50,
        width: 250,
        borderColor: "white",
        backgroundColor: "transparent",
        borderRadius: 15,
        fontSize: 20,
        marginTop: 25,
        color: "black",
        alignItems: "center",
        justifyContent: "center"
    },


    text: {
        color: "grey",
        fontSize: 30,
        fontWeight: "bold"
    },
    mainContainer: {
        alignItems: "center",
        flex: 1,
        backgroundColor: "white",
        


    },
    upperRound: {
        
        
    },
    opt: {
        flexDirection: "row",
        height: 50,
        width: 125,
        borderWidth: 1,
        borderColor: "white",
        backgroundColor: "#feb334",
        borderRadius: 15,
        fontSize: 20,
        marginTop: 25,
        color: "black",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 5
    },
    navigatortext: {
        color: "black",
        textDecorationLine: "underline"
    },
    formcontainer:{
       backgroundColor:"#feb334",
       width:"80%",
       alignItems:"center",
       borderRadius:25
    },
    labeltext:
    { fontSize: 36, fontWeight: "bold", color: "black", marginTop: 25 },
    textbtnprop:{ color: "black", fontSize: 20 },
    black:{
        color:"white"
    },
    logo:{width:150,height:150,alignContent:"center",marginTop:"15%"},
    closemenu:{

        height: 25,
        width: Dimensions.get("window").width-40,
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: "white",
        borderRadius: 15,
        fontSize: 20,
        marginTop: 25,
        color: "black",
        alignItems: "center",
        justifyContent: "center"

    },
    cartstatus:{
        height: 50,
        width: Dimensions.get("window").width-40,
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: "#feb334",
        borderRadius: 15,
        fontSize: 20,
        marginTop: 25,
        color: "black",
        alignItems: "center",
        justifyContent: "center"
    }
})