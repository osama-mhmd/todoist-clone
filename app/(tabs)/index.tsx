import { FlatList, InteractionManager, Modal, View } from "react-native";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { SafeAreaView } from "react-native-safe-area-context";
import { Checkbox } from "expo-checkbox";
import { useCallback, useRef, useState } from "react";
import { Task } from "@/components/tasks-provider";

import useTasks from "@/hooks/use-tasks";
import { Input } from "@/components/ui/input";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const today = new Date();
const weekday = today.toLocaleDateString("en-US", { weekday: "long" });
const month = today.toLocaleDateString("en-US", { month: "long" });

export default function Index() {
  const input = useRef(null);
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

  const handleModalAppear = useCallback(() => {
    setTimeout(() => {
      if (!input.current) return;
      const inputEl = input.current as unknown as HTMLInputElement;

      inputEl.focus();
    }, 100);
  }, []);

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
        onShow={handleModalAppear}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              backgroundColor: "#1e1e1e",
              paddingStart: 8,
              paddingTop: 8,
              borderRadius: 4,
            }}
          >
            <Input
              onChangeText={(text) => changeCurrentTask("title", text)}
              placeholder="Title..."
              ref={input}
              style={{
                borderWidth: 0,
                fontSize: 20,
              }}
            />
            <Input
              multiline
              placeholder="Description..."
              onChangeText={(text) => changeCurrentTask("description", text)}
              style={{
                borderWidth: 0,
                marginTop: -12,
              }}
            />
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 4,
                padding: 8,
              }}
            >
              <View style={{ flex: 1 }}></View>
              <Button
                style={{
                  backgroundColor: "#DC4D3D",
                  flex: 0,
                  paddingHorizontal: 12,
                  borderRadius: 9999,
                }}
                title={<FontAwesome size={18} name="arrow-up" />}
                onPress={addTask}
              />
            </View>
          </View>
        </View>
      </Modal>
      <Button
        title="+"
        style={{
          position: "absolute",
          borderRadius: 99,
          paddingHorizontal: 24,
          backgroundColor: "#DC4D3D",
          bottom: 15,
          right: 15,
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
        <Text
          style={{
            textDecorationLine: checked ? "line-through" : "none",
            color: checked ? "gray" : "white",
          }}
          type="defaultSemiBold"
        >
          {item.title}
        </Text>
        <Text style={{ color: checked ? "#666" : "#eee" }}>
          {item.description}
        </Text>
      </View>
    </View>
  );
}
