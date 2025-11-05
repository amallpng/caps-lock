import React from 'react';
import { BadgeIcons } from './components/icons/BadgeIcons';

export interface User {
  id: string;
  username: string;
  password?: string | null;
  email?: string;
  provider?: 'local' | 'google';
  profilePic: string; // Key for a predefined avatar component
  completedTasks: number[]; // Array of task IDs
  bestWpm: number;
  streak: number;
  lastTestDate: string; // YYYY-MM-DD
  testHistory: {
    date: string; // ISO string
    wpm: number;
    accuracy: number;
  }[];
}

export type Page = 'login' | 'register' | 'practice' | 'challenge' | 'profile' | 'leaderboard' | 'about';

export enum Difficulty {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
}

export interface Task {
  id: number;
  level: number;
  text: string;
  wpmGoal: number;
  accuracyGoal: number;
  badge: {
    name: string;
    icon: keyof typeof BadgeIcons;
  };
}

export interface Theme {
  id: string;
  name: string;
  colors: {
    bg: string;
    text: string;
    primary: string;
    secondary: string;
    border: string;
    error: string;
    'text-muted': string;
  };
}
