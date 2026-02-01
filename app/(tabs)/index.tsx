import { FlatList, Modal, View } from "react-native";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { SafeAreaView } from "react-native-safe-area-context";
import { Checkbox } from "expo-checkbox";
import { useCallback, useState } from "react";
import { Task } from "@/components/tasks-provider";

import useTasks from "@/hooks/use-tasks";
import { Input } from "@/components/ui/input";

const today = new Date();
const weekday = today.toLocaleDateString("en-US", { weekday: "long" });
const month = today.toLocaleDateString("en-US", { month: "long" });

export default function Index() {
  const [tasks, setTasks] = useTasks();
  const [open, setOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState({
    title: "",
    description: "",
  });

  const changeCurrentTask = useCallback(
    (type: "title" | "description", val: string) => {
      setCurrentTask((prev) => ({
        ...prev,
        [type]: val,
      }));
    },
    [currentTask],
  );

  const addTask = useCallback(() => {
    setOpen(false);

    setTasks((prev) => [...prev, currentTask]);
  }, [currentTask]);

  return (
    <SafeAreaView
      style={{
        padding: 30,
        flex: 1,
      }}
    >
      <Text type="title">Today</Text>
      <Text style={{ marginBottom: 16 }}>
        {month} {today.getDate()} - {weekday}
      </Text>
      <FlatList
        data={tasks}
        renderItem={(task) => <TaskItem {...task} />}
      ></FlatList>
      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#1e1e1e",
              padding: 20,
              width: 300,
              borderRadius: 4,
            }}
          >
            <Text style={{ marginBottom: 8 }} type="subtitle">
              Add task
            </Text>
            <Input
              onChangeText={(text) => changeCurrentTask("title", text)}
              placeholder="Title..."
            />
            <Input
              placeholder="Description..."
              onChangeText={(text) => changeCurrentTask("title", text)}
              style={{ marginVertical: 6 }}
            />
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 4,
              }}
            >
              <Button title="Close" onPress={() => setOpen(false)} />
              <Button title="Add" onPress={addTask} />
            </View>
          </View>
        </View>
      </Modal>
      <Button
        title="+"
        style={{
          position: "absolute",
          borderRadius: 9999999,
          paddingHorizontal: 24,
          backgroundColor: "#DC4D3D",
          bottom: 30,
          right: 30,
        }}
        textStyle={{
          fontSize: 30,
        }}
        onPress={() => setOpen(true)}
      />
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
        <Text type="defaultSemiBold">{item.title}</Text>
        <Text style={{ color: "gray" }}>{item.description}</Text>
      </View>
    </View>
  );
}
