import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type Task = {
  id: number;
  title: string;
  priority: string;
  deadline: string;
  completed: boolean;
};

type TaskItemProps = {
  task: Task;
  onToggleComplete: (taskId: number) => void;
  onDeleteTask: (taskId: number) => void;
};

export default function TaskItem({
  task,
  onToggleComplete,
  onDeleteTask,
}: TaskItemProps) {
  const getPriorityStyle = () => {
    const p = task.priority.toLowerCase();
    if (p === "high") return styles.high;
    if (p === "low") return styles.low;
    return styles.medium;
  };

  return (
    <View style={[styles.card, getPriorityStyle()]}>
      <Text style={[styles.title, task.completed && styles.completed]}>
        {task.title}
      </Text>
      <Text>Priority: {task.priority}</Text>
      <Text>Deadline: {task.deadline}</Text>
      <Text>Status: {task.completed ? "Complete" : "In Progress"}</Text>

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
  card: {
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: "#CFC0BD",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  completed: {
    textDecorationLine: "line-through",
    color: "#777",
  },
  high: {
    borderLeftWidth: 6,
    borderLeftColor: "#f8caca",
  },
  medium: {
    borderLeftWidth: 6,
    borderLeftColor: "#f8e0b8",
  },
  low: {
    borderLeftWidth: 6,
    borderLeftColor: "#cfeccf",
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: "#4a90e2",
    padding: 8,
    borderRadius: 6,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: "#cc4444",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
