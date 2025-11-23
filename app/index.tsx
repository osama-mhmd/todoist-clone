import { ThemedText } from "@/components/themed-text";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Checkbox } from "expo-checkbox";
import { useState } from "react";

interface Task {
  title: string;
  description: string;
}

const tasks: Task[] = [
  { title: "Simple Task", description: "Simple task description" },
  { title: "Simple Task 2", description: "Simple task description 2" },
];

const today = new Date();
const weekday = today.toLocaleDateString("en-US", { weekday: "long" });
const month = today.toLocaleDateString("en-US", { month: "long" });

export default function Index() {
  return (
    <SafeAreaView
      style={{
        padding: 20,
        marginTop: 36,
      }}
    >
      <ThemedText type="title">Today</ThemedText>
      <ThemedText type="defaultSemiBold" style={{ marginBottom: 16 }}>
        {month} {today.getDate()} - {weekday}
      </ThemedText>
      <FlatList
        data={tasks}
        renderItem={(task) => <TaskItem {...task} />}
      ></FlatList>
    </SafeAreaView>
  );
}

function TaskItem({ item }: { item: Task }) {
  const [checked, setChecked] = useState<boolean>(false);

  const handleCheckboxPress = () => {
    setChecked((prev) => {
      return !prev;
    });
  };

  return (
    <View
      style={{
        paddingHorizontal: 4,
        paddingBottom: 8,
        borderStyle: "solid",
        borderBottomWidth: 0.5,
        borderColor: "#333",
        marginBottom: 16,
        display: "flex",
        flexDirection: "row",
        gap: 8,
      }}
    >
      <Checkbox
        value={checked}
        onValueChange={handleCheckboxPress}
        style={{
          borderRadius: "50%",
          padding: 6,
          marginTop: 2,
        }}
      />
      <View>
        <ThemedText type="defaultSemiBold">{item.title}</ThemedText>
        <ThemedText style={{ color: "gray" }}>{item.description}</ThemedText>
      </View>
    </View>
  );
}
