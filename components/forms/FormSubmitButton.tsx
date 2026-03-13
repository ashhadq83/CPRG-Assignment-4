import { useFormikContext } from "formik";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { FormSubmitButtonProps } from "../../types/forms";

export const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({
  title,
}) => {
  const { handleSubmit, isValid } = useFormikContext();

  return (
    <TouchableOpacity
      style={[styles.button, !isValid && styles.buttonDisabled]}
      onPress={() => handleSubmit()}
      disabled={!isValid}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
