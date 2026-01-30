import { Task, tasksContext } from "@/components/tasks-provider";

import React from "react";

export default function useTasks(): [
  Task[],
  React.Dispatch<React.SetStateAction<Task[]>>,
] {
  const { tasks, setTasks } = React.useContext(tasksContext);

  return [tasks, setTasks];
}
