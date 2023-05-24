import {Stack} from 'expo-router';
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const Layout = () => {
    const [fontsLoaded] = useFonts({
        KarlaBold: require('../assets/fonts/Karla-Bold.ttf'),
        KarlaMedium: require('../assets/fonts/Karla-Medium.ttf'),
        KarlaRegular: require('../assets/fonts/Karla-Regular.ttf')
    })

    const onLayoutRootView = useCallback(async () => {
        if(fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded])

    if(!fontsLoaded) return null;
    return <Stack onLayout={onLayoutRootView}/>
}

export default Layout;