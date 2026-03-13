import { Formik } from "formik";
import React from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import * as yup from "yup";
import { FormInput, FormSubmitButton } from "../components/forms";
import { SignInFormValues } from "../types/forms";

// Validation Schema
const signInSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function SignInScreen() {
  const initialValues: SignInFormValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (values: SignInFormValues) => {
    Alert.alert(
      "✅ Sign In Successful",
      `Email: ${values.email}\nPassword: ${values.password}`,
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>
      </View>

      <Formik
        initialValues={initialValues}
        validationSchema={signInSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <View>
            <FormInput
              name="email"
              label="Email *"
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <FormInput
              name="password"
              label="Password *"
              placeholder="Enter your password"
              secureTextEntry
            />
            <FormSubmitButton title="Sign In" />
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#111111",
  },
  headerContainer: {
    marginBottom: 32,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#e9e0d5",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#cdbdb5",
  },
});
