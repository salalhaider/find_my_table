import React, { useEffect, useState } from 'react'
import { Component } from 'react';
import { View, Text, Button, Pressable, StatusBar, TextInput, StyleSheet, Image } from 'react-native'
import ImagePicker from 'react-native-image-picker';


export default class pic {
   
    HandlePicture = () => {
        const options = {
            title: 'Select Profile Picture',
            maxWidth: 200,
            maxHeight: 200,
            quality: 1,
            includeBase64: true,
            storageOptions: {
                skipBackup: true,
                path: '../Android/data/com.findmytable/files',
                includeBase64: true
            },

        };
        ImagePicker.showImagePicker(options, (response) => {
            // console.log('Response = ', response.data);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                // const uri = response.uri;
                // this.setState({ selectedPictureUri: response.data })
                return response.data
                // console.log("this is uri ------------------->>>", uri);
            }
        })

    }
}