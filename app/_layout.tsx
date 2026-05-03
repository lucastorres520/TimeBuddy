import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

// Sets the initial route group for Expo Router.
export const unstable_settings = {
  anchor: "(tabs)",
};

// Root layout controls app-wide navigation and theme setup.
export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      {/* Stack controls the main app structure. */}
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>

      {/* StatusBar automatically adjusts based on the active theme. */}
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
