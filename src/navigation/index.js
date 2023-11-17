import React, { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import AuthNav from "./AuthNav";
import Tab from "./Tab";
import { fetchSession, fetchSettings, insertLanguage } from "../db";
import { singIn } from "../features/AuthSlice";
import { selectLenguage } from "../features/LenguageSlice";

const AppNavigator = () => {
    const userId = useSelector(state => state.auth.userId);

    const dispatch = useDispatch()

    useEffect(()=> {
        (async () => {
            try {
                const settings = await fetchSettings()
                if (!settings.rows.length) {
                    insertLanguage("ES")
                } else {
                    dispatch(selectLenguage(settings.rows._array[0].lang))
                }
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])

    useEffect(() => {
        ; (async () => {
            try {
                const session = await fetchSession()
                if (session.rows.length) {
                    const user = session.rows._array[0]
                    dispatch(singIn(user))
                }
            } catch (error) {
                console.log('Error en obtener ususario', error.message)
            }
        })()
    }, [])

    return (
        <NavigationContainer>
            {userId ? <Tab /> : <AuthNav />}
        </NavigationContainer>
    )
}

export default AppNavigator;