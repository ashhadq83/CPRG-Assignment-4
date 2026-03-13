import React from "react";
import { StyleSheet, Text } from "react-native";
import { FormErrorProps } from "../../types/forms";

export const FormError: React.FC<FormErrorProps> = ({ error }) => {
  if (!error) return null;
  return <Text style={styles.errorText}>{error}</Text>;
};

const styles = StyleSheet.create({
  errorText: {
    color: "#ff8a65",
    fontSize: 12,
    marginTop: 4,
  },
});
