# TimeBuddy

TimeBuddy is a time management app designed to help users stay organized and motivated through a simple and engaging interface. The goal of the app is to make task management less overwhelming and more interactive compared to traditional to-do lists.

## Features

- Create, complete, undo, and delete tasks
- Assign priority levels: high, medium, and low
- Visual priority indicators using color coding
- Add deadlines to tasks using a date picker
- Add times to tasks using a time picker
- Persistent task storage using AsyncStorage so tasks remain after restarting the app
- Dark mode toggle with saved theme preference
- Welcome animation when the app first opens
- Animated mascot feedback when tasks are completed
- Celebration animation when all tasks are completed
- Progress screen for tracking task completion
- Progress bar showing overall completion percentage
- Motivational messages based on progress
- Bottom tab navigation between the main task screen and progress screen

## Technologies Used

- React Native
- Expo
- Expo Router
- TypeScript
- AsyncStorage
- React Native DateTimePicker
- React Native Safe Area Context

## Current Functionality

TimeBuddy currently includes a working task management system where users can create tasks, assign priority levels, select deadlines, select times, mark tasks as complete, undo completed tasks, and delete tasks. Tasks are saved using AsyncStorage, allowing the task list to remain available even after the app is closed or restarted.

The app includes both light and dark mode styling. Users can switch themes with a toggle button, and the selected theme is saved so it stays consistent when the app is reopened. The app also uses a consistent color palette across the main task screen, task form, task cards, modals, and progress screen.

The main screen includes a welcome animation when the app first opens. TimeBuddy also provides animated mascot feedback when a user completes a task. If all tasks are completed, the app displays a larger celebration animation and a message congratulating the user.

Tasks are displayed in an organized list and sorted so incomplete tasks appear before completed tasks. Tasks with deadlines are also arranged by date, while tasks with no deadline are placed lower in the list. Each task card shows the task title, priority, deadline, time, and completion status.

The app also includes a Progress screen. This screen shows the total number of tasks, completed tasks, remaining tasks, and the overall completion percentage. A progress bar visually represents the user’s progress, and the app displays motivational messages based on how much of the task list has been completed.

## Author

Lucas Torres
