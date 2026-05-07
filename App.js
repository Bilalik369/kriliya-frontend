import { StatusBar } from "expo-status-bar"
import { Provider } from "react-redux"
import { NavigationContainer } from "@react-navigation/native"

import { store } from "./src/store/index"
import MainStackNavigator from "./src/navigation/MainStackNavigator"

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
    </Provider>
  )
}
