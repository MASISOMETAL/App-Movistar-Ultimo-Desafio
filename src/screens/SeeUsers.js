import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native'
import React, { useEffect } from "react";
import { Colors } from '../constants/colors';
import { useSelector, useDispatch } from "react-redux";
import RenderItemUsers from '../components/RenderItemUser';
import { useGetAllDataUserQuery } from "../services/InfoUserService"
import { infoAllUsers } from '../features/AuthSlice';

const { height, width } = Dimensions.get("window");

const SeeUsers = () => {
    const dispatch = useDispatch();
    const lenguageSelect = useSelector((state) => state.lenguage.Lenguage);
    const infoUsers = useSelector((state)=> state.auth.allUsers)

    const users = lenguageSelect === "ES" ? "Usuarios" : "User";

    const { data, isError, isLoading, refetch } = useGetAllDataUserQuery()

    useEffect(() => {
        if (!isLoading) {
            const newArr = []
            Object.keys(data).forEach((key, i) => {
                const newObj = {
                    ...data[key],
                    key: key
                }
                newArr.push(newObj)
            })
            dispatch(infoAllUsers(newArr))
        }
    }, [isLoading, data])

    const RenderItem = ({ item }) => (
        <RenderItemUsers item={item} refetch={refetch} />
    )

    return (
        <View style={styles.container}>
            <View style={styles.containerDecoration} />
            <View style={styles.containerTitle}>
                <Text style={styles.textTitle}>{users}</Text>
            </View>
            <FlatList
                data={infoUsers}
                keyExtractor={(item) => item.key}
                renderItem={RenderItem}
            />
        </View>
    )
}

export default SeeUsers

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