import { useEffect, useState } from "react"
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import RNPickerSelect from "react-native-picker-select"

export default function AddTask(){

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState(new Date())
  const [show, setShow] = useState(false)
  const [selectedUser,setSelectedUser] = useState(null)
  const [userList, setUserList] = useState([])
  const [userIDList, setUserIDList] = useState([])

  useEffect(() => {
    getAllEmployees()
  }, [])

  function onChange(event, selectedDate) {
    setShow(false)
    if (selectedDate) {
      setDate(selectedDate)
    }
  }

  async function sendTask(){

    if (!title.trim() || !description.trim() || !selectedUser || !date) {
        console.log("please fill all fields")
    Alert.alert("Error", "Please fill all fields");
    return;
  }

    const task = {"user":selectedUser,"title":title,"description":description,"date":date}
    const response = await fetch('http://192.168.1.8:8000/api/addTask',{
      method:'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task)
    })
    if(!response.ok){
      console.log("failed while adding a task")
    }
  }

  async function getAllEmployees(){
    const response = await fetch('http://192.168.1.8:8000/api/getAllEmployees')
    const data = await response.json()
    setUserList(data)
    const userArr = data.map((user)=>({
      label:user.email,
      value:user.id.toString()
    }))
    setUserIDList(userArr)
  }

  return(
    <ScrollView style={{ flex:1, backgroundColor:"#f9fafb" }} contentContainerStyle={{ alignItems:"center", paddingBottom:40 }}>
      
      <View style={{ width:"90%" }}>
        
        <View style={{ width:"100%", alignItems:"center", marginTop:20 }}>
          <Text style={{ fontSize:28, fontWeight:"700", color:"#1f2937" }}>
            Add Task
          </Text>
        </View>

        <View style={{ marginTop:20 }}>
          
          <TextInput
            placeholder="Task Title"
            value={title}
            onChangeText={setTitle}
            style={{
              backgroundColor:"white",
              borderWidth:1,
              borderColor:"#e5e7eb",
              padding:14,
              borderRadius:12,
              marginBottom:12,
              fontSize:14,
              color:"#111827"
            }}
          />

          <TextInput
            placeholder="Task Description"
            value={description}
            onChangeText={setDescription}
            multiline
            style={{
              backgroundColor:"white",
              borderWidth:1,
              borderColor:"#e5e7eb",
              padding:14,
              borderRadius:12,
              marginBottom:12,
              fontSize:14,
              color:"#111827",
              height:100,
              textAlignVertical:"top"
            }}
          />

          <TouchableOpacity
            onPress={() => setShow(true)}
            style={{
              backgroundColor:"white",
              borderWidth:1,
              borderColor:"#e5e7eb",
              padding:14,
              borderRadius:12,
              marginBottom:12
            }}
          >
            <Text style={{ color:"#374151" }}>
              {date.toDateString()}
            </Text>
          </TouchableOpacity>

          {show && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onChange}
            />
          )}

          <View style={{
            backgroundColor:"white",
            borderWidth:1,
            borderColor:"#e5e7eb",
            borderRadius:12,
            marginBottom:20,
            paddingHorizontal:10,
            paddingVertical:6
          }}>
            <RNPickerSelect
              items={userIDList}
              onValueChange={(value) => {
                const fullUser = userList.find(u => u.id.toString() === value)
                setSelectedUser(fullUser)
              }}
              placeholder={{ label: "Select Employee", value: null }}
              style={{
                inputIOS: {
                  fontSize:14,
                  paddingVertical:8,
                  color:"#111827"
                },
                inputAndroid: {
                  fontSize:14,
                  paddingVertical:8,
                  color:"#111827"
                }
              }}
            />
          </View>

          <TouchableOpacity
            onPress={sendTask}
            style={{
              backgroundColor:"#2563eb",
              paddingVertical:14,
              borderRadius:12
            }}
          >
            <Text style={{
              color:"white",
              textAlign:"center",
              fontWeight:"600",
              fontSize:14
            }}>
              Submit Task
            </Text>
          </TouchableOpacity>

        </View>

      </View>

    </ScrollView>
  )
}