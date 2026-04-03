import React, { useState } from 'react';
import {
  Image, SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

type Task = {
  id: number;
  title: string;
  priority: string;
  deadline: string;
  completed: boolean;
};

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('');
  const [deadline, setDeadline] = useState('');

  const addTask = () => {
    if (!title.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      title,
      priority: priority || 'medium',
      deadline: deadline || 'No deadline',
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTitle('');
    setPriority('');
    setDeadline('');
  };

  const toggleComplete = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const getPriorityStyle = (priorityValue: string) => {
    const p = priorityValue.toLowerCase();
    if (p === 'high') return styles.high;
    if (p === 'low') return styles.low;
    return styles.medium;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>TimeBuddy</Text>
        <Text style={styles.subheader}>
          Stay organized in a simple and encouraging way.
        </Text>

                <View style={styles.mascotBox}>
          <Image
            source={require('../../assets/images/wave.gif')}
            style={{ width: 120, height: 120 }}
          />
          <Text style={styles.mascot}>TimeBuddy says: You've got this!</Text>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter task title..."
            placeholderTextColor="#999"
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            style={styles.input}
            placeholder="Priority (high, medium, low)"
            placeholderTextColor="#999"
            value={priority}
            onChangeText={setPriority}
          />
          <TextInput
            style={styles.input}
            placeholder="Deadline (YYYY-MM-DD)"
            placeholderTextColor="#999"
            value={deadline}
            onChangeText={setDeadline}
          />
          
          <TouchableOpacity style={styles.button} onPress={addTask}>
            <Text style={styles.buttonText}>Add Task</Text>
          </TouchableOpacity>
        </View>

        {tasks.length === 0 ? (
          <Text>No tasks yet. Add one to get started.</Text>
        ) : (
          tasks.map((task) => (
            <View key={task.id} style={[styles.card, getPriorityStyle(task.priority)]}>
              <Text style={[styles.title, task.completed && styles.completed]}>
                {task.title}
              </Text>
              <Text>Priority: {task.priority}</Text>
              <Text>Deadline: {task.deadline}</Text>
              <Text>Status: {task.completed ? 'Complete' : 'In Progress'}</Text>

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => toggleComplete(task.id)}
                >
                  <Text style={styles.buttonText}>
                    {task.completed ? 'Undo' : 'Complete'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionButton, styles.deleteButton]}
                  onPress={() => deleteTask(task.id)}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subheader: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
  },
  mascotBox: {
    alignItems: 'center',
    marginBottom: 16,
  },
  mascot: {
    fontSize: 14,
    color: '#333',
  },
  formContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
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
  card: {
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#777',
  },
  high: {
    borderLeftWidth: 6,
    borderLeftColor: 'red',
  },
  medium: {
    borderLeftWidth: 6,
    borderLeftColor: 'orange',
  },
  low: {
    borderLeftWidth: 6,
    borderLeftColor: 'green',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: '#4a90e2',
    padding: 8,
    borderRadius: 6,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: '#cc4444',
  },
});