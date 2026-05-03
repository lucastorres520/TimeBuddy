import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Defines the structure of each task object.
export type Task = {
  id: number;
  title: string;
  priority: string;
  deadline: string;
  time: string;
  completed: boolean;
};

// Defines the values and functions passed into each task item.
type TaskItemProps = {
  task: Task;
  darkMode: boolean;
  onToggleComplete: (taskId: number) => void;
  onDeleteTask: (taskId: number) => void;
};

export default function TaskItem({
  task,
  darkMode,
  onToggleComplete,
  onDeleteTask,
}: TaskItemProps) {
  // Chooses the left border color based on the task's priority.
  const priorityStyle =
    task.priority.toLowerCase() === "high"
      ? styles.high
      : task.priority.toLowerCase() === "low"
      ? styles.low
      : styles.medium;

  // Changes text color depending on whether dark mode is active.
  const textColor = darkMode ? "#F2ECE8" : "#586F6B";

  // Displays one task card with its details and action buttons.
  return (
    <View
      style={[
        styles.card,
        priorityStyle,
        { backgroundColor: darkMode ? "#2f3835" : "#CFC0BD" },
      ]}
    >
      <Text
        style={[
          styles.title,
          { color: textColor },
          task.completed && styles.completed,
        ]}
      >
        {task.title}
      </Text>

      <Text style={{ color: textColor }}>Priority: {task.priority}</Text>

      <Text style={{ color: textColor }}>Deadline: {task.deadline}</Text>

      <Text style={{ color: textColor }}>Time: {task.time}</Text>

      <Text style={{ color: textColor }}>
        Status: {task.completed ? "Complete" : "In Progress"}
      </Text>

      {/* Buttons for completing, undoing, or deleting the task. */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onToggleComplete(task.id)}
        >
          <Text style={styles.buttonText}>
            {task.completed ? "Undo" : "Complete"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => onDeleteTask(task.id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Main card style for each task.
  card: {
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },

  // Task title style.
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },

  // Adds a line-through style when a task is completed.
  completed: {
    textDecorationLine: "line-through",
    color: "#777",
  },

  // Border color for high priority tasks.
  high: {
    borderLeftWidth: 6,
    borderLeftColor: "#f8caca",
  },

  // Border color for medium priority tasks.
  medium: {
    borderLeftWidth: 6,
    borderLeftColor: "#f8e0b8",
  },

  // Border color for low priority tasks.
  low: {
    borderLeftWidth: 6,
    borderLeftColor: "#cfeccf",
  },

  // Places the task action buttons in a row.
  buttonRow: {
    flexDirection: "row",
    marginTop: 10,
  },

  // Shared style for the Complete/Undo and Delete buttons.
  actionButton: {
    backgroundColor: "#7F9183",
    padding: 8,
    borderRadius: 6,
    marginRight: 8,
  },

  // Darker style for the Delete button.
  deleteButton: {
    backgroundColor: "#586F6B",
  },

  // Text inside the action buttons.
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
