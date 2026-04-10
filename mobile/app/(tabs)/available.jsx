import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useEffect } from "react";
import { useState,useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RefreshControl } from "react-native";


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

async function startTask(task,setTasks){

  try{
  const response = await fetch(`http://192.168.1.8:8000/api/tasks?id=${task.id}&status=in-progress`)
  if(!response.ok){
    console.log("server error")

  }else{
    await fetchAvailableTasks(setTasks)
  }

  }catch(e){
    console.log(e)
  }



}



  async function fetchAvailableTasks(setTasks){

    try{

      const token = await AsyncStorage.getItem("token");
      console.log("TOKEN:", token);

      const response = await fetch('http://192.168.1.8:8000/api/tasks/pending',{
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
                <TouchableOpacity style ={{backgroundColor: "#eff6ff", paddingVertical: 8,paddingHorizontal: 12, borderRadius: 8,}} onPress={()=>startTask(props.item,props.setTasks)}>
                    <Text style = {{color: "#2563eb", fontSize: 13, fontWeight: "600",}}>
                    Under Take
                    </Text>
                </TouchableOpacity>
            </View>
            </View>
            </View>
    )


}

export default function Alloted(){

  const [tasks,setTasks] = useState([])

  useFocusEffect(

    useCallback(()=>{

      fetchAvailableTasks(setTasks)

  },[])

)



const [refreshing, setRefreshing] = useState(false);

const onRefresh = async () => {
  setRefreshing(true);
  await fetchAvailableTasks(setTasks);
  setRefreshing(false);
};


    return(

      <ScrollView showsVerticalScrollIndicator={false}

      refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
    />

      }
      
      
      >

        <View style={{ flex: 1, alignItems: "center" }}>
            
            <View style={{width : "90%"}}>{tasks.map((item)=>{

                return(
                

                <RenderItem key={item.id} item = {item} setTasks= {setTasks}/>

                )

            })}</View>
        </View>


        </ScrollView>


    )


}
