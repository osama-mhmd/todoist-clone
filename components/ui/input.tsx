import { StyleProp, TextInput, TextInputProps, TextStyle } from "react-native";

interface InputProps extends TextInputProps {}

export function Input({ style, ...props }: InputProps) {
  const defaultStyles: StyleProp<TextStyle> = {
    borderWidth: 1,
    borderColor: "gray",
    color: "white",
    borderRadius: 4,
    paddingStart: 8,
  };

  return (
    <TextInput
      placeholderTextColor="gray"
      style={[style, defaultStyles]}
      {...props}
    />
  );
}
