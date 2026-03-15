import { Formik } from "formik";
import React from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import * as yup from "yup";
import {
  FormInput,
  FormPasswordInput,
  FormSubmitButton,
} from "../components/forms";
import { SignUpFormValues } from "../types/forms";

// Validation Schema
const signUpSchema = yup.object().shape({
  fullName: yup
    .string()
    .required("Full name is required")
    .min(2, "Name must be at least 2 characters"),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

export default function SignUpScreen() {
  const initialValues: SignUpFormValues = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = (values: SignUpFormValues) => {
    Alert.alert(
      "✅ Sign Up Successful",
      `Name: ${values.fullName}\nEmail: ${values.email}\nPassword: ${values.password}`,
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>
      </View>

      <Formik
        initialValues={initialValues}
        validationSchema={signUpSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <View>
            <FormInput
              name="fullName"
              label="Full Name *"
              placeholder="Enter your full name"
              autoCapitalize="words"
            />

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
              placeholder="Create a password"
            />

            <FormPasswordInput
              name="confirmPassword"
              label="Confirm Password *"
              placeholder="Confirm your password"
            />

            <FormSubmitButton title="Create Account" />
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