import { View, Text, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export default function TaskDetails(){

  const { id, status } = useLocalSearchParams();

  const [task, setTask] = useState(null);
  const [submission, setSubmission] = useState(null);

  useEffect(() => {
    fetchTaskDetails();
  }, []);

  async function fetchTaskDetails(){

    const res = await fetch(`http://192.168.1.8:8000/api/task/${id}`);
    const data = await res.json();

    setTask(data);

    if (status === "completed") {
      fetchSubmission();
    }
  }

  async function fetchSubmission(){
    console.log(id)
    const res = await fetch(`http://192.168.1.8:8000/api/task/${id}/submission`);
    const data = await res.json();
    console.log(data)
    setSubmission(data);
  }

  if (!task) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ flex:1, padding:20, backgroundColor:"#f9fafb" }}>

      <Text style={{ fontSize:22, fontWeight:"700", marginBottom:10 }}>
        {task.title}
      </Text>

      <Text style={{ marginBottom:10 }}>
        {task.description}
      </Text>

      <Text style={{ marginBottom:10 }}>
        Status: {task.status}
      </Text>

      <Text style={{ marginBottom:20 }}>
        Date: {new Date(task.date).toDateString()}
      </Text>

      {status === "completed" && submission && (
        <View>

          <Text style={{ fontSize:18, fontWeight:"600", marginBottom:10 }}>
            Employee Submission
          </Text>

          <Text>{submission.comment}</Text>

          <Image
  source={{ uri: submission.beforeimage }}
  style={{
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginTop: 10
  }}
/>

<Image
  source={{ uri: submission.afterimage }}
  style={{
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginTop: 10
  }}
/>

          <Text style={{ marginTop:10 }}>
            Location: {submission.latitude}, {submission.longitude}
          </Text>

        </View>
      )}

    </View>
  );
}