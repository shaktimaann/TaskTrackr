import { Text, View} from "react-native";
import { router } from "expo-router";



export default function EmployeeScreen(){

   router.replace("/(tabs)/alloted");
   
   return( <View>

    <Text>Employee</Text>

    </View>

   )
}