import {
  Pressable,
  Text,
  StyleSheet,
  ButtonProps as BP,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";

interface ButtonProps extends Omit<BP, "title"> {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  title: React.ReactNode;
}

export function Button({ title, textStyle, onPress, style }: ButtonProps) {
  return (
    <Pressable onPress={onPress} style={[styles.button, style]}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#6366f1",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignItems: "center",
    flex: 1,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
