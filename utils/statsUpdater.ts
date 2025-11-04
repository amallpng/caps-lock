import { User } from '../types';
import { TypingStats } from '../hooks/useTypingGame';

const areDatesConsecutive = (date1Str: string, date2Str: string): boolean => {
    if (!date1Str || !date2Str) return false;
    const date1 = new Date(date1Str);
    const date2 = new Date(date2Str);
    date1.setDate(date1.getDate() + 1);
    return date1.getUTCFullYear() === date2.getUTCFullYear() &&
           date1.getUTCMonth() === date2.getUTCMonth() &&
           date1.getUTCDate() === date2.getUTCDate();
};

const areDatesSameDay = (date1Str: string, date2Str:string): boolean => {
    if (!date1Str || !date2Str) return false;
    const date1 = new Date(date1Str);
    const date2 = new Date(date2Str);
    return date1.getUTCFullYear() === date2.getUTCFullYear() &&
           date1.getUTCMonth() === date2.getUTCMonth() &&
           date1.getUTCDate() === date2.getUTCDate();
};

export const updateUserAfterTest = (user: User, stats: TypingStats): Partial<User> => {
    const today = new Date().toISOString().split('T')[0];
    const lastTestDate = user.lastTestDate;
    
    let newStreak = user.streak || 0;

    if (lastTestDate) {
        if (areDatesConsecutive(lastTestDate, today)) {
            newStreak++;
        } else if (!areDatesSameDay(lastTestDate, today)) {
            newStreak = 1; 
        }
    } else {
        newStreak = 1;
    }

    const newBestWpm = Math.max(user.bestWpm || 0, stats.wpm);

    const newHistoryEntry = {
        date: new Date().toISOString(),
        wpm: stats.wpm,
        accuracy: stats.accuracy,
    };
    const newTestHistory = [...(user.testHistory || []), newHistoryEntry];
    
    return {
        streak: newStreak,
        lastTestDate: today,
        bestWpm: newBestWpm,
        testHistory: newTestHistory,
    };
};
