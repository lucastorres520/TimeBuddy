import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useMemo, useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AddTaskForm from "../../components/AddTaskForm";
import type { Task } from "../../components/TaskItem";
import TaskList from "../../components/TaskList";

// Keys used to save and load data from AsyncStorage.
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

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  // Stores the user's task list.
  const [tasks, setTasks] = useState<Task[]>([]);

  // Stores the current values typed or selected in the add task form.
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [deadline, setDeadline] = useState("");
  const [time, setTime] = useState("");

  // Controls theme and mascot animation visibility.
  const [darkMode, setDarkMode] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showMascot, setShowMascot] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Controls the deadline date picker modal.
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());

  // Controls the time picker modal.
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [tempTime, setTempTime] = useState(new Date());

  // Chooses the correct color palette based on the current theme.
  const theme = darkMode ? DARK_COLORS : COLORS;

  // Sorts tasks so incomplete tasks show first, then tasks with earlier deadlines.
  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }

      if (a.deadline === "No deadline") return 1;
      if (b.deadline === "No deadline") return -1;

      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    });
  }, [tasks]);

  // Hides the welcome screen after a short delay.
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Loads saved tasks and theme settings when the screen first opens.
  useEffect(() => {
    loadTasks();
    loadTheme();
  }, []);

  // Saves the task list whenever tasks are added, completed, or deleted.
  useEffect(() => {
    saveTasks();
  }, [tasks]);

  // Loads saved tasks from AsyncStorage.
  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem(STORAGE_KEY);

      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.log("Error loading tasks:", error);
    }
  };

  // Saves the current task list to AsyncStorage.
  const saveTasks = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.log("Error saving tasks:", error);
    }
  };

  // Loads the saved dark mode setting from AsyncStorage.
  const loadTheme = async () => {
    try {
      const storedTheme = await AsyncStorage.getItem(THEME_KEY);

      if (storedTheme !== null) {
        setDarkMode(JSON.parse(storedTheme));
      }
    } catch (error) {
      console.log("Error loading theme:", error);
    }
  };

  // Creates a new task using the current form values.
  const addTask = () => {
    if (!title.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      title,
      priority: priority || "medium",
      deadline: deadline || "No deadline",
      time: time || "No time",
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTitle("");
    setPriority("");
    setDeadline("");
    setTime("");
  };

  // Marks a task as complete or incomplete and plays the correct mascot animation.
  const toggleComplete = (taskId: number) => {
    const clickedTask = tasks.find((task) => task.id === taskId);

    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );

    setTasks(updatedTasks);

    // Checks if every task is complete so the celebration animation can play.
    const allTasksComplete =
      updatedTasks.length > 0 && updatedTasks.every((task) => task.completed);

    if (clickedTask && !clickedTask.completed && allTasksComplete) {
      setShowCelebration(true);

      setTimeout(() => {
        setShowCelebration(false);
      }, 2500);

      return;
    }

    // Shows the smaller encouragement animation after completing a single task.
    if (clickedTask && !clickedTask.completed) {
      setShowMascot(true);

      setTimeout(() => {
        setShowMascot(false);
      }, 2000);
    }
  };

  // Removes a task from the task list.
  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Switches between light mode and dark mode, then saves that choice.
  const toggleDarkMode = async () => {
    const newValue = !darkMode;

    setDarkMode(newValue);
    await AsyncStorage.setItem(THEME_KEY, JSON.stringify(newValue));
  };

  // Opens the date picker and starts it at the current deadline if one exists.
  const openDatePicker = () => {
    setTempDate(deadline ? new Date(deadline) : new Date());
    setShowDatePicker(true);
  };

  // Saves the selected date as the task deadline.
  const saveDate = () => {
    setDeadline(tempDate.toISOString().split("T")[0]);
    setShowDatePicker(false);
  };

  // Opens the time picker.
  const openTimePicker = () => {
    setTempTime(new Date());
    setShowTimePicker(true);
  };

  // Saves the selected time in a readable format.
  const saveTime = () => {
    const timePart = tempTime.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });

    setTime(timePart);
    setShowTimePicker(false);
  };

  // Shows the welcome animation before the main app screen loads.
  if (showWelcome) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Image
          source={require("../../assets/images/Wave.gif")}
          style={styles.welcomeImage}
        />

        <Text style={styles.welcomeText}>Getting your tasks ready...</Text>
      </View>
    );
  }

  // Main TimeBuddy screen.
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + 10,
          backgroundColor: theme.background,
        },
      ]}
    >
      <View style={styles.topSection}>
        {/* Button for switching between light and dark mode. */}
        <TouchableOpacity style={styles.themeButton} onPress={toggleDarkMode}>
          <Text style={styles.themeButtonText}>{darkMode ? "☀️" : "💡"}</Text>
        </TouchableOpacity>

        <Text style={[styles.header, { color: theme.dark }]}>TimeBuddy</Text>

        <Text style={[styles.subheader, { color: theme.dark }]}>
          Stay organized in a simple and encouraging way.
        </Text>

        {/* Mascot area changes depending on whether the user completed one task or all tasks. */}
        <View style={styles.mascotBox}>
          {showCelebration ? (
            <Image
              source={require("../../assets/images/Celebrate.gif")}
              style={styles.celebrationImage}
            />
          ) : (
            showMascot && (
              <Image
                source={require("../../assets/images/Wave.gif")}
                style={styles.mascotImage}
              />
            )
          )}

          <Text style={[styles.mascot, { color: theme.dark }]}>
            {showCelebration
              ? "TimeBuddy says: You completed everything!"
              : showMascot
              ? "TimeBuddy says: Nice job!"
              : "TimeBuddy says: You've got this!"}
          </Text>
        </View>

        {/* Form for adding a new task. */}
        <AddTaskForm
          title={title}
          priority={priority}
          deadline={deadline}
          time={time}
          darkMode={darkMode}
          onChangeTitle={setTitle}
          onChangePriority={setPriority}
          onChangeDeadline={setDeadline}
          onAddTask={addTask}
          onOpenDatePicker={openDatePicker}
          onOpenTimePicker={openTimePicker}
        />
      </View>

      {/* Displays the sorted task list. */}
      <ScrollView style={styles.taskListScroll}>
        <TaskList
          tasks={sortedTasks}
          darkMode={darkMode}
          onToggleComplete={toggleComplete}
          onDeleteTask={deleteTask}
        />
      </ScrollView>

      {/* Modal used to select a deadline date. */}
      <Modal visible={showDatePicker} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            <Text style={[styles.modalTitle, { color: theme.dark }]}>
              Select Deadline
            </Text>

            <DateTimePicker
              value={tempDate}
              mode="date"
              display="spinner"
              onChange={(event, date) => {
                if (date) setTempDate(date);
              }}
            />

            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowDatePicker(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.doneButton]}
                onPress={saveDate}
              >
                <Text style={styles.modalButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal used to select a task time. */}
      <Modal visible={showTimePicker} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            <Text style={[styles.modalTitle, { color: theme.dark }]}>
              Select Time
            </Text>

            <DateTimePicker
              value={tempTime}
              mode="time"
              display="spinner"
              onChange={(event, date) => {
                if (date) setTempTime(date);
              }}
            />

            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowTimePicker(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.doneButton]}
                onPress={saveTime}
              >
                <Text style={styles.modalButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  // Main screen layout.
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  topSection: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  taskListScroll: {
    flex: 1,
    paddingHorizontal: 20,
  },

  // Header and theme button styles.
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.dark,
    marginBottom: 4,
  },
  subheader: {
    fontSize: 14,
    color: COLORS.dark,
    marginBottom: 12,
    opacity: 0.8,
  },
  themeButton: {
    position: "absolute",
    top: 10,
    right: 20,
    zIndex: 10,
    backgroundColor: COLORS.primary,
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
  },
  themeButtonText: {
    fontSize: 18,
  },

  // Mascot and welcome animation styles.
  mascotBox: {
    alignItems: "center",
    marginBottom: 16,
    minHeight: 150,
    justifyContent: "center",
  },
  mascotImage: {
    width: 120,
    height: 120,
  },
  celebrationImage: {
    width: 180,
    height: 180,
  },
  mascot: {
    marginTop: 6,
    fontSize: 14,
    color: COLORS.dark,
  },
  welcomeImage: {
    width: 150,
    height: 150,
  },
  welcomeText: {
    color: COLORS.dark,
    fontSize: 18,
    marginTop: 12,
  },

  // Modal styles for the date and time pickers.
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.dark,
    marginBottom: 12,
  },
  modalButtonRow: {
    flexDirection: "row",
    marginTop: 16,
    gap: 12,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: COLORS.secondary,
  },
  doneButton: {
    backgroundColor: COLORS.primary,
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
