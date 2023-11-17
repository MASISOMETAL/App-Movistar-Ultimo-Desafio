import { StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import { useFonts } from "expo-font";
import AppNavigator from './src/navigation';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { init } from './src/db';

init()
    .then(() => console.log('DB initialized'))
    .catch(err => console.log('DB failed', err.message))

const App = () => {

    const [loaded] = useFonts({
        'Inter-Regular': require('./src/assets/fonts/Inter-Regular.ttf'),
        'Inter-Bold': require('./src/assets/fonts/Inter-Bold.ttf'),
        'Inter-Light': require('./src/assets/fonts/Inter-Light.ttf'),
        'Inter-Black': require('./src/assets/fonts/Inter-Black.ttf'),
    });

    if (!loaded) {
        return null
    }

    return (
        <Provider store={store}>
            <SafeAreaView style={styles.container}>
                <AppNavigator />
            </SafeAreaView>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
});

export default App;
