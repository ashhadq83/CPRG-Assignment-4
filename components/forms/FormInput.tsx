import { useFormikContext } from "formik";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { FormInputProps } from "../../types/forms";

export const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "none",
  multiline = false,
  numberOfLines = 1,
  editable = true,
}) => {
  const [focused, setFocused] = useState(false);

  const { values, handleChange, handleBlur, errors, touched } =
    useFormikContext<any>();
  const hasError = touched[name] && errors[name];
  const fieldValue = values[name];

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          multiline && styles.multilineInput,
          focused && styles.inputFocused,
          hasError && styles.inputError,
          !editable && styles.inputDisabled,
        ]}
        value={fieldValue?.toString() ?? ""}
        onChangeText={handleChange(name)}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          handleBlur(name);
          setFocused(false);
        }}
        placeholder={placeholder}
        placeholderTextColor="#6B7280"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        multiline={multiline}
        numberOfLines={numberOfLines}
        editable={editable}
      />
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
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#D9DDD3",
    borderRadius: 10,
    paddingHorizontal: 14,
    backgroundColor: "#FFFFFF",
    color: "#1F2933",
    fontSize: 16,
  },
  inputFocused: {
    borderColor: "#D8B95A",
    borderWidth: 2,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: "top",
    paddingTop: 12,
  },
  inputError: {
    borderColor: "#ff8a65",
  },
  inputDisabled: {
    backgroundColor: "#F3F4F6",
    color: "#9CA3AF",
  },
  errorText: {
    color: "#ff8a65",
    fontSize: 12,
    marginTop: 4,
  },
});
