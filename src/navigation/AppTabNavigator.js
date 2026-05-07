import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from "@expo/vector-icons"
import { Platform } from "react-native"
import HomeScreen from "../screens/home/HomeScreen"
import MyItemsScreen from "../screens/items/MyItemsScreen"
import COLORS from "../constants/colors"

const Tab = createBottomTabNavigator()

export default function AppTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === "HomeTab") {
            iconName = focused ? "home" : "home-outline"
          } else if (route.name === "MyItemsTab") {
            iconName = focused ? "cube" : "cube-outline"
          } else if (route.name === "ProfileTab") {
            iconName = focused ? "person" : "person-outline"
          }

          return <Ionicons name={iconName} size={focused ? 24 : 22} color={color} />
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarStyle: {
          backgroundColor: COLORS.cardBackground,
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
          paddingBottom: Platform.OS === "ios" ? 24 : 10,
          paddingTop: 10,
          height: Platform.OS === "ios" ? 84 : 68,
          shadowColor: COLORS.shadow,
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 1,
          shadowRadius: 12,
          elevation: 12,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          marginTop: 2,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{ tabBarLabel: "Home" }}
      />
      <Tab.Screen
        name="MyItemsTab"
        component={MyItemsScreen}
        options={{ tabBarLabel: "My Items" }}
      />
    </Tab.Navigator>
  )
}
