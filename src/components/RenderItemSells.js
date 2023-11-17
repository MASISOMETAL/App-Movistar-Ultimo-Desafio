import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { Lenguage } from "../constants/Lenguage";
import { Colors } from "../constants/colors";

const { widht, heigth } = Dimensions.get("window");

const RenderItemSells = ({item}) =>{

        //funcion lenguage
        const lenguageSelect = useSelector((state)=> state.lenguage.Lenguage);
        const filter = Lenguage.filter((item) => item.id === lenguageSelect) ;
        const mapping = filter.map((item)=> item.valor);
        const msg = mapping[0];

    return(
        <View style={styles.container}>

                <Text style={styles.textDescription}>{msg.msgNombreVendedor}:</Text>
                <Text style={styles.textInfo}>{item.nombreVendedor}</Text>


                <Text style={styles.textDescription}>{msg.msgNombreCliente}:</Text>
                <Text style={styles.textInfo}>{item.nombreCliente}</Text>

                <Text style={styles.textDescription}>{msg.msgFechaDeNac}:</Text>
                <Text style={styles.textInfo}>{item.fechaDeNacimiento}</Text>

                <Text style={styles.textDescription}>{msg.msgDNI}:</Text>
                <Text style={styles.textInfo}>{item.DNI}</Text>

                <Text style={styles.textDescription}>{msg.msgCalle}:</Text>
                <Text style={styles.textInfo}>{item.calle}</Text>

                <Text style={styles.textDescription}>{msg.msgNumeroCel}:</Text>
                <Text style={styles.textInfo}>{item.numeroCel}</Text>

                <Text style={styles.textDescription}>{msg.msgProducto}:</Text>
                <Text style={styles.textInfo}>{item.producto}</Text>

                <Text style={styles.textDescription}>{msg.msgObser}:</Text>
                <Text style={styles.textInfo}>{item.observaciones}</Text>

        </View>
    )
}

export default RenderItemSells;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        borderColor: Colors.primary,
        borderWidth: 1,
        borderRadius: 10,
        marginHorizontal: 10,
        marginTop: 10,
        padding: 5,
        paddingRight: 10,
    },
    textDescription:{
        fontFamily: "Inter-Bold",
        fontSize: 16,
        marginLeft: 10,
        marginTop: 15,
    },
    textInfo:{
        fontFamily: "Inter-Regular",
        marginLeft: 40,
    },
}) 