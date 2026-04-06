import { Button } from "@react-navigation/elements";
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from "react-native";




const tasks = [
  {
    id: "TASK-001",
    title: "Fix Plumbing in the Nagala Park Area",
    team: "Operations",
    status: "Pending",
    dueDate: "Jul 28, 2025",
  },
  {
    id: "TASK-002",
    title: "New WiFi Connection in Shahupuri",
    team: "Finance",
    status: "In Progress",
    dueDate: "Jul 30, 2025",
  },
  {
    id: "TASK-003",
    title: "Electricity down in Rajarampuri",
    team: "HR",
    status: "Completed",
    dueDate: "Jul 25, 2025",
  },
  {
    id: "TASK-004",
    title: "Update Finance Records",
    team: "Procurement",
    status: "In Progress",
    dueDate: "Aug 05, 2025",
  },
  {
    id: "TASK-005",
    title: "Collect Payment from Last week",
    team: "Operations",
    status: "Pending",
    dueDate: "Aug 10, 2025",
  },
  {
    id: "TASK-006",
    title: "Doing good",
    team: "Legal",
    status: "Completed",
    dueDate: "Jul 20, 2025",
  },
];


function renderTaskItem({item}){

  return(

 <View style={styles.taskRow}>
      <View style={styles.taskTopRow}>
        <Text style={styles.taskId}>{item.id}</Text>
        <View style={[styles.statusBadge, getStatusStyle(item.status)]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <Text style={styles.taskTitle}>{item.title}</Text>


      <View style={styles.taskBottomRow}>
        <Text style={styles.dueDate}>Due: {item.dueDate}</Text>

        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>


  )

}


function getStatusStyle(status) {
  switch (status) {
    case "Pending":
      return styles.pendingBadge;
    case "In Progress":
      return styles.inProgressBadge;
    case "Completed":
      return styles.completedBadge;
    default:
      return styles.pendingBadge;
  }
}


export default function AdminScreen() {
  return (


    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
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


    

      
      <View style = {
        styles.taskheader
      
      }>
        <Text style={styles.pageTitle}>Work Record</Text>
        <View style = {
        styles.card
      
      }>
        <Text style = {{fontSize:15, color: "#6b7280",}}>Total Tasks</Text>
        <Text style = {{fontSize:30, marginTop: 10,fontWeight: 700,}}>6</Text>
        </View>
        
        <View style = {
        styles.card
      
      }>
        <Text style = {{fontSize:15, color: "#6b7280",}}>Pending</Text>
        <Text style = {{fontSize:30, marginTop: 10,fontWeight: 700,}}>2</Text>
        </View>
        
        <View style = {
        styles.card
      
      }>
        <Text style = {{fontSize:15, color: "#6b7280",}}>In Progress</Text>
        <Text style = {{fontSize:30, marginTop: 10,fontWeight: 700,}}>2</Text>
        </View>

        <View style = {
        styles.card
      
      }>
        <Text style = {{fontSize:15, color: "#6b7280",}}>Completed</Text>
        <Text style = {{fontSize:30, marginTop: 10,fontWeight:700,}}>2</Text>
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
        <TouchableOpacity style={{backgroundColor: "#2563eb", paddingVertical: 10, paddingHorizontal: 14, borderRadius: 10,}}>
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
    gap: 15,
    justifyContent: "center",
    marginTop:0,
   
  },
  card:{

    width : 150,
    height : 100,
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor:"white",
    borderRadius:15,
    paddingVertical : 15,
    paddingHorizontal:15,
    borderColor: "#e5e7eb",
    color: "#6b7280",

  },

  pageTitle:{

    fontSize: 28,
    fontWeight: "700",
    color: "#1f2937",
    marginTop: 8,
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


})
