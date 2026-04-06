import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";

export default function SignUp() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const role = "employee"

  async function handleSignUp() {

    if (!email || !password) {
      Alert.alert("Enter all fields");
      return;
    }

    try {
      const response = await fetch("http://192.168.1.13:8000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password, role })
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Signup Failed", data.error || "Something went wrong");
        return;
      }

      Alert.alert("Success", "Account created successfully");
      console.log("account created")

    } catch (e) {
      console.error(e);
    }
  }

  return (
    <View style={{ padding: 20 }}>

      <Text>Sign Up</Text>

      <TextInput
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, marginTop: 10, padding: 8 }}
      />

      <TextInput
        placeholder="Enter Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginTop: 10, padding: 8 }}
      />

      <TouchableOpacity onPress={handleSignUp} style={{ marginTop: 15 }}>
        <Text>Sign Up</Text>
      </TouchableOpacity>

    </View>
  );
}