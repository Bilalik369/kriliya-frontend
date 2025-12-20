import { StatusBar } from "expo-status-bar"
import { Provider, useSelector } from "react-redux"
import { NavigationContainer } from "@react-navigation/native"

import { store } from "./src/store/index"
import AuthStackNavigator from "./src/navigation/AuthStackNavigator"
// import AppStackNavigator from "./src/navigation/AppStackNavigator" // من بعد

// Component داخلي باش نقدر نستعمل useSelector
function RootNavigator() {
  const { isAuthenticated } = useSelector((state) => state.auth)

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        // <AppStackNavigator />
        <AuthStackNavigator /> // مؤقتاً
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
