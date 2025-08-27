import { create } from "zustand";

interface ThemeState {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

export const useThemeStore = create<ThemeState>((set) => {
  const initialTheme = (localStorage.getItem("theme") as "light" | "dark") || "light";
  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(initialTheme);

  return {
    theme: initialTheme,
    setTheme: (theme) => {
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(theme);
      localStorage.setItem("theme", theme);
      set({ theme });
    },
  };
});

export const useTheme = () => useThemeStore((state) => state.theme);
export const useSetTheme = () => useThemeStore((state) => state.setTheme);
