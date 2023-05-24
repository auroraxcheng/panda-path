import React from 'react';
import {View, ScrollView, SafeAreaView} from 'react-native';
import {Stack, useRouter, useLocalSearchParams} from 'expo-router';

import {COLORS, icons, images, SIZES} from '../constants';
import {
    Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome
} from '../components'

const Home = () => {
    const router = useRouter();
    const {user} = useLocalSearchParams();

    return (
        <SafeAreaView style = {{flex: 1, 
        backgroundColor: COLORS.lightWhite}}>
            <Stack.Screen
            options = {{ 
        headerStyle: { backgroundColor: COLORS.lightWhite},
        headerShadowVisible: false, 
        headerLeft: () => (
          <ScreenHeaderBtn iconUrl = {icons.pfp} dimension ="65%"/>
        ),
        headerRight: () => (
          <ScreenHeaderBtn iconUrl = {icons.menu} dimension ="60%" />
        ),
    headerTitle: ""
            }}
    />   

    <ScrollView showsVerticalScrollIndicator={false}>
        <View 
        style = {{
            flex: 1,
            padding: SIZES.medium
        }}
        > 
        </View>

        <Welcome
          user={user}
        
        />

    </ScrollView>
        </SafeAreaView>
    )
}

export default Home;