import { Pressable, Text, StyleSheet, ButtonProps } from "react-native";

export function Button({ title, onPress }: ButtonProps) {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
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
