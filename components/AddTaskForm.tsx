import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const COLORS = {
  background: "#DDD5D0",
  card: "#CFC0BD",
  secondary: "#B8B8AA",
  primary: "#7F9183",
  dark: "#586F6B",
};

type AddTaskFormProps = {
  title: string;
  priority: string;
  deadline: string;
  onChangeTitle: (value: string) => void;
  onChangePriority: (value: string) => void;
  onChangeDeadline: (value: string) => void;
  onAddTask: () => void;
  onOpenDatePicker: () => void;
};

export default function AddTaskForm({
  title,
  priority,
  deadline,
  onChangeTitle,
  onChangePriority,
  onChangeDeadline,
  onAddTask,
  onOpenDatePicker,
}: AddTaskFormProps) {
  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Enter task title..."
        placeholderTextColor="#999"
        value={title}
        onChangeText={onChangeTitle}
      />

      <Text style={styles.label}>Select Priority</Text>
      <View style={styles.priorityRow}>
        <TouchableOpacity
          style={[
            styles.priorityButton,
            priority === "low" && styles.selectedLow,
          ]}
          onPress={() => onChangePriority("low")}
        >
          <Text style={styles.priorityButtonText}>Low</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.priorityButton,
            priority === "medium" && styles.selectedMedium,
          ]}
          onPress={() => onChangePriority("medium")}
        >
          <Text style={styles.priorityButtonText}>Medium</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.priorityButton,
            priority === "high" && styles.selectedHigh,
          ]}
          onPress={() => onChangePriority("high")}
        >
          <Text style={styles.priorityButtonText}>High</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.input} onPress={onOpenDatePicker}>
        <Text style={{ color: deadline ? COLORS.dark : "#999" }}>
          {deadline || "Select deadline"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={onAddTask}>
        <Text style={styles.buttonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    color: COLORS.dark,
  },
  input: {
    backgroundColor: COLORS.card,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  priorityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    gap: 8,
  },
  priorityButton: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  selectedHigh: {
    backgroundColor: "#f8caca",
  },
  selectedMedium: {
    backgroundColor: "#f8e0b8",
  },
  selectedLow: {
    backgroundColor: "#cfeccf",
  },
  priorityButtonText: {
    fontWeight: "600",
    color: COLORS.dark,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
