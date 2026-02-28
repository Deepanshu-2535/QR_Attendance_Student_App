import { Stack } from "expo-router";
import './global.css';
import {SafeAreaProvider} from "react-native-safe-area-context";

export default function RootLayout() {
  return(
  <SafeAreaProvider>
  <Stack screenOptions={{headerBackTitleVisible: false}}>
    <Stack.Screen name="(tabs)" options={{title:"",headerShown: false}}/>
    <Stack.Screen name="about" options={{title:"About",headerBackTitleVisible:false}}/>
    <Stack.Screen name="changePassword" options={{title:"Change Password",headerBackTitleVisible:false}}/>
    <Stack.Screen name="details/[id]" options={{title : "Details",headerShown:true}}/>
  </Stack>
  </SafeAreaProvider>)
}
