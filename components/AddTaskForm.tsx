import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Main color palette used by the add task form.
const COLORS = {
  background: "#DDD5D0",
  card: "#CFC0BD",
  secondary: "#B8B8AA",
  primary: "#7F9183",
  dark: "#586F6B",
};

// Defines the values and functions that are passed into this component from the main screen.
type AddTaskFormProps = {
  title: string;
  priority: string;
  deadline: string;
  time: string;
  darkMode: boolean;
  onChangeTitle: (value: string) => void;
  onChangePriority: (value: string) => void;
  onChangeDeadline: (value: string) => void;
  onAddTask: () => void;
  onOpenDatePicker: () => void;
  onOpenTimePicker: () => void;
};

export default function AddTaskForm({
  title,
  priority,
  deadline,
  time,
  darkMode,
  onChangeTitle,
  onChangePriority,
  onChangeDeadline,
  onAddTask,
  onOpenDatePicker,
  onOpenTimePicker,
}: AddTaskFormProps) {
  return (
    <View style={styles.formContainer}>
      {/* Text input for entering the task title. */}
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: darkMode ? "#2f3835" : COLORS.card,
            color: darkMode ? "#F2ECE8" : COLORS.dark, // Keeps the typed text visible in dark mode.
          },
        ]}
        placeholder="Enter task title..."
        placeholderTextColor={darkMode ? "#aaa" : "#999"} // Changes placeholder color based on theme.
        value={title}
        onChangeText={onChangeTitle}
      />

      <Text style={styles.label}>Select Priority</Text>

      {/* Priority buttons let the user choose low, medium, or high priority. */}
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

      {/* Opens the date picker on the main screen. */}
      <TouchableOpacity
        style={[
          styles.input,
          { backgroundColor: darkMode ? "#2f3835" : COLORS.card },
        ]}
        onPress={onOpenDatePicker}
      >
        <Text style={{ color: deadline ? COLORS.dark : "#999" }}>
          {deadline || "Select deadline"}
        </Text>
      </TouchableOpacity>

      {/* Opens the time picker on the main screen. */}
      <TouchableOpacity
        style={[
          styles.input,
          { backgroundColor: darkMode ? "#2f3835" : COLORS.card },
        ]}
        onPress={onOpenTimePicker}
      >
        <Text style={{ color: time ? COLORS.dark : "#999" }}>
          {time || "Select time"}
        </Text>
      </TouchableOpacity>

      {/* Adds the new task using the current form values. */}
      <TouchableOpacity style={styles.button} onPress={onAddTask}>
        <Text style={styles.buttonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  // Main container for the task form.
  formContainer: {
    marginBottom: 20,
  },

  // Label above the priority buttons.
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    color: COLORS.dark,
  },

  // Shared input style for title, deadline, and time fields.
  input: {
    backgroundColor: COLORS.card,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },

  // Horizontal layout for the priority buttons.
  priorityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    gap: 8,
  },

  // Default style for each priority option.
  priorityButton: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },

  // Highlight color when High priority is selected.
  selectedHigh: {
    backgroundColor: "#f8caca",
  },

  // Highlight color when Medium priority is selected.
  selectedMedium: {
    backgroundColor: "#f8e0b8",
  },

  // Highlight color when Low priority is selected.
  selectedLow: {
    backgroundColor: "#cfeccf",
  },

  // Text inside the priority buttons.
  priorityButtonText: {
    fontWeight: "600",
    color: COLORS.dark,
  },

  // Main Add Task button.
  button: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  // Text inside the Add Task button.
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
