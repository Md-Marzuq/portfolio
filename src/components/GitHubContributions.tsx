import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface GitHubContributionsProps {
  username: string;
  className?: string;
}

export const GitHubContributions: React.FC<GitHubContributionsProps> = ({
  username,
  className = "",
}) => {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        setLoading(true);
        setError(null);

        // GitHub API doesn't provide contribution data directly
        // We'll use a proxy service or mock data for now
        // In a real implementation, you might use GitHub's GraphQL API with authentication

        // For demo purposes, we'll create mock contribution data
        const mockContributions: ContributionDay[] = [];
        const today = new Date();

        for (let i = 364; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(date.getDate() - i);

          // Generate random contribution levels (0-4)
          const level = Math.floor(Math.random() * 5);
          const count = level === 0 ? 0 : Math.floor(Math.random() * 10) + 1;

          mockContributions.push({
            date: date.toISOString().split('T')[0],
            count,
            level,
          });
        }

        setContributions(mockContributions);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch contributions");
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchContributions();
    }
  }, [username]);

  const getContributionColor = (level: number) => {
    const colors = [
      "bg-[var(--muted)]/20", // Level 0
      "bg-green-200", // Level 1
      "bg-green-300", // Level 2
      "bg-green-400", // Level 3
      "bg-green-500", // Level 4
    ];
    return colors[level] || colors[0];
  };

  const getWeeks = () => {
    const weeks: ContributionDay[][] = [];
    const daysPerWeek = 7;

    for (let i = 0; i < contributions.length; i += daysPerWeek) {
      weeks.push(contributions.slice(i, i + daysPerWeek));
    }

    return weeks;
  };

  if (loading) {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--brand)]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-center p-4 text-red-500 ${className}`}>
        <p className="text-sm">Failed to load contribution data</p>
        <p className="text-xs mt-1 opacity-75">{error}</p>
      </div>
    );
  }

  const weeks = getWeeks();
  const totalContributions = contributions.reduce((sum, day) => sum + day.count, 0);

  return (
    <motion.div
      className={`bg-[var(--surface)] border border-[var(--border)] rounded-lg p-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[var(--text)]">
          {totalContributions.toLocaleString()} contributions in the last year
        </h3>
        <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={`w-3 h-3 rounded-sm ${getContributionColor(level)}`}
            />
          ))}
          <span>More</span>
        </div>
      </div>

      <div className="flex gap-1 overflow-x-auto">
        {weeks.slice(-52).map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {week.map((day, dayIndex) => (
              <motion.div
                key={day.date}
                className={`w-3 h-3 rounded-sm cursor-pointer transition-all hover:ring-2 hover:ring-[var(--brand)] hover:ring-opacity-50 ${getContributionColor(day.level)}`}
                title={`${day.count} contributions on ${new Date(day.date).toLocaleDateString()}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 0.2,
                  delay: (weekIndex * 7 + dayIndex) * 0.01
                }}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-2 text-xs text-[var(--muted)]">
        <span>{new Date(contributions[0]?.date || '').toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
        <span>{new Date(contributions[contributions.length - 1]?.date || '').toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
      </div>
    </motion.div>
  );
};