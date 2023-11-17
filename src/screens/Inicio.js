import React, {useEffect, useState} from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert, Dimensions, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import {Lenguage} from "../constants/Lenguage"
import { Colors } from "../constants/colors";
import ModalCustom from "../components/ModalCustom";
import { useGetDataUserQuery } from "../services/InfoUserService";
import { infoUserData } from "../features/AuthSlice";

const { height, width} = Dimensions.get("window");

const Inicio = ({navigation}) =>{

    const RangeUser = useSelector((state)=> state.auth.userRange);
    const localId = useSelector((state) => state.auth.localId)

    const dispatch = useDispatch()

    //funcion lenguage
    const lenguageSelect = useSelector((state)=> state.lenguage.Lenguage);
    const filter = Lenguage.filter((item) => item.id === lenguageSelect) ;
    const mapping = filter.map((item)=> item.valor);
    const msg = mapping[0];

    const [isModalOn, setIsModalOn] = useState(false);

    const {data, isLoading} = useGetDataUserQuery(localId)

    useEffect(()=> {
        if (!isLoading) {
            dispatch(infoUserData({userName: data?.userName, userRange: data?.userRange}))
        }
    },[data, isLoading])

    const onHangleSeeUser = () =>{
        if (RangeUser == "Admin") {
            navigation.navigate("SeeUsersNav")
        }else setIsModalOn(!isModalOn)
        
    }

    return(
        <View style={styles.container}>
            <View style={styles.containerDecoration}/>
            <View style={styles.containerTitle}>
                <Text style={styles.textTitle}>{msg.msgEscogeOpcion}</Text>
            </View>

            <ScrollView style={styles.containerScrollButton}>
            <View style={styles.containerButton}>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={()=> navigation.navigate("SelecOptionNav")}
                >
                    <View style={styles.containerRowButton}>
                    <View style={styles.description}>
                        <Text style={styles.textOption}>{msg.msgIngresarVenta}</Text>
                        <Text style={styles.textDescription}>{msg.msgIngresarVentaDescr}</Text>
                    </View>
                    <View style={styles.icon}>
                        <Ionicons name="md-chevron-forward-outline" size={24} color="#fff" />
                    </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={()=> navigation.navigate("SellsNav")}
                >
                    <View style={styles.containerRowButton}>
                    <View style={styles.description}>
                        <Text style={styles.textOption}>{msg.msgVerVentas}</Text>
                        <Text style={styles.textDescription}>{msg.msgVerVentasDescr}</Text>
                    </View>
                    <View style={styles.icon}>
                        <Ionicons name="md-chevron-forward-outline" size={24} color="#fff" />
                    </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={onHangleSeeUser}
                >
                <View style={styles.containerRowButton}>
                    <View style={styles.description}>
                        <Text style={styles.textOption}>{msg.msgVerUsuarios}</Text>
                        <Text style={styles.textDescription}>{msg.msgVerUsuariosDescr}</Text>
                    </View>
                    <View style={styles.icon}>
                        <Ionicons name="md-chevron-forward-outline" size={24} color="#fff" />
                    </View>
                    </View>
                </TouchableOpacity>
                </View>
            </ScrollView>
            <ModalCustom isModalOn={isModalOn} setIsModalOn={setIsModalOn} mensaje={msg.msgSinPermisosAdmin}/>
        </View>
    )
}

export default Inicio;

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    containerdark:{
        flex: 1,
        backgroundColor: Colors.black,
    },
    containerDecoration:{
        width: width,
        height: height *0.04,
        backgroundColor: Colors.grey,
    },
    containerTitle:{
        alignItems: "center",
        //marginTop: 10,
        width: width,
        height: height * 0.06,
        borderBottomColor: Colors.primary,
        borderBottomWidth: 2,
        alignItems: "center",
        justifyContent: "center",
    },
    textTitle:{
        fontSize: 16,
        fontFamily: "Inter-Bold",
    },
    containerScrollButton:{
        //marginTop: height * 0.007,
    },
    containerButton:{
        //backgroundColor: Colors.green,
        alignItems: "center",
    },
    containerRowButton:{
        flexDirection: "row",
        flex: 1,
    },
    description:{
        flex: 1,
        justifyContent: "center",
        //backgroundColor: Colors.green,
        marginLeft: width * 0.1,
    },
    icon:{
        //backgroundColor: Colors.red,
        justifyContent: "center",
        marginRight: height * 0.01,
    },
    button:{
        height: height * 0.15,
        width: width * 0.87,
        backgroundColor: Colors.primary,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        marginTop: height * 0.03,
    },
    textOption:{
        fontSize: 16,
        fontFamily: "Inter-Bold",
        color: Colors.white,
        marginVertical: 5,
    },
    textDescription:{
        fontSize: 12,
        fontFamily: "Inter-Regular",
        color: Colors.white,
        marginVertical: 5,
    },
})