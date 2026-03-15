import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FormFlow</Text>

      <Text style={styles.subtitle}>Choose an option below to continue</Text>

          <Pressable
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? "#5EE860" : "#056906" },
        ]}
        onPress={() => router.push("/employee-form")}
      >
        <Text style={styles.buttonText}>Employee Form</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? "#5EE860" : "#056906" },
        ]}
        onPress={() => router.push("/sign-in")}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? "#5EE860" : "#056906" },
        ]}
        onPress={() => router.push("/sign-up")}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#F9FAF7",
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 12,
    color: "#1F2933",
    textAlign: "center",
  },

  button: {
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 8,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },

  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 28,
    textAlign: "center",
  },
});