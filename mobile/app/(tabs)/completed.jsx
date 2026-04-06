import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useEffect } from "react";
import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';




function getStatusStyle(status) {
  switch (status) {
    case "pending":
      return {
    backgroundColor: "#fecbc7",
  };
    case "in-progress":
      return {
    backgroundColor: "#fef3c7",
  };
    case "completed":
      return {
    backgroundColor: "#dcfce7",
  };
    default:
      return {
    backgroundColor: "#fecbc7",
  };
  }
}



function RenderItem(props){



    return(
        <View >
        <View style={{borderColor: "gray", borderWidth: 1, borderRadius: 15, paddingHorizontal: 15, paddingVertical: 15, backgroundColor:"white", borderColor: "#e5e7eb", color: "#6b7280", marginTop: 15}} >
            <View style = {{flexDirection : "row", justifyContent:"space-between"}}>
            <Text style = {{fontSize: 12, color: "#6b7280", fontWeight: "600",}}>{props.item.id}</Text>
            <Text style= {[ {paddingVertical: 6, paddingHorizontal: 10, borderRadius: 99}, getStatusStyle(props.item.status),{fontSize: 12, fontWeight: "600", color: "#374151", textTransform: "capitalize"}]}>{props.item.status}</Text>
            </View>
            <Text style ={{fontSize: 16, fontWeight: "700", color: "#111827", marginTop: 10,}}>{props.item.title}</Text>
            <View style={{flexDirection : "row", justifyContent:"space-between", marginTop: 14}}>
                <Text style={{fontSize: 13, color: "#4b5563"}}>{props.item.date}</Text>
            </View>
            </View>
            </View>
    )


}

export default function Alloted(){

  const [tasks,setTasks] = useState([])

    useEffect(()=>{

      fetchAvailableTasks()

  },[])



  async function fetchAvailableTasks(){

    try{

      const token = await AsyncStorage.getItem("token");
      console.log("TOKEN:", token);

      const response = await fetch('http://192.168.1.13:8000/api/tasks/completed',{
        headers: {
        Authorization: `Bearer ${token}`
      }
    })
      console.log(response)

      const data = await response.json();
      if (!response.ok) {
      console.log("Error fetching tasks");
      return;
      }

      setTasks(data)


    }catch(e){

      console.log(e)
    }


  }

    return(

      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={{ flex: 1, alignItems: "center" }}>
            
            <View style={{width : "90%"}}>{tasks.map((item)=>{

                return(
                

                <RenderItem key={item.id} item = {item}/>

                )

            })}</View>
        </View>


        </ScrollView>


    )


}