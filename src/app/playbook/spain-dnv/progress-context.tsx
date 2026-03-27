"use client";

import { createContext, useContext } from "react";

interface ProgressContextType {
  completedLessonIds: string[];
  markComplete: (lessonId: string, completed: boolean) => void;
  isAuthenticated: boolean;
}

export const ProgressContext = createContext<ProgressContextType>({
  completedLessonIds: [],
  markComplete: () => {},
  isAuthenticated: false,
});

export const useProgress = () => useContext(ProgressContext);
