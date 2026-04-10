import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { useLocalSearchParams } from "expo-router";




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
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.3,
    });

  

    if (!result.canceled) {
      const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`
      setImage({uri: result.assets[0].uri,
      base64: base64Image
    })
    }
  }





export default function SubmitTask() {

  const idobj = useLocalSearchParams()
  const id = idobj.taskId
  console.log(id)


   const [description, setDescription] = useState("");
  const [beforeImage, setBeforeImage] = useState(null);
  const [afterImage, setAfterImage] = useState(null);
  const [location, setLocation] = useState(null);


    async function handleSubmit() {

    if (!beforeImage || !afterImage || !location) {
      alert("Please fill all fields");
      return;
    }

    const beforeImg = beforeImage.base64
    const afterImg = afterImage.base64

    const submittedTask = {id,description,beforeImg,afterImg,location}
    const response = await fetch('http://192.168.1.8:8000/api/task/submit',{
      method:'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(submittedTask)
    });

    if (!response.ok){
      console.log("server error")
      return
    }

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
          source={{ uri: beforeImage.uri }}
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
          source={{ uri: afterImage.uri }}
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
          backgroundColor: "#2563eb",
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