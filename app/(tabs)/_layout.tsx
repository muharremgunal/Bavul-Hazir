import { Tabs } from "expo-router"; // ADDED:

export default function TabsLayout() {
  // ADDED:
  return (
    <Tabs screenOptions={{ headerTitleAlign: "center" }}>
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="templates" options={{ title: "Templates" }} />
      <Tabs.Screen name="settings" options={{ title: "Settings" }} />
    </Tabs>
  );
}
