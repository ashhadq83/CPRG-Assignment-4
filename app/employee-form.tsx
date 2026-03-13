import DateTimePicker from "@react-native-community/datetimepicker";
import { Formik } from "formik";
import React, { useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as yup from "yup";
import { FormInput, FormSubmitButton } from "../components/forms";
import { EmployeeFormValues } from "../types/forms";

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
        {({ setFieldValue, values, errors, touched, isValid }) => (
          <View>
            <FormInput
              name="fullName"
              label="Full Name *"
              placeholder="Enter full name"
            />
            <FormInput
              name="email"
              label="Email *"
              placeholder="Enter email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <FormInput
              name="phoneNumber"
              label="Phone Number *"
              placeholder="+1 234 567 8900"
              keyboardType="phone-pad"
            />
            <FormInput
              name="position"
              label="Position *"
              placeholder="Enter position"
            />
            <FormInput
              name="department"
              label="Department *"
              placeholder="Enter department"
            />

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

            <FormSubmitButton title="Submit Employee Information" />
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
});
