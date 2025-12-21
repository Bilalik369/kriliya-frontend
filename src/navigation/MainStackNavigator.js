import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useSelector } from "react-redux"
import HomeScreen from "../screens/home/HomeScreen"
import AuthStackNavigator from "./AuthStackNavigator"
import AppTabNavigator from "./AppTabNavigator"
import AddItemScreen from "../screens/items/AddItemScreen"
import ItemDetailScreen from "../screens/items/ItemDetailScreen"
import EditItemScreen from "../screens/items/EditItemScreen"

const Stack = createNativeStackNavigator()

export default function MainStackNavigator() {
  const { isAuthenticated } = useSelector((state) => state.auth) || {}

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        // Authenticated user screens
        <>
          <Stack.Screen name="MainTabs" component={AppTabNavigator} />
          <Stack.Screen name="AddItem" component={AddItemScreen} />
          <Stack.Screen name="ItemDetail" component={ItemDetailScreen} />
          <Stack.Screen name="EditItem" component={EditItemScreen} />
        </>
      ) : (
        // Non-authenticated user screens
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Auth" component={AuthStackNavigator} />
          <Stack.Screen name="ItemDetail" component={ItemDetailScreen} />
        </>
      )}
    </Stack.Navigator>
  )
}
