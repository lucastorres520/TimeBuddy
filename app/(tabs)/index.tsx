import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
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

const STORAGE_KEY = "timebuddy_tasks";

const COLORS = {
  background: "#DDD5D0",
  card: "#CFC0BD",
  secondary: "#B8B8AA",
  primary: "#7F9183",
  dark: "#586F6B",
};

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [deadline, setDeadline] = useState("");
  const [showMascot, setShowMascot] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tempDate, setTempDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 2000);
  
    return () => clearTimeout(timer);
  }, []);
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
      };
    } catch (error) {
      console.log("Error loading tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveTasks = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.log("Error saving tasks:", error);
    }
  };

  const addTask = () => {
    if (!title.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      title,
      priority: priority || "medium",
      deadline: deadline || "No deadline",
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTitle("");
    setPriority("");
    setDeadline("");
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
  if (showWelcome) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        <Image
          source={require('../../assets/images/Wave.gif')}
          style={{ width: 150, height: 150 }}
        />
        <Text style={{ color: COLORS.dark, fontSize: 18, marginTop: 12 }}>
          Getting your tasks ready...
        </Text>
      </View>
    );
  }
  

  return (
    <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>TimeBuddy</Text>
        <Text style={styles.subheader}>
          Stay organized in a simple and encouraging way.
        </Text>

        <View style={styles.mascotBox}>
          {showMascot && (
            <Image
              source={require("../../assets/images/Wave.gif")}
              style={styles.mascotImage}
            />
          )}
          <Text style={styles.mascot}>
            {showMascot
              ? "TimeBuddy says: Nice job!"
              : "TimeBuddy says: You've got this!"}
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
          onOpenDatePicker={() => {
            setTempDate(deadline ? new Date(deadline) : new Date());
            setShowDatePicker(true);
          }}
        />
        <Modal visible={showDatePicker} transparent={true} animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Deadline</Text>

              <DateTimePicker
                value={tempDate}
                mode="date"
                display="spinner"
                onChange={(event, date) => {
                  if (date) {
                    setTempDate(date);
                  }
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
                  onPress={() => {
                    setSelectedDate(tempDate);
                    setDeadline(tempDate.toISOString().split("T")[0]);
                    setShowDatePicker(false);
                  }}
                >
                  <Text style={styles.modalButtonText}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

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
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
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
  mascot: {
    marginTop: 6,
    fontSize: 14,
    color: COLORS.dark,
  },

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
