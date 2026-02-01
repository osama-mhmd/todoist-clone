import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Modal,
  Animated,
  Dimensions,
  PanResponder,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { Task } from "./tasks-provider";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const SHEET_MAX_HEIGHT = SCREEN_HEIGHT * 0.7;
const CLOSE_THRESHOLD = 100;

interface TaskSheetProps {
  visible: boolean;
  onClose: () => void;
  task: Task;
}

function TaskSheet({ visible, onClose, task }: TaskSheetProps) {
  const translateY = useRef(new Animated.Value(SHEET_MAX_HEIGHT)).current;
  const panY = useRef(0);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 5;
      },
      onPanResponderGrant: () => {
        translateY.setOffset(panY.current);
        translateY.setValue(0);
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        translateY.flattenOffset();

        if (gestureState.dy > CLOSE_THRESHOLD || gestureState.vy > 0.5) {
          closeSheet();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            tension: 80,
            friction: 10,
          }).start(() => {
            panY.current = 0;
          });
        }
      },
    }),
  ).current;

  useEffect(() => {
    if (visible) {
      openSheet();
    } else {
      translateY.setValue(SHEET_MAX_HEIGHT);
      panY.current = 0;
    }
  }, [visible]);

  const openSheet = () => {
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
      tension: 80,
      friction: 10,
    }).start(() => {
      panY.current = 0;
    });
  };

  const closeSheet = () => {
    Animated.timing(translateY, {
      toValue: SHEET_MAX_HEIGHT,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      onClose();
      panY.current = 0;
    });
  };

  useEffect(() => {
    const listener = translateY.addListener(({ value }) => {
      panY.current = value;
    });
    return () => translateY.removeListener(listener);
  }, []);

  return (
    <Modal transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={closeSheet}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>

        <Animated.View
          style={[
            styles.sheet,
            {
              transform: [{ translateY }],
            },
          ]}
          {...panResponder.panHandlers}
        >
          <View style={styles.handle} />
          <View style={styles.content}>
            <Text style={styles.title}>{task.title}</Text>
            <Text style={styles.description}>{task.description}</Text>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  sheet: {
    backgroundColor: "#1e1e1e",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: SHEET_MAX_HEIGHT,
    paddingTop: 12,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: "#555",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 16,
  },
  content: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "white",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: "#eee",
    lineHeight: 24,
  },
});

export default TaskSheet;
