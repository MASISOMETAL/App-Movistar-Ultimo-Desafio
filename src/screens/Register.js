import React, { useState, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, Image, TextInput, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard, StyleSheet, Dimensions } from "react-native";
import CustomHead from "../components/CustomHead";
import { UPDATED_FORM, onFocusOut, onInputChange } from "../utils";
import { Lenguage } from "../constants/Lenguage";
import { Colors } from "../constants/colors";
import { useSingUpMutation } from "../services/AuthService";
import { infoUserData, singUp } from "../features/AuthSlice";
import { useSingUpDataUserMutation } from "../services/InfoUserService";
import { insertSession } from "../db";

const { height, width } = Dimensions.get("window");

const initialState = {
    email: { value: "", error: "", touched: false, hasError: true },
    password: { value: "", error: "", touched: false, hasError: true },
    repitPass: { value: "", error: "", touched: false, hasError: true },
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

const Register = ({ navigation }) => {

    const dispatch = useDispatch();
    const [formState, dispatchFormState] = useReducer(formReducer, initialState);
    const [registerDate, setRegisterDate] = useState("");
    const [repit, setRepit] = useState("");

    const [triggerSignup, result] = useSingUpMutation()
    const [triggerInfoUser, resultInfoUser] = useSingUpDataUserMutation()

    //funcion lenguage
    const lenguageSelect = useSelector((state) => state.lenguage.Lenguage);
    const filter = Lenguage.filter((item) => item.id === lenguageSelect);
    const mapping = filter.map((item) => item.valor);
    const msg = mapping[0];

    const Registrar = () => {
        const { password, email } = formState;
        triggerSignup({
            email: email.value,
            password: password.value
        }).unwrap()
            .then((result) => {
                dispatch(singUp(result))
                insertSession({
                    localId: result.localId,
                    email: result.email,
                    token: result.idToken,
                })
                triggerInfoUser({
                    localId: result.localId,
                    userName: registerDate
                }).unwrap()
                    .then((result) => {
                        dispatch(infoUserData({ userName: registerDate, userRange: "User" }))
                    })
                    .catch((error) => console.log(error))
            })
            .catch((error) => {
                setIsModalOn(true)
                console.log(error)
            })
        if (result.isSuccess) {
        }
    };

    const onHandleInput = (value, type) => {
        onInputChange(type, value, dispatchFormState, formState);
    };

    const onHandleBlur = (value, type) => {
        onFocusOut(type, value, dispatchFormState, formState, repit);
    }



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
                <View style={styles.containerInput}>
                    <TextInput
                        style={styles.input}
                        //label="Email"
                        placeholder={msg.msgIngreseCorreo}
                        value={formState.email.value}
                        placeholderTextColor={"#00aae4"}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(text) => onHandleInput(text, "email")}
                        //onBlur={(e) => onHandleBlur(e.nativeEvent.text, "email")}
                        onEndEditing={(e) => onHandleBlur(e.nativeEvent.text, "email")}
                    />
                    {formState.email.hasError && formState.email.touched && (
                        <View style={styles.message}>
                            <Text style={styles.helperText}>{formState.email.error}</Text>
                        </View>
                    )}
                    <TextInput
                        style={styles.input}
                        //label="Password"
                        placeholderTextColor={"#00aae4"}
                        value={formState.password.value}
                        placeholder={msg.msgIngresePass}
                        //secureTextEntry={true}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(text) => { onHandleInput(text, "password"), setRepit(text) }}
                        //onBlur={(e) => onHandleBlur(e.nativeEvent.text, "password")}
                        onEndEditing={(e) => { onHandleBlur(e.nativeEvent.text, "password"); }}
                    />
                    {formState.password.hasError && formState.password.touched && (
                        <View style={styles.message}>
                            <Text style={styles.helperText}>{formState.password.error}</Text>
                        </View>
                    )}
                    <TextInput
                        style={styles.input}
                        placeholderTextColor={"#00aae4"}
                        value={formState.repitPass.value}
                        placeholder={msg.msgRepitPass}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(text) => onHandleInput(text, "repitPass")}
                        onEndEditing={(e) => onHandleBlur(e.nativeEvent.text, "repitPass")}
                    //value={passRepeat}
                    />
                    {formState.repitPass.hasError && formState.repitPass.touched && (
                        <View style={styles.message}>
                            <Text style={styles.helperText}>{formState.repitPass.error}</Text>
                        </View>
                    )}
                    <TextInput
                        style={styles.input}
                        placeholder={msg.msgIngreseNombreUser}
                        placeholderTextColor={"#00aae4"}
                        onChangeText={(text) => setRegisterDate(text)}
                        value={registerDate}
                    />
                </View>
                <View style={styles.containerBotonRegister}>
                    <TouchableOpacity
                        style={styles.botonRegister}
                        onPress={Registrar}
                    >
                        <Text style={styles.textBotonRegister}>{msg.msgRegistrate}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.botonSesion}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.textBotonSesion}>{msg.msgInicioSesion}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerImg: {
        alignItems: "center",
        marginTop: height * 0.005,
    },
    img: {
        width: width * 0.4,
        height: width * 0.4,
        resizeMode: "center",
    },
    containerInput: {
        alignItems: "center",
        marginTop: height * 0.01,
    },
    input: {
        borderBottomWidth: 1.8,
        borderBottomColor: Colors.primary,
        height: height * 0.05,
        width: width * 0.85,
        marginVertical: 6,
        fontSize: 16.
    },
    containerBotonRegister: {
        marginTop: height * 0.02,
        alignItems: "center",
    },
    botonRegister: {
        backgroundColor: Colors.primary,
        height: height * 0.05,
        width: width * 0.5,
        marginVertical: 10,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    textBotonRegister: {
        color: "#fff",
        fontSize: 18,
        fontFamily: "Inter-Bold",
    },
    message: {
        marginVertical: 2,
    },
    helperText: {
        fontSize: 12,
        color: '#ff0000',
    },
    botonSesion: {
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
        color: Colors.primary,
        fontSize: 18,
        fontFamily: "Inter-Bold",
    }
})