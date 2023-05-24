import { StyleSheet, Text, SafeAreaView, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { FONT, SIZES, COLORS } from "../constants/theme";
import axios from 'axios';

const API_URL = "http://localhost:8000/api/users/login"

const Home = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const {id = 69, other} = params;
  
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();


  const login = async () => {
    try {
      const response = await axios.post(API_URL, {
        email,
        password
      })

      // console.log(response.data);

      router.push({pathname: "/home", params: { user: response.data.name}})
    } catch (error) {
      Alert.alert("Error", "Incorrect user credentials.");
    }
  }

  return (
    <SafeAreaView style={{backgroundColor: COLORS.lightWhite, height: "100%", justifyContent: "space-between"}}>
      <Stack.Screen
        options = {{ 
          headerStyle: { backgroundColor: COLORS.lightWhite},
          headerShadowVisible: false,
          headerTitle: ""
        }}
      />
      
      <View style={{marginTop: 150}}>
        <Text style={styles.header}>Sign In</Text>
        <TextInput
          style={styles.input}
          value={email}
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={setEmail}
          placeholder="email"
          autoCorrect={false}
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="password"
          secureTextEntry={true}
          autoCorrect={false}
        />
        <View style={{flexDirection: "column"}}>
          <Text style={styles.message}>Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              router.push('/register')
            }}>
            <Text style={styles.signUp}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <TouchableOpacity
        style ={styles.loginBtn}
        color={COLORS.darkgreen}
        onPress={login}>
        <Text style={styles.loginTxt}>Login</Text>
      </TouchableOpacity>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    marginHorizontal: 20,
    marginVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: COLORS.gray2,
    borderRadius: 10,
    fontFamily: FONT.regular,
  },
  header: {
    marginBottom: 20,
    fontFamily: FONT.bold,
    fontSize: SIZES.xxLarge,
    textAlign: "center"
  },
  message: {
    marginTop: 5,
    textAlign: "center",
    fontFamily: FONT.regular,
    marginBottom: 5
  },
  signUp: {
    textAlign: "center",
    fontFamily: FONT.bold,
    color: COLORS.darkgreen
  },
  loginBtn: {
    height: 50,
    width: "75%",
    alignSelf: "center",
    borderRadius: 15,
    backgroundColor: COLORS.darkgreen,
    justifyContent: "center",
    marginBottom: 40
  },
  loginTxt: {
    textAlign: "center",
    color: COLORS.lightWhite,
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
  }
});

export default Home