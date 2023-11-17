import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Colors } from "../constants/colors";
import { Lenguage } from "../constants/Lenguage";
import { useSwitchUserRangeMutation } from "../services/InfoUserService";

const { height, width } = Dimensions.get("window");

const ModalCustomSetAdmin = ({ isModalOn, setIsModalOn, mensage, item, refetch }) => {

    //funcion lenguage
    const lenguageSelect = useSelector((state) => state.lenguage.Lenguage);
    const filter = Lenguage.filter((item) => item.id === lenguageSelect);
    const mapping = filter.map((item) => item.valor);
    const msg = mapping[0];

    const [triggerSwitchUser, resultSwitchUser] = useSwitchUserRangeMutation()

    const GiveAdmin = () => {
        if (item.userRange === "User") {
            triggerSwitchUser({
                localId: item.key,
                userName: item.userName,
                newRange: "Admin"
            }).then(result => refetch())
        } else {
            triggerSwitchUser({
                localId: item.key,
                userName: item.userName,
                newRange: "User"
            }).then(result => refetch())
        }
        setIsModalOn(!isModalOn)
    }

    return (
        <>
            <Modal visible={isModalOn} transparent={true}>
                <View style={styles.container}>
                    <View style={styles.containerModal}>
                        <View style={styles.containerText}>
                            <Text style={styles.msgTextError}>{msg.msgError}</Text>
                        </View>
                        <View style={styles.containerBox}>
                            <Text>{mensage}{item.userName}</Text>
                            <View style={styles.containerRow}>
                                <TouchableOpacity style={styles.containerbutton} onPress={() => setIsModalOn(!isModalOn)}>
                                    <Text style={styles.textClose}>X</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.containerbutton} onPress={GiveAdmin}>
                                    <Text style={styles.textClose}>✔</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default ModalCustomSetAdmin;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
    },
    containerModal: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: "#00000033",
        margin: 20,
        borderRadius: 16,
        paddingHorizontal: 30,
        paddingVertical: 10,
        shadowColor: Colors.white,
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    containerText: {
        width: width * 0.75,
        justifyContent: "flex-start",
        alignItems: "center",
        borderBottomColor: Colors.grey,
        borderBottomWidth: 2,

    },
    msgTextError: {
        fontSize: 16,
        fontFamily: "Inter-Bold",
    },
    containerBox: {
        marginTop: height * 0.015,
        justifyContent: "center",
        alignItems: "center",
    },
    containerbutton: {
        backgroundColor: Colors.primary,
        width: width * 0.08,
        height: width * 0.08,
        borderRadius: 5,
        marginVertical: height * 0.01,
        justifyContent: "center",
        alignItems: "center",
    },
    textClose: {
        fontFamily: "Inter-Bold",
        color: Colors.white,
    },
    containerRow: {
        marginTop: height * 0.01,
        flexDirection: "row",
        justifyContent: "space-around",
        width: width * 0.7,
    },
});