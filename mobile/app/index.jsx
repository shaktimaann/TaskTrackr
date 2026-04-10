import { router, Link } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  async function handleLogin (){

    try{

    const response = await fetch("http://192.168.1.8:8000/api/login",{

      method: 'POST',
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email, password})

    })

    

    const data = await response.json()
    console.log(data)

   if (!response.ok) {
  alert(data.error || "Login failed");
  return;
}
    await AsyncStorage.setItem("token", data.token);



    if (data.role === "admin") {
      router.replace("/AdminScreen");
    } else {
      router.replace("/(tabs)/available");
    }

  }catch(e){
    console.log(e)
  }
    
    
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Login</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
          borderRadius: 8,
        }}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 20,
          borderRadius: 8,
        }}
      />

      <TouchableOpacity
        onPress={handleLogin}
        style={{
          backgroundColor: "black",
          padding: 12,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Login
        </Text>
      </TouchableOpacity>

      <Link href={"/SignUp"}>SignUp</Link>
    </View>
  );
}