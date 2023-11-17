import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Colors } from "../constants/colors";
import { Lenguage } from "../constants/Lenguage";
import ProfileComponent from "../components/ProfileComponent";
import { selectLenguage } from "../features/LenguageSlice";
import { updateLanguage } from "../db";

const { height, width } = Dimensions.get("window");

const Settings = () => {

    const dispatch = useDispatch();
    const nombre = useSelector((state) => state.auth.userName);
    const range = useSelector((state) => state.auth.userRange);

    //funcion lenguage
    const lenguageSelect = useSelector((state) => state.lenguage.Lenguage);
    const filter = Lenguage.filter((item) => item.id === lenguageSelect);
    const mapping = filter.map((item) => item.valor);
    const msg = mapping[0];

    const onHandleLenguageSpanish = () => {
        dispatch(selectLenguage("ES"))
        updateLanguage("ES")
    }

    const onHandleLenguageEnglish = () => {
        dispatch(selectLenguage("EN"))
        updateLanguage("EN")
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerDecoration} />
            <ProfileComponent nombre={nombre} range={range} />
            <View style={styles.containerOptionLenguage}>
                <View style={styles.containerRow}>
                    <Text>{msg.msgEscogeIdioma}</Text>
                    <View style={styles.containerconfigure}>
                        <View style={styles.containerButtonsRow}>
                            <TouchableOpacity
                                style={lenguageSelect === "ES" ? styles.buttonSpanish : { ...styles.buttonSpanish, backgroundColor: Colors.grey }}
                                onPress={onHandleLenguageSpanish}
                                disabled={lenguageSelect === "ES"}
                            >
                                <Text>Español</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={lenguageSelect === "EN" ? styles.buttonEnglish : { ...styles.buttonEnglish, backgroundColor: Colors.grey }}
                                onPress={onHandleLenguageEnglish}
                                disabled={lenguageSelect === "EN"}
                            >
                                <Text>English</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Settings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerDecoration: {
        width: width,
        height: height * 0.04,
        backgroundColor: Colors.grey,
    },
    containerOptionLenguage: {
        width: width,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        marginLeft: 5,
    },
    containerRow: {
        flexDirection: "row",
        height: height * 0.04,
        width: width,
    },
    containerconfigure: {
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "center",
        marginRight: 10,
    },
    containerButtonsRow: {
        flexDirection: "row",
        borderWidth: 1,
    },
    buttonSpanish: {
        backgroundColor: Colors.primary,
        //padding: 3,
        width: width * 0.2,
        height: height * 0.03,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonEnglish: {
        backgroundColor: Colors.primary,
        width: width * 0.2,
        height: height * 0.03,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonModoOn: {
        backgroundColor: Colors.primary,
        width: width * 0.2,
        height: height * 0.03,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonModoOff: {
        backgroundColor: Colors.primary,
        width: width * 0.2,
        height: height * 0.03,
        justifyContent: "center",
        alignItems: "center",
    },
})