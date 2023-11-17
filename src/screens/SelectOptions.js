import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, TouchableWithoutFeedback, Keyboard, Alert, StyleSheet, Dimensions } from "react-native";
import PickerProduct from "../components/PickerProduct";
import ModalCustom from "../components/ModalCustom";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "../constants/colors";
import { Lenguage } from "../constants/Lenguage";
import { useInsertSellsMutation } from "../services/ManagementService";

const { height, width } = Dimensions.get("window");

const SelectOptions = () => {

    const localId = useSelector((state) => state.auth.localId)

    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({
        nombreVendedor: "", nombreCliente: "", fechaDeNacimiento: "", DNI: "", calle: "", numeroCel: "",
        producto: "", observaciones: "",
    });

    const [triggerInsertSell, result] = useInsertSellsMutation()

    //funcion lenguage
    const lenguageSelect = useSelector((state)=> state.lenguage.Lenguage);
    const filter = Lenguage.filter((item) => item.id === lenguageSelect);
    const mapping = filter.map((item) => item.valor);
    const msg = mapping[0];

    const [textInputFocus, setTextInputFocus] = useState(0)
    const [isModalOn, setIsModalOn] = useState(false);
    const [mensage, setMensage] = useState("");

    const onHandleSubmit = () => {
        if (!inputs.nombreVendedor || !inputs.nombreCliente || !inputs.fechaDeNacimiento || !inputs.DNI || !inputs.calle || !inputs.numeroCel || !inputs.producto) {
            setMensage(msg.msgCamposSinComplete);
            setIsModalOn(!isModalOn)
        } else {
            triggerInsertSell({localId: localId, inputs: inputs})
            setInputs({});
            setMensage(msg.msgDatosEnviados);
            setIsModalOn(!isModalOn)
        }

    };

    return (
        <TouchableWithoutFeedback style={styles.container} onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <View style={styles.containerDecoration} />
                <View style={styles.containerTitle}>
                    <Text style={styles.textTitle}>{msg.msgCompleteloscampos}</Text>
                </View>
                <ScrollView>
                    <View style={styles.containerInput}>
                        <Text style={styles.textDescription}>{msg.msgNombreVendedor}</Text>
                        <TextInput
                            style={textInputFocus === 1 ? { ...styles.inputs, borderColor: "#ff8000" } : styles.inputs}
                            placeholder=""
                            maxLength={40}
                            value={inputs.nombreVendedor}
                            onChangeText={(text) => setInputs({ ...inputs, nombreVendedor: text })}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onFocus={() => setTextInputFocus(1)}
                            onEndEditing={() => setTextInputFocus(0)}
                        />
                    </View>
                    <View style={styles.containerInput}>
                        <Text style={styles.textDescription}>{msg.msgNombreCliente}</Text>
                        <TextInput
                            style={textInputFocus === 2 ? { ...styles.inputs, borderColor: "#ff8000" } : styles.inputs}
                            placeholder=""
                            maxLength={40}
                            value={inputs.nombreCliente}
                            onChangeText={(text) => setInputs({ ...inputs, nombreCliente: text })}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onFocus={() => setTextInputFocus(2)}
                            onEndEditing={() => setTextInputFocus(0)}
                        />
                    </View>
                    <View style={styles.containerInput}>
                        <Text style={styles.textDescription}>{msg.msgFechaDeNac}</Text>
                        <TextInput
                            style={textInputFocus === 3 ? { ...styles.inputs, borderColor: "#ff8000" } : styles.inputs}
                            placeholder="ejemplo xx/xx/xxxx"
                            maxLength={11}
                            value={inputs.fechaDeNacimiento}
                            onChangeText={(text) => setInputs({ ...inputs, fechaDeNacimiento: text })}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onFocus={() => setTextInputFocus(3)}
                            onEndEditing={() => setTextInputFocus(0)}
                        />
                    </View>
                    <View style={styles.containerInput}>
                        <Text style={styles.textDescription}>{msg.msgDNI}</Text>
                        <TextInput
                            style={textInputFocus === 4 ? { ...styles.inputs, borderColor: "#ff8000" } : styles.inputs}
                            placeholder=""
                            maxLength={9}
                            keyboardType="numeric"
                            value={inputs.DNI}
                            onChangeText={(text) => setInputs({ ...inputs, DNI: text })}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onFocus={() => setTextInputFocus(4)}
                            onEndEditing={() => setTextInputFocus(0)}
                        />
                    </View>
                    <View style={styles.containerInput}>
                        <Text style={styles.textDescription}>{msg.msgCalle}</Text>
                        <TextInput
                            style={textInputFocus === 5 ? { ...styles.inputs, borderColor: "#ff8000" } : styles.inputs}
                            placeholder=""
                            value={inputs.calle}
                            onChangeText={(text) => setInputs({ ...inputs, calle: text })}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onFocus={() => setTextInputFocus(5)}
                            onEndEditing={() => setTextInputFocus(0)}
                        />
                    </View>
                    <View style={styles.containerInput}>
                        <Text style={styles.textDescription}>{msg.msgNumeroCel}</Text>
                        <TextInput
                            style={textInputFocus === 6 ? { ...styles.inputs, borderColor: "#ff8000" } : styles.inputs}
                            placeholder="Sin +54"
                            maxLength={20}
                            value={inputs.numeroCel}
                            onChangeText={(text) => setInputs({ ...inputs, numeroCel: text })}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onFocus={() => setTextInputFocus(6)}
                            onEndEditing={() => setTextInputFocus(0)}
                        />
                    </View>
                    <View style={styles.containerInput}>
                        <Text style={styles.textDescription}>{msg.msgProducto}</Text>
                        <PickerProduct selectFirst={inputs} setSelectSecond={setInputs} />
                    </View>

                    <View style={styles.containerInput}>
                        <Text style={styles.textDescription}>{msg.msgObser}</Text>
                        <TextInput
                            style={textInputFocus === 7 ? { ...styles.inputs, borderColor: "#ff8000" } : styles.inputs}
                            placeholder=""
                            value={inputs.observaciones}
                            onChangeText={(text) => setInputs({ ...inputs, observaciones: text })}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onFocus={() => setTextInputFocus(7)}
                            onEndEditing={() => setTextInputFocus(0)}
                        />
                    </View>
                    <View style={styles.containerInput}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={onHandleSubmit}
                        >
                            <Text style={styles.submit}>{msg.msgSubmit}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <ModalCustom isModalOn={isModalOn} setIsModalOn={setIsModalOn} mensaje={mensage} />
            </View>
        </TouchableWithoutFeedback>
    )
}

export default SelectOptions;

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
    containerInput: {
        alignItems: "center",
        marginTop: height * 0.01,
    },
    textDescription: {
        alignSelf: "flex-start",
        marginLeft: width - width * 0.94,
    },
    inputs: {
        width: width * 0.9,
        height: height * 0.05,
        borderColor: Colors.primary,
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        width: width * 0.9,
        height: height * 0.05,
        borderRadius: 5,
        backgroundColor: Colors.primary,
        marginVertical: height * 0.02,
        marginBottom: 100,
    },
    submit: {
        color: Colors.white,
    },
})