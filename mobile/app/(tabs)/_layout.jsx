import {Tabs} from "expo-router"

export default function TabLayout(){

    return(

        <Tabs screenOptions={{
        headerShown: false,
      }}>

            <Tabs.Screen name="available" options={{title : "Available"}}/>
            <Tabs.Screen name="pending" options={{title : "Pending"}}/>
            <Tabs.Screen name="completed" options={{title : "Completed"}}/>


        </Tabs>


    )


}