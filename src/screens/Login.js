import React, { useState, useReducer, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, Image, TextInput, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard, Dimensions, StyleSheet } from "react-native";
import ModalCustom from "../components/ModalCustom";
import CustomHead from "../components/CustomHead";
import { UPDATED_FORM, onFocusOut, onInputChange } from "../utils";
import { Lenguage } from "../constants/Lenguage"
import { Colors } from "../constants/colors";
import { useSingInMutation } from "../services/AuthService";
import { singIn } from "../features/AuthSlice";
import { insertSession } from "../db";

const { height, width } = Dimensions.get("window");

const initialState = {
    email: { value: '', error: '', touched: false, hasError: true },
    password: { value: '', error: '', touched: false, hasError: true },
    isFormValid: false,
}

const formReducer = (state, action) => {
    switch (action.type) {
        case UPDATED_FORM:
            const { name, value, hasError, error, touched, isFormValid } = action.data;
            return {
                ...state,
                [name]: {
                    ...state[name],
                    value,
                    hasError,
                    error,
                    touched,
                },
                isFormValid
            }
        default:
            return state;
    }
};



const Login = ({ navigation }) => {

    const lenguageSelect = useSelector((state) => state.lenguage.Lenguage);
    const filter = Lenguage.filter((item) => item.id === lenguageSelect);
    const mapping = filter.map((item) => item.valor);
    const msg = mapping[0];

    const [triggerLogin, result] = useSingInMutation()

    const [isModalOn, setIsModalOn] = useState(false);

    const dispatch = useDispatch();
    const [formState, dispatchFormState] = useReducer(formReducer, initialState);

    const onHandleIniciarSesion = () => {
        const { password, email } = formState;
        triggerLogin({
            email: email.value,
            password: password.value
        }).unwrap()
            .then((result) => {
                dispatch(singIn(result))
                insertSession({
                    localId: result.localId,
                    email: result.email,
                    token: result.idToken,
                })
            })
            .catch((error) => {
                setIsModalOn(true)
                console.log(error)
            })
    };

    const onHandleInput = (value, type) => {
        onInputChange(type, value, dispatchFormState, formState);
    };

    return (
        <TouchableWithoutFeedback style={styles.container} onPress={() => Keyboard.dismiss()} >
            <View style={styles.container}>
                <CustomHead />
                <View style={styles.containerImg}>
                    <Image
                        style={styles.img}
                        source={{ uri: "https://i.ibb.co/C0d0gfG/Movistar-Logo.png" }}
                    />
                </View>
                <View style={styles.containerinput}>
                    <TextInput
                        style={styles.input}
                        label="Email"
                        placeholder={msg.msgIngreseCorreo}
                        value={formState.email.value}
                        placeholderTextColor={"#00aae4"}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(text) => onHandleInput(text, "email")}
                        //onBlur={(e) => onHandleBlur(e.nativeEvent.text, 'email')}
                        hasError={formState.email.hasError}
                        error={formState.email.error}
                        touched={formState.email.touched}
                    />
                    <TextInput
                        style={styles.input}
                        label="Password"
                        placeholderTextColor={"#00aae4"}
                        value={formState.password.value}
                        placeholder={msg.msgIngresePass}
                        secureTextEntry={true}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(text) => onHandleInput(text, "password")}
                        //onBlur={(e) => onHandleBlur(e.nativeEvent.text, 'password')}
                        hasError={formState.password.hasError}
                        error={formState.password.error}
                        touched={formState.password.touched}
                    />
                </View>
                <View style={styles.containerBoton}>
                    <TouchableOpacity
                        style={styles.botonSesion}
                        onPress={onHandleIniciarSesion}
                    >
                        <Text style={styles.textBotonSesion}>{msg.msgInicioSesion}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.botonRegister}
                        onPress={() => navigation.navigate("Register")}
                    >
                        <Text style={styles.textBotonRegister}>{msg.msgRegistrate}</Text>
                    </TouchableOpacity>
                </View>
                <ModalCustom isModalOn={isModalOn} setIsModalOn={setIsModalOn} mensaje={msg.msgCorreoIncorrecto} />
            </View>
        </TouchableWithoutFeedback>
    )
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerdark: {
        flex: 1,
        backgroundColor: Colors.black,
    },
    containerImg: {
        alignItems: "center",
        marginTop: height * 0.05,
    },
    img: {
        width: width * 0.4,
        height: width * 0.4,
        resizeMode: "center",
    },
    containerinput: {
        alignItems: "center",
        marginTop: height * 0.05,
    },
    input: {
        borderBottomWidth: 1.8,
        borderBottomColor: Colors.primary,
        height: height * 0.05,
        width: width * 0.85,
        marginVertical: 9,
        //color: Colors.primary,
        fontSize: 16.
    },
    containerBoton: {
        alignItems: "center",
        marginTop: height * 0.04,
    },
    botonSesion: {
        backgroundColor: Colors.primary,
        height: height * 0.05,
        width: width * 0.5,
        marginVertical: 10,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    botonRegister: {
        borderColor: Colors.primary,
        borderWidth: 2,
        height: height * 0.05,
        width: width * 0.5,
        marginVertical: 10,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    textBotonSesion: {
        color: "#fff",
        fontSize: 18,
        fontFamily: "Inter-Bold",
    },
    textBotonRegister: {
        color: Colors.primary,
        fontSize: 18,
        fontFamily: "Inter-Bold",
    },
    botonOlvideContraseña: {
        marginTop: 5,
        borderBottomColor: Colors.primary,
        borderBottomWidth: 1,
    },
    textOlvideContraseña: {
        color: Colors.primary,
        fontSize: 14,
        fontFamily: "Inter-Regular",
    },
})