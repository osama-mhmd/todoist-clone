import TasksProvider from "@/components/tasks-provider";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <ThemeProvider value={DarkTheme}>
      <TasksProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </TasksProvider>
    </ThemeProvider>
  );
}
