import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from "@expo/vector-icons"
import { Platform } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import HomeScreen from "../screens/home/HomeScreen"
import MyItemsScreen from "../screens/items/MyItemsScreen"
import ProfileScreen from "../screens/profile/ProfileScreen"
import COLORS from "../constants/colors"

const Tab = createBottomTabNavigator()

export default function AppTabNavigator() {
  const insets = useSafeAreaInsets()
  const bottomInset = Math.max(insets.bottom, Platform.OS === "android" ? 18 : 10)
  const tabBarHeight = 52 + bottomInset + 20

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
          paddingBottom: bottomInset,
          paddingTop: 8,
          height: tabBarHeight,
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
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{ tabBarLabel: "Profile" }}
      />
    </Tab.Navigator>
  )
}
