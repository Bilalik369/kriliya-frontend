import { StatusBar } from "expo-status-bar"
import { Provider, useSelector } from "react-redux"
import { NavigationContainer } from "@react-navigation/native"

import { store } from "./src/store/index"
import AuthStackNavigator from "./src/navigation/AuthStackNavigator"
// import AppStackNavigator from "./src/navigation/AppStackNavigator" 


function RootNavigator() {
  const { isAuthenticated } = useSelector((state) => state.auth)

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        
        <AuthStackNavigator />
      ) : (
        <AuthStackNavigator />
      )}
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <RootNavigator />
    </Provider>
  )
}
