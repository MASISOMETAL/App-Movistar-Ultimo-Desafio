import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "../constants/colors";
import { Lenguage } from "../constants/Lenguage";
import { logOut } from "../features/AuthSlice";
import Settings from "../screens/Settings";
import { deleteSession } from "../db";

const Stack = createNativeStackNavigator();

const SettingsNav = () => {

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
        <Stack.Navigator initialRouteName="SettingsNav">
            <Stack.Screen
                name="SettingsNav"
                component={Settings}
                options={{
                    title: lenguageSelect === "ES" ? "Opciones" : "Settings",
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

export default SettingsNav;

const styles = StyleSheet.create({
    textBoton: {
        color: Colors.white,
        fontFamily: "Inter-Bold",
    },
})