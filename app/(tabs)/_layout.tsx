import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform, View } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        headerTitleAlign: "center",
        tabBarActiveTintColor: "#2563EB", 
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 88 : 60,
          paddingBottom: Platform.OS === 'ios' ? 28 : 8,
          paddingTop: 8,
        },
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Seyahatler",
          tabBarLabel: "Ana Sayfa",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="new"
        options={{
          title: "Yeni Oluştur",
          tabBarLabel: "Yeni",
          tabBarIcon: ({ color, focused }) => (
            <View className={`bg-blue-600 rounded-full h-12 w-12 items-center justify-center -mt-3 shadow-lg border-4 border-gray-50`}>
              <Ionicons name="add" size={24} color="white" />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="checklist"
        options={{
          title: "Listem",
          tabBarLabel: "Liste",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "checkbox" : "checkbox-outline"} size={size} color={color} />
          ),
        }}
      />
       <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarLabel: "Profil",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "person" : "person-outline"} size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
