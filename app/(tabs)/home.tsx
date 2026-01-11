import { StyleSheet, Text, View } from "react-native"; // ADDED:

export default function HomeScreen() {
  // ADDED:
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Text>Welcome to BAVUL-HAZIR.</Text>
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
