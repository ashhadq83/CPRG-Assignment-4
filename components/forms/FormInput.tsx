import { useFormikContext } from "formik";
import React from "react";
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
          hasError && styles.inputError,
          !editable && styles.inputDisabled,
        ]}
        value={fieldValue?.toString()}
        onChangeText={handleChange(name)}
        onBlur={handleBlur(name)}
        placeholder={placeholder}
        placeholderTextColor="#666"
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
  multilineInput: {
    height: 100,
    textAlignVertical: "top",
    paddingTop: 12,
  },
  inputError: {
    borderColor: "#ff8a65",
  },
  inputDisabled: {
    backgroundColor: "#333",
    color: "#888",
  },
  errorText: {
    color: "#ff8a65",
    fontSize: 12,
    marginTop: 4,
  },
});
