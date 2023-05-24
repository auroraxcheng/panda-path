import { StyleSheet, Text, SafeAreaView, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { Stack, useRouter } from "expo-router";
import { FONT, SIZES, COLORS } from "../constants/theme";
import axios from 'axios';

const API_URL = "http://localhost:8000/api/users/"

const Register = () => {
  const router = useRouter();
  
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();


  const register = async () => {
    if(password !== password2) {
      Alert.alert("Error", "Passwords do not match")
      return;
    }

    try {
      const response = await axios.post(API_URL, {
        name,
        email,
        password
      })

      router.push("/login")
    } catch (error) {
      Alert.alert("Error", error.message);
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
        <Text style={styles.header}>Sign Up</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="name"
          autoCorrect={false}
        />
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
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
        <TextInput
          style={styles.input}
          value={password2}
          onChangeText={setPassword2}
          placeholder="confirm password"
          secureTextEntry={true}
          autoCorrect={false}
        />
        <View style={{flexDirection: "column"}}>
          <Text style={styles.message}>Already have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              router.push('/login')
            }}>
            <Text style={styles.signUp}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <TouchableOpacity
        style ={styles.loginBtn}
        color={COLORS.darkgreen}
        onPress={register}>
        <Text style={styles.loginTxt}>Register</Text>
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

export default Register