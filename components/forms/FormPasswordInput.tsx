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
  const [focused, setFocused] = useState(false);

  const { values, handleChange, handleBlur, errors, touched } =
    useFormikContext<any>();
  const hasError = touched[name] && errors[name];

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.passwordContainer,
          focused && styles.inputFocused,
          hasError && styles.inputError,
        ]}
      >
        <TextInput
          style={styles.passwordInput}
          value={values[name]?.toString() ?? ""}
          onChangeText={handleChange(name)}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            handleBlur(name);
            setFocused(false);
          }}
          placeholder={placeholder}
          placeholderTextColor="#6B7280"
          secureTextEntry={!showPassword}
          autoCapitalize="none"
        />

        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Text style={styles.eyeButtonText}>
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </Text>
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
    marginBottom: 18,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    color: "#1F2933",
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D9DDD3",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },

  passwordInput: {
    flex: 1,
    height: 48,
    paddingHorizontal: 14,
    color: "#1F2933",
    fontSize: 16,
  },

  eyeButton: {
    paddingHorizontal: 12,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },

  eyeButtonText: {
    fontSize: 18,
  },

  inputFocused: {
    borderColor: "#D8B95A",
    borderWidth: 2,
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
