import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";


async function getCurrentLocation(props) {

  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") {
    alert("Permission denied");
    return;
  }

  const location = await Location.getCurrentPositionAsync({});

  console.log(location);
  props(location.coords)

}


async function pickImage(setImage) {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("Permission required");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }





export default function SubmitTask() {

   const [description, setDescription] = useState("");
  const [beforeImage, setBeforeImage] = useState(null);
  const [afterImage, setAfterImage] = useState(null);
  const [location, setLocation] = useState(null);


    async function handleSubmit() {

    if (!beforeImage || !afterImage || !location) {
      alert("Please fill all fields");
      return;
    }

    console.log({
      description,
      beforeImage,
      afterImage,
      location
    });


  }




  
   
   
  return (
<View style={{ flex: 1, padding: 20 }}>

      <Text style={{ fontSize: 20, marginBottom: 20 }}>
        Submit Task
      </Text>

      
      <TextInput
        placeholder="Enter description"
        value={description}
        onChangeText={setDescription}
        style={{
          borderWidth: 1,
          padding: 10,
          borderRadius: 8,
          marginBottom: 15
        }}
      />

      
      <TouchableOpacity
        onPress={() => pickImage(setBeforeImage)}
        style={{
          backgroundColor: "#ddd",
          padding: 10,
          borderRadius: 8,
          marginBottom: 10
        }}
      >
        <Text>Select Before Image</Text>
      </TouchableOpacity>

      {beforeImage && (
        <Image
          source={{ uri: beforeImage }}
          style={{ width: "100%", height: 150, marginBottom: 10 }}
        />
      )}

      
      <TouchableOpacity
        onPress={() => pickImage(setAfterImage)}
        style={{
          backgroundColor: "#ddd",
          padding: 10,
          borderRadius: 8,
          marginBottom: 10
        }}
      >
        <Text>Select After Image</Text>
      </TouchableOpacity>

      {afterImage && (
        <Image
          source={{ uri: afterImage }}
          style={{ width: "100%", height: 150, marginBottom: 10 }}
        />
      )}

      
      <TouchableOpacity
        onPress={()=>{
          getCurrentLocation(setLocation)
        }}
        style={{
          backgroundColor: "#ddd",
          padding: 10,
          borderRadius: 8,
          marginBottom: 10
        }}
      >
        <Text>Get Current Location</Text>
      </TouchableOpacity>

      {location && (
        <Text style={{ marginBottom: 10 }}>
          Lat: {location.latitude} | Lng: {location.longitude}
        </Text>
      )}

      
      <TouchableOpacity
        onPress={handleSubmit}
        style={{
          backgroundColor: "black",
          padding: 12,
          borderRadius: 8
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Submit Task
        </Text>
      </TouchableOpacity>

    </View>
  );
}