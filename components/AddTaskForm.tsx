import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type AddTaskFormProps = {
  title: string;
  priority: string;
  deadline: string;
  onChangeTitle: (value: string) => void;
  onChangePriority: (value: string) => void;
  onChangeDeadline: (value: string) => void;
  onAddTask: () => void;
};

export default function AddTaskForm({
  title,
  priority,
  deadline,
  onChangeTitle,
  onChangePriority,
  onChangeDeadline,
  onAddTask,
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
            priority === 'high' && styles.selectedHigh,
          ]}
          onPress={() => onChangePriority('high')}
        >
          <Text style={styles.priorityButtonText}>High</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.priorityButton,
            priority === 'medium' && styles.selectedMedium,
          ]}
          onPress={() => onChangePriority('medium')}
        >
          <Text style={styles.priorityButtonText}>Medium</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.priorityButton,
            priority === 'low' && styles.selectedLow,
          ]}
          onPress={() => onChangePriority('low')}
        >
          <Text style={styles.priorityButtonText}>Low</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Deadline (YYYY-MM-DD)"
        placeholderTextColor="#999"
        value={deadline}
        onChangeText={onChangeDeadline}
      />

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
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  priorityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 8,
  },
  priorityButton: {
    flex: 1,
    backgroundColor: '#eee',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedHigh: {
    backgroundColor: '#f8caca',
  },
  selectedMedium: {
    backgroundColor: '#f8e0b8',
  },
  selectedLow: {
    backgroundColor: '#cfeccf',
  },
  priorityButtonText: {
    fontWeight: '600',
    color: '#333',
  },
  button: {
    backgroundColor: '#4a90e2',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});