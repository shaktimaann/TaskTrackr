import { View, Text, ScrollView,TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState,useEffect,useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { router } from "expo-router";


export default function Pending(){

    const [tasks,setTasks] = useState([])

    useFocusEffect(

    useCallback(()=>{
    
          fetchPendingTasks()
    
      },[])

    )

    async function fetchPendingTasks(){

        try{



            const token = await AsyncStorage.getItem("token");

            const response = await fetch('http://192.168.1.8:8000/api/tasks/in-progress',
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            )


            if(!response.ok){
                console.log("Error fetching tasks");
                return;
            }
            const data = await response.json();
            setTasks(data)
            console.log(data[0])
        }catch(e){

            console.log(e)
            
        }


    }


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


function submitTask(){
  
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
                <TouchableOpacity style ={{backgroundColor: "#eff6ff", paddingVertical: 8,paddingHorizontal: 12, borderRadius: 8,}} onPress={()=>{

                  router.push({
                  pathname: "/SubmitTask",
                  params: { taskId: props.item.id }
                      });

                }}>
                    <Text style = {{color: "#2563eb", fontSize: 13, fontWeight: "600",} }>
                    Submit
                    </Text>
                </TouchableOpacity>
            </View>
            </View>
            </View>
        )

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