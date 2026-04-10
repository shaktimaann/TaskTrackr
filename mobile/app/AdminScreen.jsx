import { Button } from "@react-navigation/elements";
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from "react-native";
import { useEffect,useState } from "react";
import { router } from "expo-router";




function renderTaskItem({item}){

  return(

    <TouchableOpacity

    onPress={() => {
        router.push({
          pathname: "/TaskDetails",
          params: {
            id: item.id,
            status: item.status
          }
        });
      }}
    
    
    >

 <View style={styles.taskRow}>
      <View style={styles.taskTopRow}>
        <Text style={styles.taskId}>{item.id}</Text>
        <View style={[styles.statusBadge, getStatusStyle(item.status)]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <Text style={styles.taskTitle}>{item.title}</Text>

 
      <View style={styles.taskBottomRow}>
        <Text style={styles.dueDate}>Due: {item.date}</Text>


        {item.status !== "completed" ?<TouchableOpacity style={styles.editButton} onPress={()=>{
          router.push(
            {
              pathname:"/EditTask",
              params: { id: item.id, title: item.title, description: item.description, email:item.email, date: item.date, status: item.status }
            }
          )
        }}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>:null}
      </View>
    </View>

    </TouchableOpacity>


  )

}


async function getAllTasks(setTasks){

  try{

  const response = await fetch('http://192.168.1.8:8000/api/tasks/all')

  if(!response.ok){
    console.log("server error")
    return
  }

  const data = await response.json()

  setTasks(data)


  }catch(e){
    console.log(e)
  }
  





}


async function getAllStats(settotalTasks,setpendingTasks,setinProgessTasks,setcompletedTasks){


  const response = await fetch('http://192.168.1.8:8000/api/tasks/getAllStats')
  if(!response.ok){

    console.log("server error")

  }
  const data = await response.json()
  const all = data.all
  const pending = data.pending
  const inprogress = data.inprogress
  const completed = data.completed

  settotalTasks(all)
  setpendingTasks(pending)
  setinProgessTasks(inprogress)
  setcompletedTasks(completed)




}


function getStatusStyle(status) {
  switch (status) {
    case "pending":
      return styles.pendingBadge;
    case "in-progress":
      return styles.inProgressBadge;
    case "completed":
      return styles.completedBadge;
    default:
      return styles.pendingBadge;
  }
}


export default function AdminScreen() {

  const [tasks,setTasks] = useState([])
  const [totalTasks,settotalTasks] = useState(0)
  const [pendingTasks,setpendingTasks] = useState(0)
  const [inProgessTasks,setinProgessTasks] = useState(0)
  const [completedTasks,setcompletedTasks] = useState(0)

  useEffect(()=>{getAllTasks(setTasks)},[])
  useEffect(()=>{getAllStats(settotalTasks,setpendingTasks,setinProgessTasks,setcompletedTasks)},[])



  return (


    <View
      style={{
        flex: 1,
        padding:20,
        backgroundColor: "#f5f7fb",
      }}
    >


      <FlatList

      data={tasks}
      keyExtractor={(item)=>item.id}
      renderItem={renderTaskItem}
      showsVerticalScrollIndicator={false}
      style={{ width: "100%" }}
      ListHeaderComponent={

        <>



        <Text style={styles.pageTitle}>Work Record</Text>


    

      
      <View style = {
        styles.taskheader
      
      }>
        
        <View style = {
        styles.card
      
      }>
        <Text style = {{fontSize:15, color: "#6b7280",}}>Total Tasks</Text>
        <Text style = {{fontSize:30, marginTop: 10,fontWeight: 700,}}>{totalTasks}</Text>
        </View>
        
        <View style = {
        styles.card
      
      }>
        <Text style = {{fontSize:15, color: "#6b7280",}}>Pending</Text>
        <Text style = {{fontSize:30, marginTop: 10,fontWeight: 700,}}>{pendingTasks}</Text>
        </View>
        
        <View style = {
        styles.card
      
      }>
        <Text style = {{fontSize:15, color: "#6b7280",}}>In Progress</Text>
        <Text style = {{fontSize:30, marginTop: 10,fontWeight: 700,}}>{inProgessTasks}</Text>
        </View>

        <View style = {
        styles.card
      
      }>
        <Text style = {{fontSize:15, color: "#6b7280",}}>Completed</Text>
        <Text style = {{fontSize:30, marginTop: 10,fontWeight:700,}}>{completedTasks}</Text>
        </View>

      </View>
      <View style={{
        flexDirection:"row",
        justifyContent: "space-between",
        width:"100%",
        alignItems: "center",
        paddingTop:30,
        marginBottom: 14,
        paddingHorizontal:5,
      }}>
        <Text style = {{fontSize:18, fontWeight:700,}}>Task List</Text>
        <TouchableOpacity style={{backgroundColor: "#2563eb", paddingVertical: 10, paddingHorizontal: 14, borderRadius: 10,}} onPress={()=>{
          router.push({
            pathname:"/AddTask"
          })
        }}>
        <Text style={{  color: "#ffffff", fontWeight: "600", fontSize: 14,}}>+ Add Task</Text>
        </TouchableOpacity>

      </View>


    


      </>}
      
      />

      </View>
      
    
  );
}


const styles = StyleSheet.create({

  taskheader:{
    fontSize : 24,
    display: "flex" ,
    flexDirection : "row",
    flexWrap:"wrap",
    justifyContent: "space-between",
    marginTop:10,
   
  },
  card:{

    width : "48%",
    height : 100,
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor:"white",
    borderRadius:15,
    paddingVertical : 15,
    paddingHorizontal:15,
    borderColor: "#e5e7eb",
    marginBottom:12,
    color: "#6b7280",

  },

  pageTitle:{

    fontSize: 28,
    fontWeight: "700",
    color: "#1f2937",
    marginTop: 8,
    textAlign:"center"
  },

  
  taskRow: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  taskTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  taskId: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "600",
  },

  taskTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginTop: 10,
  },

  taskTeam: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 4,
  },

  taskBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 14,
  },

  dueDate: {
    fontSize: 13,
    color: "#4b5563",
  },

  editButton: {
    backgroundColor: "#eff6ff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  editButtonText: {
    color: "#2563eb",
    fontSize: 13,
    fontWeight: "600",
  },

  statusBadge: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 99,
  },

  pendingBadge: {
    backgroundColor: "#fef3c7",
  },

  inProgressBadge: {
    backgroundColor: "#dbeafe",
  },

  completedBadge: {
    backgroundColor: "#dcfce7",
  },

  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#374151",
  },


  body: {
  width: "100vw",
  height: "100vh",
}


})
