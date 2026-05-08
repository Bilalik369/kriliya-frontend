import { StatusBar } from "expo-status-bar"
import { Provider } from "react-redux"
import { NavigationContainer } from "@react-navigation/native"
import { SafeAreaProvider } from "react-native-safe-area-context"

import { store } from "./src/store/index"
import MainStackNavigator from "./src/navigation/MainStackNavigator"

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <StatusBar style="auto" />
        <NavigationContainer>
          <MainStackNavigator />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  )
}
