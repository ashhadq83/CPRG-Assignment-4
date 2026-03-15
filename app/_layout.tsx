import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#3B5249",
        },
        headerTintColor: "#FFFFFF",
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "800",
          fontSize: 18,
        },
        contentStyle: {
          backgroundColor: "#F9FAF7",
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="employee-form" options={{ title: "Employee Form" }} />
      <Stack.Screen name="sign-in" options={{ title: "Sign In" }} />
      <Stack.Screen name="sign-up" options={{ title: "Sign Up" }} />
    </Stack>
  );
}
