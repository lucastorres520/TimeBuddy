import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import AddTaskForm from '../../components/AddTaskForm';
import type { Task } from '../../components/TaskItem';
import TaskList from '../../components/TaskList';

const STORAGE_KEY = 'timebuddy_tasks';

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('');
  const [deadline, setDeadline] = useState('');
  const [showMascot, setShowMascot] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    saveTasks();
  }, [tasks]);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.log('Error loading tasks:', error);
    }
  };

  const saveTasks = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.log('Error saving tasks:', error);
    }
  };

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
    const clickedTask = tasks.find((task) => task.id === taskId);

    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );

    if (clickedTask && !clickedTask.completed) {
      setShowMascot(true);

      setTimeout(() => {
        setShowMascot(false);
      }, 2000);
    }
  };

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>TimeBuddy</Text>
        <Text style={styles.subheader}>
          Stay organized in a simple and encouraging way.
        </Text>

        <View style={styles.mascotBox}>
          {showMascot && (
            <Image
              source={require('../../assets/images/Wave.gif')}
              style={styles.mascotImage}
            />
          )}
          <Text style={styles.mascot}>
            {showMascot ? 'TimeBuddy says: Nice job!' : 'TimeBuddy says: You\'ve got this!'}
          </Text>
        </View>

        <AddTaskForm
          title={title}
          priority={priority}
          deadline={deadline}
          onChangeTitle={setTitle}
          onChangePriority={setPriority}
          onChangeDeadline={setDeadline}
          onAddTask={addTask}
        />

        <TaskList
          tasks={tasks}
          onToggleComplete={toggleComplete}
          onDeleteTask={deleteTask}
        />
      </ScrollView>
    </View>
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
    minHeight: 150,
    justifyContent: 'center',
  },
  mascotImage: {
    width: 120,
    height: 120,
  },
  mascot: {
    marginTop: 6,
    fontSize: 14,
    color: '#333',
  },
});