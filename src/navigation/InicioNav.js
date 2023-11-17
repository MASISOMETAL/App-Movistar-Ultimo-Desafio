import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
// import { Inicio, SelectOptions, Sells, SeeUsers } from "../screens";
import { useDispatch, useSelector } from "react-redux";
import { Lenguage } from "../constants/Lenguage";
import Inicio from "../screens/Inicio";
import { Colors } from "../constants/colors";
import { logOut } from "../features/AuthSlice";
import SelectOptions from "../screens/SelectOptions";
import SeeSells from "../screens/SeeSells";
import SeeUsers from "../screens/SeeUsers";
import { deleteSession } from "../db";

const Stack = createNativeStackNavigator();

const InicioNav = () => {

    const dispatch = useDispatch();

    //funcion lenguage
    const lenguageSelect = useSelector((state) => state.lenguage.Lenguage);
    const filter = Lenguage.filter((item) => item.id === lenguageSelect);
    const mapping = filter.map((item) => item.valor);
    const msg = mapping[0];

    const onLogOut = () => {
        dispatch(logOut());
        deleteSession()
    };

    return (
        <Stack.Navigator initialRouteName="Inicio">
            <Stack.Screen
                name="Inicio"
                component={Inicio}
                options={{
                    title: "Movistar",
                    headerStyle: {
                        backgroundColor: Colors.primary,
                    },
                    headerTintColor: Colors.white,
                    headerRight: () => (
                        <TouchableOpacity onPress={onLogOut}>
                            <Text style={styles.textBoton}>{msg.msgCerrarSesion}</Text>
                        </TouchableOpacity>
                    )
                }}
            />
            <Stack.Screen
                name="SelecOptionNav"
                component={SelectOptions}
                options={{
                    title: "Movistar",
                    headerStyle: {
                        backgroundColor: Colors.primary,
                    },
                    headerTintColor: Colors.white,
                    headerRight: () => (
                        <TouchableOpacity onPress={onLogOut}>
                            <Text style={styles.textBoton}>{msg.msgCerrarSesion}</Text>
                        </TouchableOpacity>
                    )
                }}
            />
            <Stack.Screen
                name="SellsNav"
                component={SeeSells}
                options={{
                    title: "Movistar",
                    headerStyle: {
                        backgroundColor: Colors.primary,
                    },
                    headerTintColor: Colors.white,
                    headerRight: () => (
                        <TouchableOpacity onPress={onLogOut}>
                            <Text style={styles.textBoton}>{msg.msgCerrarSesion}</Text>
                        </TouchableOpacity>
                    )
                }}
            />
            <Stack.Screen
                name="SeeUsersNav"
                component={SeeUsers}
                options={{
                    title: "Movistar",
                    headerStyle: {
                        backgroundColor: Colors.primary,
                    },
                    headerTintColor: Colors.white,
                    headerRight: () => (
                        <TouchableOpacity onPress={onLogOut}>
                            <Text style={styles.textBoton}>{msg.msgCerrarSesion}</Text>
                        </TouchableOpacity>
                    )
                }}
            />
        </Stack.Navigator>
    )
}

export default InicioNav;

const styles = StyleSheet.create({
    textBoton: {
        color: Colors.white,
        fontFamily: "Inter-Bold",
    },
})
