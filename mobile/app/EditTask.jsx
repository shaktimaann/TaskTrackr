import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";

export default function(){

  const { id, title, description, email, date, status } = useLocalSearchParams();

  const [titleText, setTitleText] = useState(title);
  const [descriptionText, setDescriptionText] = useState(description);

  const [dateValue, setDateValue] = useState(new Date(date));
  const [show, setShow] = useState(false);

  const [statusValue, setStatusValue] = useState(status);

  const [userList, setUserList] = useState([]);
  const [userOptions, setUserOptions] = useState([]);
  const [selectedUserEmail, setSelectedUserEmail] = useState(email);

  useEffect(() => {
    getAllEmployees();
  }, []);

  function onChange(event, selectedDate) {
    setShow(false);
    if (selectedDate) {
      setDateValue(selectedDate);
    }
  }

  async function getAllEmployees(){
    const response = await fetch('http://192.168.1.8:8000/api/getAllEmployees');
    const data = await response.json();

    setUserList(data);

    const formatted = data.map(user => ({
      label: user.email,
      value: user.email
    }));

    setUserOptions(formatted);
  }

  async function editTask(){

    if (!titleText || !descriptionText || !selectedUserEmail || !statusValue) {
      Alert.alert("All fields required");
      return;
    }

    const updatedTask = {
      id,
      title: titleText,
      description: descriptionText,
      email: selectedUserEmail,
      date: dateValue,
      status: statusValue
    };

    const response = await fetch('http://192.168.1.8:8000/api/task/update',{
      method:'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedTask)
    });

    if(!response.ok){
      Alert.alert("server error");
      return;
    }

    Alert.alert("Success", "Task updated successfully");
  }

  return (

    <View style={{ flex:1, backgroundColor:"#f9fafb", alignItems:"center" }}>

      <View style={{ width:"90%", marginTop:20 }}>

        <Text style={{ fontSize:18, fontWeight:"600", marginBottom:6 }}>
          Title
        </Text>

        <TextInput
          value={titleText}
          onChangeText={setTitleText}
          style={{
            backgroundColor:"white",
            borderWidth:1,
            borderColor:"#e5e7eb",
            padding:12,
            borderRadius:10,
            marginBottom:15
          }}
        />

        <Text style={{ fontSize:18, fontWeight:"600", marginBottom:6 }}>
          Description
        </Text>

        <TextInput
          value={descriptionText}
          onChangeText={setDescriptionText}
          multiline
          style={{
            backgroundColor:"white",
            borderWidth:1,
            borderColor:"#e5e7eb",
            padding:12,
            borderRadius:10,
            marginBottom:15,
            height:100,
            textAlignVertical:"top"
          }}
        />

        <Text style={{ fontSize:18, fontWeight:"600", marginBottom:6 }}>
          Assign Employee
        </Text>

        <View style={{
          backgroundColor:"white",
          borderWidth:1,
          borderColor:"#e5e7eb",
          borderRadius:10,
          paddingHorizontal:10,
          marginBottom:15
        }}>
          <RNPickerSelect
            value={selectedUserEmail}
            onValueChange={(value) => setSelectedUserEmail(value)}
            items={userOptions}
            placeholder={{ label: "Select Employee", value: null }}
          />
        </View>

        <Text style={{ fontSize:18, fontWeight:"600", marginBottom:6 }}>
          Date
        </Text>

        <TouchableOpacity
          onPress={() => setShow(true)}
          style={{
            backgroundColor:"white",
            borderWidth:1,
            borderColor:"#e5e7eb",
            padding:12,
            borderRadius:10,
            marginBottom:15
          }}
        >
          <Text>{dateValue.toDateString()}</Text>
        </TouchableOpacity>

        {show && (
          <DateTimePicker
            value={dateValue}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}

        <Text style={{ fontSize:18, fontWeight:"600", marginBottom:6 }}>
          Status
        </Text>

        <View style={{
          backgroundColor:"white",
          borderWidth:1,
          borderColor:"#e5e7eb",
          borderRadius:10,
          paddingHorizontal:10,
          marginBottom:20
        }}>
          <RNPickerSelect
            value={statusValue}
            onValueChange={(value) => setStatusValue(value)}
            items={[
              { label: "Pending", value: "pending" },
              { label: "In Progress", value: "in-progress" },
              { label: "Completed", value: "completed" }
            ]}
            placeholder={{ label: "Select Status", value: null }}
          />
        </View>

        <TouchableOpacity
          onPress={editTask}
          style={{
            backgroundColor:"#2563eb",
            paddingVertical:14,
            borderRadius:10
          }}
        >
          <Text style={{ color:"white", textAlign:"center", fontWeight:"600" }}>
            Update
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}