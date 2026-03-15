import { useFormikContext } from "formik";
import React from "react";
import { StyleSheet, Text, Pressable } from "react-native";
import { FormSubmitButtonProps } from "../../types/forms";

export const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({
  title,
}) => {
  const { handleSubmit, isValid } = useFormikContext();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: !isValid
            ? "#9CA3AF"
            : pressed
            ? "#5EE860"
            : "#056906",
        },
      ]}
      onPress={() => handleSubmit()}
      disabled={!isValid}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
