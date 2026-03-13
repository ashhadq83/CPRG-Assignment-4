// Employee Form Types (for Team A)
export interface EmployeeFormValues {
  fullName: string;
  email: string;
  phoneNumber: string;
  position: string;
  department: string;
  startDate: string;
}

// Sign In Types (for Team B)
export interface SignInFormValues {
  email: string;
  password: string;
}

// Sign Up Types (for Team B)
export interface SignUpFormValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Reusable Props for Form Components
export interface FormInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  multiline?: boolean;
  numberOfLines?: number;
  editable?: boolean;
}

export interface FormPasswordInputProps {
  name: string;
  label?: string;
  placeholder?: string;
}

export interface FormSubmitButtonProps {
  title: string;
}

export interface FormErrorProps {
  error?: string;
}
