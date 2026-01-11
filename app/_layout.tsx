import { Stack } from "expo-router"; // CHANGED:

export default function RootLayout() {
  // CHANGED:
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
