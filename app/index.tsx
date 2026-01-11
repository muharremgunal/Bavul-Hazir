import { Redirect } from "expo-router"; // CHANGED:

export default function Index() {
  // CHANGED:
  return <Redirect href="/(tabs)/home" />;
}
