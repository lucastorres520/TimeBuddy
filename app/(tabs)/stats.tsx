import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const STORAGE_KEY = 'timebuddy_tasks';

const COLORS = {
  background: '#DDD5D0',
  card: '#CFC0BD',
  secondary: '#B8B8AA',
  primary: '#7F9183',
  dark: '#586F6B',
};

type Task = {
  id: number;
  title: string;
  priority: string;
  deadline: string;
  completed: boolean;
};

export default function ProgressScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      loadTasks();
    }, 1000);
  
    return () => clearInterval(interval);
  }, []);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      } else {
        setTasks([]);
      }
    } catch (error) {
      console.log('Error loading tasks:', error);
    }
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const remainingTasks = totalTasks - completedTasks;
  const progressPercent =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const getMessage = () => {
    if (totalTasks === 0) return 'Add a few tasks to start tracking progress.';
    if (progressPercent === 100) return 'Amazing job! You completed everything!';
    if (progressPercent >= 75) return 'You are doing great. Keep going!';
    if (progressPercent >= 50) return 'Nice progress so far!';
    if (progressPercent >= 25) return 'Good start. Keep building momentum!';
    return 'Every task completed is progress.';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Progress</Text>

      <View style={styles.card}>
        <Text style={styles.statText}>Total Tasks: {totalTasks}</Text>
        <Text style={styles.statText}>Completed: {completedTasks}</Text>
        <Text style={styles.statText}>Remaining: {remainingTasks}</Text>
        <Text style={styles.percentText}>{progressPercent}% Complete</Text>

        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${progressPercent}%` },
            ]}
          />
        </View>

        <Text style={styles.message}>{getMessage()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 20,
  },
  statText: {
    fontSize: 18,
    color: COLORS.dark,
    marginBottom: 8,
  },
  percentText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginTop: 8,
    marginBottom: 12,
    textAlign: 'center',
  },
  progressBarBackground: {
    height: 20,
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 16,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },
  message: {
    fontSize: 16,
    color: COLORS.dark,
    textAlign: 'center',
    marginTop: 8,
  },
});