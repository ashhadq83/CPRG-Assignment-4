import DateTimePicker from "@react-native-community/datetimepicker";
import { Formik } from "formik";
import React, { useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as yup from "yup";

// Validation Schema
const employeeValidationSchema = yup.object().shape({
  fullName: yup
    .string()
    .required("Full name is required")
    .min(2, "Name must be at least 2 characters"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9+\-\s()]+$/, "Invalid phone number format"),
  position: yup.string().required("Position is required"),
  department: yup.string().required("Department is required"),
  startDate: yup.string().required("Please select a start date"),
});

// Type for form values
interface EmployeeFormValues {
  fullName: string;
  email: string;
  phoneNumber: string;
  position: string;
  department: string;
  startDate: string;
}

export default function EmployeeFormScreen() {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());

  const initialValues: EmployeeFormValues = {
    fullName: "",
    email: "",
    phoneNumber: "",
    position: "",
    department: "",
    startDate: "",
  };

  const handleSubmit = (values: EmployeeFormValues) => {
    Alert.alert(
      "✅ Success",
      `Name: ${values.fullName}\nEmail: ${values.email}\nPhone: ${values.phoneNumber}\nPosition: ${values.position}\nDepartment: ${values.department}\nStart Date: ${values.startDate}`,
    );
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Employee Information Form</Text>

      <Formik
        initialValues={initialValues}
        validationSchema={employeeValidationSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          setFieldValue,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
        }) => (
          <View>
            {/* Full Name */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Full Name *</Text>
              <TextInput
                style={[
                  styles.input,
                  touched.fullName && errors.fullName && styles.inputError,
                ]}
                value={values.fullName}
                onChangeText={handleChange("fullName")}
                onBlur={handleBlur("fullName")}
                placeholder="Enter full name"
                placeholderTextColor="#666"
              />
              {touched.fullName && errors.fullName && (
                <Text style={styles.errorText}>{errors.fullName}</Text>
              )}
            </View>

            {/* Email */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email *</Text>
              <TextInput
                style={[
                  styles.input,
                  touched.email && errors.email && styles.inputError,
                ]}
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                placeholder="Enter email"
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#666"
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>

            {/* Phone Number */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Phone Number *</Text>
              <TextInput
                style={[
                  styles.input,
                  touched.phoneNumber &&
                    errors.phoneNumber &&
                    styles.inputError,
                ]}
                value={values.phoneNumber}
                onChangeText={handleChange("phoneNumber")}
                onBlur={handleBlur("phoneNumber")}
                placeholder="+1 234 567 8900"
                keyboardType="phone-pad"
                placeholderTextColor="#666"
              />
              {touched.phoneNumber && errors.phoneNumber && (
                <Text style={styles.errorText}>{errors.phoneNumber}</Text>
              )}
            </View>

            {/* Position */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Position *</Text>
              <TextInput
                style={[
                  styles.input,
                  touched.position && errors.position && styles.inputError,
                ]}
                value={values.position}
                onChangeText={handleChange("position")}
                onBlur={handleBlur("position")}
                placeholder="Enter position"
                placeholderTextColor="#666"
              />
              {touched.position && errors.position && (
                <Text style={styles.errorText}>{errors.position}</Text>
              )}
            </View>

            {/* Department */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Department *</Text>
              <TextInput
                style={[
                  styles.input,
                  touched.department && errors.department && styles.inputError,
                ]}
                value={values.department}
                onChangeText={handleChange("department")}
                onBlur={handleBlur("department")}
                placeholder="Enter department"
                placeholderTextColor="#666"
              />
              {touched.department && errors.department && (
                <Text style={styles.errorText}>{errors.department}</Text>
              )}
            </View>

            {/* Start Date */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Start Date *</Text>
              <TouchableOpacity
                style={[
                  styles.dateButton,
                  touched.startDate &&
                    errors.startDate &&
                    styles.dateButtonError,
                ]}
                onPress={() => setShowDatePicker(true)}
              >
                <Text
                  style={
                    values.startDate ? styles.dateText : styles.placeholderText
                  }
                >
                  {values.startDate || "📅 Tap to select start date"}
                </Text>
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={tempDate}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "calendar"}
                  onChange={(event, selectedDate) => {
                    if (Platform.OS === "android") {
                      setShowDatePicker(false);
                    }
                    if (selectedDate) {
                      setTempDate(selectedDate);
                      setFieldValue("startDate", formatDate(selectedDate));
                    }
                  }}
                  themeVariant="dark"
                />
              )}

              {touched.startDate && errors.startDate && (
                <Text style={styles.errorText}>{errors.startDate}</Text>
              )}
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={[styles.button, !isValid && styles.buttonDisabled]}
              onPress={() => handleSubmit()}
              disabled={!isValid}
            >
              <Text style={styles.buttonText}>Submit Employee Information</Text>
            </TouchableOpacity>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#e9e0d5",
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
    color: "#cdbdb5",
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#474040",
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#1a1a1a",
    color: "#f7efe8",
    fontSize: 16,
  },
  inputError: {
    borderColor: "#ff8a65",
  },
  dateButton: {
    height: 48,
    borderWidth: 1,
    borderColor: "#474040",
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#1a1a1a",
    justifyContent: "center",
  },
  dateButtonError: {
    borderColor: "#ff8a65",
  },
  dateText: {
    fontSize: 16,
    color: "#f7efe8",
  },
  placeholderText: {
    fontSize: 16,
    color: "#888",
  },
  errorText: {
    color: "#ff8a65",
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    backgroundColor: "#D97706",
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  buttonDisabled: {
    backgroundColor: "#555",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
