import {
  StyleProp,
  StyleSheet,
  TextStyle,
  Text as _Text,
  type TextProps as _TP,
} from "react-native";

export type TextProps = _TP & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function Text({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: TextProps) {
  const _style: StyleProp<TextStyle> = {
    color: "white",
  };

  return <_Text style={[styles[type], style, _style]} {...rest} />;
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
});
