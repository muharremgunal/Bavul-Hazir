import { StyleSheet, Text, View } from "react-native"; // ADDED:

export default function SettingsScreen() {
  // ADDED:
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text>Settings go here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
});
