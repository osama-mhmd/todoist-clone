import React from "react";

export interface Task {
  title: string;
  description: string;
  done?: boolean;
}

interface CtxProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export const tasksContext = React.createContext<CtxProps>({
  tasks: [],
  setTasks: () => {},
});

export default function TasksProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tasks, setTasks] = React.useState<Task[]>([]);

  return (
    <tasksContext.Provider value={{ tasks, setTasks }}>
      {children}
    </tasksContext.Provider>
  );
}
