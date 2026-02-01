import { StyleProp, TextInput, TextInputProps, TextStyle } from "react-native";

interface InputProps extends TextInputProps {
  ref?: React.Ref<TextInput>;
}

export function Input({ style, ref, ...props }: InputProps) {
  const defaultStyles: StyleProp<TextStyle> = {
    borderWidth: 1,
    borderColor: "gray",
    color: "white",
    borderRadius: 4,
    paddingStart: 8,
  };

  return (
    <TextInput
      ref={ref}
      placeholderTextColor="gray"
      style={[defaultStyles, style]}
      {...props}
    />
  );
}
