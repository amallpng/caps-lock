import React, { useState, useMemo } from 'react';
import { User } from '../types';

type ViewType = 'daily' | 'weekly' | 'monthly';

interface ChartDataPoint {
  label: string;
  value: number;
  count: number;
}

const processHistory = (history: User['testHistory'], view: ViewType): ChartDataPoint[] => {
    if (!history || history.length === 0) return [];

    const now = new Date();
    const groupedData: { [key: string]: { totalWpm: number; count: number } } = {};

    history.forEach(item => {
        const itemDate = new Date(item.date);
        let key = '';

        if (view === 'daily') {
            const diffDays = Math.floor((now.getTime() - itemDate.getTime()) / (1000 * 3600 * 24));
            if (diffDays < 14) {
               key = itemDate.toISOString().split('T')[0];
            }
        } else if (view === 'weekly') {
            const weekStart = new Date(itemDate);
            weekStart.setDate(itemDate.getDate() - itemDate.getDay());
            const diffWeeks = Math.floor((now.getTime() - weekStart.getTime()) / (1000 * 3600 * 24 * 7));
            if (diffWeeks < 12) {
                key = weekStart.toISOString().split('T')[0];
            }
        } else if (view === 'monthly') {
            const diffMonths = (now.getFullYear() - itemDate.getFullYear()) * 12 + (now.getMonth() - itemDate.getMonth());
             if (diffMonths < 12) {
                key = `${itemDate.getFullYear()}-${String(itemDate.getMonth() + 1).padStart(2, '0')}`;
            }
        }
        
        if (key) {
             if (!groupedData[key]) {
                groupedData[key] = { totalWpm: 0, count: 0 };
            }
            groupedData[key].totalWpm += item.wpm;
            groupedData[key].count++;
        }
    });

    const chartData = Object.entries(groupedData).map(([key, data]) => ({
        label: key,
        value: Math.round(data.totalWpm / data.count),
        count: data.count,
    }));

    return chartData.sort((a,b) => new Date(a.label).getTime() - new Date(b.label).getTime());
};


const PerformanceAnalysis: React.FC<{ user: User }> = ({ user }) => {
    const [view, setView] = useState<ViewType>('weekly');

    const chartData = useMemo(() => processHistory(user.testHistory, view), [user.testHistory, view]);
    const maxWpm = useMemo(() => chartData.length > 0 ? Math.max(...chartData.map(d => d.value), 50) : 50, [chartData]);

    const getFormattedLabel = (label: string) => {
        const date = new Date(label);
        switch (view) {
            case 'daily':
                return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
            case 'weekly':
                return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
            case 'monthly':
                return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short' });
            default:
                return label;
        }
    };

    return (
        <div className="w-full border-y-2 border-dashed border-[var(--color-border)] py-6">
            <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-4 text-center">Performance Analysis</h2>
            <div className="flex flex-col md:flex-row items-center justify-around gap-6">
                 {/* Daily Streak */}
                <div className="flex flex-col items-center text-center p-4 bg-[var(--color-bg)] rounded-sm border border-[var(--color-border)]">
                    <p className="text-lg text-[var(--color-text-muted)]">Daily Streak</p>
                    <div className="flex items-center justify-center">
                        <p className="text-5xl font-bold text-[var(--color-text)]">{user.streak || 0}</p>
                    </div>
                </div>

                {/* Progress Chart */}
                <div className="flex-grow w-full max-w-lg bg-[var(--color-bg)] p-4 rounded-sm border border-[var(--color-border)]">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-lg">Typing Progress</h3>
                        <div className="flex items-center text-sm">
                            {(['daily', 'weekly', 'monthly'] as ViewType[]).map(v => (
                                <button key={v} onClick={() => setView(v)} className={`px-2 py-1 capitalize transition-colors ${view === v ? 'bg-[var(--color-primary)] text-[var(--color-bg)] rounded-sm' : 'hover:underline'}`}>
                                    {v}
                                </button>
                            ))}
                        </div>
                    </div>
                    {chartData.length > 0 ? (
                        <div className="flex justify-around items-end h-48 gap-2 border-b-2 border-l-2 border-[var(--color-border)] p-2">
                            {chartData.map(data => (
                                <div key={data.label} className="flex-1 flex flex-col items-center justify-end group relative">
                                    <div className="absolute -top-10 hidden group-hover:block bg-[var(--color-text)] text-[var(--color-bg)] text-xs rounded py-1 px-2 pointer-events-none">
                                        Avg WPM: {data.value}
                                    </div>
                                    <div 
                                        className="w-full bg-[var(--color-primary)] hover:brightness-110 transition-all rounded-t-sm"
                                        style={{ height: `${(data.value / maxWpm) * 100}%`}}
                                    ></div>
                                    <span className="text-xs text-[var(--color-text-muted)] mt-1">{getFormattedLabel(data.label)}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="h-48 flex items-center justify-center text-[var(--color-text-muted)]">
                           <p>Complete some tests to see your progress!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PerformanceAnalysis;
