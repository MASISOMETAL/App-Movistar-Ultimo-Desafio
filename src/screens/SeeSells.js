import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";
import { Colors } from "../constants/colors";
import { Lenguage } from "../constants/Lenguage"
import { useGetSellsQuery } from "../services/ManagementService";
import RenderItemSells from "../components/RenderItemSells";

const { height, width } = Dimensions.get("window");

const SeeSells = () => {

    const localId = useSelector((state) => state.auth.localId)
    const userRange = useSelector((state) => state.auth.userRange)
    const [sellsObtain, setSellsObtain] = useState([])

    const { data, isLoading } = useGetSellsQuery()

    useEffect(() => {
        if (!isLoading) {
            if (data) {
                const allSells = Object.keys(data).map(key => data[key]);
                if (userRange === "Admin") {
                    setSellsObtain(allSells)
                } else {
                    const filterSells = allSells.filter((item) => item.id === localId)
                    setSellsObtain(filterSells)
                }
            } else {
                setSellsObtain([])
            }
        }
    }, [data])

    //funcion lenguage
    const lenguageSelect = useSelector((state) => state.lenguage.Lenguage);
    const filter = Lenguage.filter((item) => item.id === lenguageSelect);
    const mapping = filter.map((item) => item.valor);
    const msg = mapping[0];

    const RenderItem = ({ item }) => (
        <RenderItemSells item={item} />
    )

    return (
        <View style={styles.container}>
            <View style={styles.containerDecoration} />
            <View style={styles.containerTitle}>
                <Text style={styles.textTitle}>{msg.msgVentas}</Text>
            </View>
            <FlatList
                data={sellsObtain}
                keyExtractor={(item) => item.nombreCliente.toString()}
                renderItem={RenderItem}
            />
        </View>
    )
}

export default SeeSells;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerDecoration: {
        width: width,
        height: height * 0.04,
        backgroundColor: Colors.grey,
    },
    containerTitle: {
        alignItems: "center",
        //marginTop: 10,
        width: width,
        height: height * 0.06,
        borderBottomColor: Colors.primary,
        borderBottomWidth: 2,
        alignItems: "center",
        justifyContent: "center",
    },
    textTitle: {
        fontSize: 16,
        fontFamily: "Inter-Bold",
    },

}) 