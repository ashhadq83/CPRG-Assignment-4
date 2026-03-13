import { useFormikContext } from "formik";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FormPasswordInputProps } from "../../types/forms";

export const FormPasswordInput: React.FC<FormPasswordInputProps> = ({
  name,
  label,
  placeholder,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const { values, handleChange, handleBlur, errors, touched } =
    useFormikContext<any>();
  const hasError = touched[name] && errors[name];

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.passwordContainer, hasError && styles.inputError]}>
        <TextInput
          style={styles.passwordInput}
          value={values[name]}
          onChangeText={handleChange(name)}
          onBlur={handleBlur(name)}
          placeholder={placeholder}
          placeholderTextColor="#666"
          secureTextEntry={!showPassword}
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Text style={styles.eyeButtonText}>{showPassword ? "👁️" : "👁️‍🗨️"}</Text>
        </TouchableOpacity>
      </View>
      {hasError && (
        <Text style={styles.errorText}>{errors[name] as string}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
    color: "#cdbdb5",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#474040",
    borderRadius: 8,
    backgroundColor: "#1a1a1a",
  },
  passwordInput: {
    flex: 1,
    height: 48,
    paddingHorizontal: 12,
    color: "#f7efe8",
    fontSize: 16,
  },
  eyeButton: {
    paddingHorizontal: 12,
    height: 48,
    justifyContent: "center",
  },
  eyeButtonText: {
    fontSize: 20,
  },
  inputError: {
    borderColor: "#ff8a65",
  },
  errorText: {
    color: "#ff8a65",
    fontSize: 12,
    marginTop: 4,
  },
});
