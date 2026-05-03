import React from "react";
import { Text, View } from "react-native";

import TaskItem, { Task } from "./TaskItem";

// Defines the values and functions passed into the task list.
type TaskListProps = {
  tasks: Task[];
  darkMode: boolean;
  onToggleComplete: (taskId: number) => void;
  onDeleteTask: (taskId: number) => void;
};

export default function TaskList({
  tasks,
  darkMode,
  onToggleComplete,
  onDeleteTask,
}: TaskListProps) {
  // Changes the empty-list message color based on the current theme.
  const textColor = darkMode ? "#F2ECE8" : "#586F6B";

  // Shows a message when there are no tasks yet.
  if (tasks.length === 0) {
    return (
      <View>
        <Text style={{ color: textColor }}>
          No tasks yet. Add one to get started.
        </Text>
      </View>
    );
  }

  // Renders each task as its own TaskItem card.
  return (
    <View>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          darkMode={darkMode}
          onToggleComplete={onToggleComplete}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </View>
  );
}
