import { Formik } from "formik";
import React from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import * as yup from "yup";
import { FormInput, FormPasswordInput, FormSubmitButton } from "../components/forms";
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
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}>
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
            <FormPasswordInput
              name="password"
              label="Password *"
              placeholder="Enter your password"
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
    backgroundColor: "#F9FAF7",
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 30,
  },
  headerContainer: {
    marginBottom: 32,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1F2933",
    marginBottom: 8,
      textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
  },
});
