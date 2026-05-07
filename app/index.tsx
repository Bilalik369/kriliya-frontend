import { Provider } from "react-redux"
import { store } from "../src/store/index"
import MainStackNavigator from "../src/navigation/MainStackNavigator"
import { StatusBar } from "expo-status-bar"

export default function Index() {
  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <MainStackNavigator />
    </Provider>
  )
}