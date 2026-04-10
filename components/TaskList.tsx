import React from 'react';
import { Text, View } from 'react-native';
import TaskItem, { Task } from './TaskItem';

type TaskListProps = {
  tasks: Task[];
  onToggleComplete: (taskId: number) => void;
  onDeleteTask: (taskId: number) => void;
};

export default function TaskList({
  tasks,
  onToggleComplete,
  onDeleteTask,
}: TaskListProps) {
  return (
    <View>
      {tasks.length === 0 ? (
        <Text>No tasks yet. Add one to get started.</Text>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleComplete={onToggleComplete}
            onDeleteTask={onDeleteTask}
          />
        ))
      )}
    </View>
  );
}