import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from "@expo/vector-icons"
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

          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: {
          backgroundColor: COLORS.cardBackground,
          borderTopColor: COLORS.border,
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
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

