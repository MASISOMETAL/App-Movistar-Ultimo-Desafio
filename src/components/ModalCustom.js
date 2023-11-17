import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Lenguage } from "../constants/Lenguage";
import { useSelector } from "react-redux";
import { Colors } from "../constants/colors";

const { height, width} = Dimensions.get("window");

const ModalCustom = ({isModalOn, setIsModalOn, mensaje}) =>{

        //funcion lenguage
        const lenguageSelect = useSelector((state) => state.lenguage.Lenguage);
        const filter = Lenguage.filter((item) => item.id === lenguageSelect) ;
        const mapping = filter.map((item)=> item.valor);
        const msg = mapping[0];

    return(
        <>
            <Modal  visible={isModalOn} transparent={true}>
                <View style={styles.container}>
                    <View style={styles.containerModal}>
                    <View style={styles.containerText}>
                        <Text style={styles.msgTextError}>{msg.msgError}</Text>
                    </View>
                        <View style={styles.containerBox}>
                            <Text>{mensaje}</Text>
                            <TouchableOpacity style={styles.containerbutton} onPress={() => setIsModalOn(!isModalOn)}>
                                <Text style={styles.textClose}>X</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default ModalCustom;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "flex-end",
    },
    containerModal:{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.white,
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
    containerText:{
        width: width * 0.75,
        justifyContent: "flex-start",
        alignItems: "center",
        borderBottomColor: Colors.grey,
        borderBottomWidth: 2,
        
    },
    msgTextError:{
        fontSize: 16,
        fontFamily: "Inter-Bold",
    },
    containerBox:{
        marginTop: height * 0.015,
        justifyContent: "center",
        alignItems: "center",
    },
    containerbutton:{
        backgroundColor: Colors.primary,
        width: width * 0.08,
        height: width * 0.08,
        borderRadius: 5,
        marginVertical: height * 0.01,
        justifyContent: "center",
        alignItems: "center",
    },
    textClose:{
        fontFamily: "Inter-Bold",
        color: Colors.white,
    },
});