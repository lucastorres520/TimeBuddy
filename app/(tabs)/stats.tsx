import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

// Keys used to load saved tasks and theme settings from AsyncStorage.
const STORAGE_KEY = "timebuddy_tasks";
const THEME_KEY = "timebuddy_dark_mode";

// Main color palette for light mode.
const COLORS = {
  background: "#DDD5D0",
  card: "#CFC0BD",
  secondary: "#B8B8AA",
  primary: "#7F9183",
  dark: "#586F6B",
};

// Alternate color palette used when dark mode is turned on.
const DARK_COLORS = {
  background: "#1f2423",
  card: "#2f3835",
  secondary: "#586F6B",
  primary: "#7F9183",
  dark: "#F2ECE8",
};

// Defines the structure of a task object used on the Stats screen.
type Task = {
  id: number;
  title: string;
  priority: string;
  deadline: string;
  time: string;
  completed: boolean;
};

export default function ProgressScreen() {
  // Stores the tasks loaded from the main task screen.
  const [tasks, setTasks] = useState<Task[]>([]);

  // Stores whether the app should display in dark mode.
  const [darkMode, setDarkMode] = useState(false);

  // Chooses the correct color palette based on the current theme.
  const theme = darkMode ? DARK_COLORS : COLORS;

  // Reloads tasks and theme settings each time the Stats tab is opened.
  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  // Loads saved tasks and dark mode settings from AsyncStorage.
  const loadData = async () => {
    try {
      const [storedTasks, storedTheme] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEY),
        AsyncStorage.getItem(THEME_KEY),
      ]);

      setTasks(storedTasks ? JSON.parse(storedTasks) : []);

      if (storedTheme !== null) {
        setDarkMode(JSON.parse(storedTheme));
      }
    } catch (error) {
      console.log("Error loading data:", error);
    }
  };

  // Calculates task totals and the user's completion percentage.
  const { totalTasks, completedTasks, remainingTasks, progressPercent } =
    useMemo(() => {
      const total = tasks.length;
      const completed = tasks.filter((task) => task.completed).length;

      return {
        totalTasks: total,
        completedTasks: completed,
        remainingTasks: total - completed,
        progressPercent:
          total === 0 ? 0 : Math.round((completed / total) * 100),
      };
    }, [tasks]);

  // Chooses an encouraging message based on the user's progress.
  const message = useMemo(() => {
    if (totalTasks === 0) return "Add a few tasks to start tracking progress.";
    if (progressPercent === 100)
      return "Amazing job! You completed everything!";
    if (progressPercent >= 75) return "You are doing great. Keep going!";
    if (progressPercent >= 50) return "Nice progress so far!";
    if (progressPercent >= 25) return "Good start. Keep building momentum!";
    return "Every task completed is progress.";
  }, [totalTasks, progressPercent]);

  // Displays the progress summary, progress bar, and motivational message.
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.dark }]}>Progress</Text>

      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.statText, { color: theme.dark }]}>
          Total Tasks: {totalTasks}
        </Text>

        <Text style={[styles.statText, { color: theme.dark }]}>
          Completed: {completedTasks}
        </Text>

        <Text style={[styles.statText, { color: theme.dark }]}>
          Remaining: {remainingTasks}
        </Text>

        <Text style={[styles.percentText, { color: theme.dark }]}>
          {progressPercent}% Complete
        </Text>

        {/* Visual progress bar that fills based on the completion percentage. */}
        <View
          style={[
            styles.progressBarBackground,
            { backgroundColor: theme.secondary },
          ]}
        >
          <View
            style={[
              styles.progressBarFill,
              {
                width: `${progressPercent}%`,
                backgroundColor: theme.primary,
              },
            ]}
          />
        </View>

        <Text style={[styles.message, { color: theme.dark }]}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Main screen layout.
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },

  // Page title style.
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  // Card that holds the progress statistics.
  card: {
    borderRadius: 16,
    padding: 20,
  },

  // Text style for task totals.
  statText: {
    fontSize: 18,
    marginBottom: 8,
  },

  // Larger text style for the completion percentage.
  percentText: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 12,
    textAlign: "center",
  },

  // Background track of the progress bar.
  progressBarBackground: {
    height: 20,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 16,
  },

  // Filled portion of the progress bar.
  progressBarFill: {
    height: "100%",
    borderRadius: 10,
  },

  // Motivational message shown under the progress bar.
  message: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 8,
  },
});
