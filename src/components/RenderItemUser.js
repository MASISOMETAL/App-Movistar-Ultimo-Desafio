import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Lenguage } from "../constants/Lenguage";
import { Colors } from "../constants/colors";
import ModalCustomSetAdmin from "./ModalCustomSetAdmin";

const { widht, heigth } = Dimensions.get("window");

const RenderItemUsers = ({ item, refetch }) => {

    //funcion lenguage
    const lenguageSelect = useSelector((state) => state.lenguage.Lenguage);
    const filter = Lenguage.filter((item) => item.id === lenguageSelect);
    const mapping = filter.map((item) => item.valor);
    const msg = mapping[0];

    const [isModalOn, setIsModalOn] = useState(false);
    const [mensage, setMensage] = useState("");

    const onHandleGiveRange = () => {
        if (item.userRange == "Admin") {
            setMensage(msg.msgQuitarAdmin);
            setIsModalOn(!isModalOn)
        } else if (item.userRange == "User") {
            setMensage(msg.msgDarAdmin);
            setIsModalOn(!isModalOn)
        }
    }

    return (
        <TouchableOpacity style={styles.container} onPress={onHandleGiveRange}>
            <Text style={styles.textDescription}>{msg.msgNameUser}</Text>
            <Text style={styles.textInfo}>{item.userName}</Text>
            <Text style={styles.textDescription}>{msg.msgRange}</Text>
            <Text style={styles.textInfo}>{item.userRange}</Text>
            <ModalCustomSetAdmin isModalOn={isModalOn} setIsModalOn={setIsModalOn} mensage={mensage} item={item} refetch={refetch}  />
        </TouchableOpacity>
    )
}

export default RenderItemUsers;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderColor: Colors.primary,
        borderWidth: 1,
        borderRadius: 10,
        marginHorizontal: 10,
        marginTop: 10,
        padding: 5,
        paddingRight: 10,
    },
    textDescription: {
        fontFamily: "Inter-Bold",
        fontSize: 16,
        marginLeft: 10,
    },
    textInfo: {
        fontFamily: "Inter-Regular",
        marginLeft: 40,
    },
}) 