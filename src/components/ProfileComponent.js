import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker"
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Lenguage } from "../constants/Lenguage";
import { Colors } from "../constants/colors";
import {  useGetDataUserQuery, useSetProfilePhotoMutation } from "../services/InfoUserService";

const { height, width } = Dimensions.get("window");

const ProfileComponent = ({ nombre, range }) => {

    const [pickUrl, setPickUrl] = useState("https://i.ibb.co/qjWS478/perfil-empty.png");

    const localId = useSelector((state)=> state.auth.localId)
    const {data, isError, isLoading } = useGetDataUserQuery(localId)

    //funcion lenguage
    const lenguageSelect = useSelector((state) => state.lenguage.Lenguage);
    const filter = Lenguage.filter((item) => item.id === lenguageSelect);
    const mapping = filter.map((item) => item.valor);
    const msg = mapping[0];

    const [triggerSetPhoto, resultSetPhoto] = useSetProfilePhotoMutation()

    useEffect(()=> {
        if (!isLoading) {
            if (data?.photoProfile) {
                setPickUrl(data?.photoProfile)
            }
        }
    },[isLoading])

    const verifyPermissions = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();

        if (status !== "granted") {
            Alert.alert("you need to grant camera permissions to use this app", [{ text: "Okay" }]);
            return false;
        }
        return true;
    };

    const onHandleTakePhoto = async () => {
        const isCameraOk = await verifyPermissions()

        if (isCameraOk) {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [1, 1],
                base64: true,
                quality: 0.7,
            })
            if (!result.canceled) {
                setPickUrl(result.assets[0].uri)
                triggerSetPhoto({
                    localId: localId,
                    userName: data.userName,
                    newRange: data.userRange,
                    photoProfile: `data:image/jpeg;base64,${result.assets[0].base64}`
                })
            }
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.containerRow}>
                <TouchableOpacity style={styles.containerImage} onPress={onHandleTakePhoto}>
                    <Image style={styles.image} source={{ uri: pickUrl }} />
                </TouchableOpacity>
                <View style={styles.containerTextInfo}>
                    <Text style={styles.textName}>{nombre}</Text>
                    <Text style={styles.textRange}>{msg.msgRange} {range}</Text>
                </View>
            </View>
        </View>
    )
}

export default ProfileComponent;

//"https://i.ibb.co/qjWS478/perfil-empty.png"

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height * 0.13,
        //backgroundColor: Colors.green,
        justifyContent: "center",
        borderBottomColor: Colors.primary,
        borderBottomWidth: 1,
    },
    containerRow: {
        flexDirection: "row",
    },
    containerImage: {
        marginLeft: width * 0.05,
        borderRadius: 100,
        borderColor: Colors.primary,
        borderWidth: 1,
    },
    image: {
        width: width * 0.2,
        height: width * 0.2,
        resizeMode: "cover",
        borderRadius: 100,
    },
    containerTextInfo: {
        flex: 1,
        marginLeft: width * 0.02,
        //backgroundColor: Colors.blue,
        justifyContent: "center",
    },
    textName: {
        fontSize: 20,
        marginLeft: 10,
    },
    textRange: {
        fontSize: 16,
        marginLeft: 10,
    },
})