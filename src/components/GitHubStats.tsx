import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface GitHubStats {
  followers: number;
  following: number;
  public_repos: number;
  public_gists: number;
  total_stars: number;
  total_forks: number;
}

interface GitHubStatsProps {
  username: string;
  className?: string;
}

export const GitHubStats: React.FC<GitHubStatsProps> = ({
  username,
  className = "",
}) => {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch user profile
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        if (!userResponse.ok) {
          throw new Error(`Failed to fetch user data: ${userResponse.status}`);
        }
        const userData = await userResponse.json();

        // Fetch user's repositories to calculate total stars and forks
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        if (!reposResponse.ok) {
          throw new Error(`Failed to fetch repositories: ${reposResponse.status}`);
        }
        const reposData = await reposResponse.json();

        const totalStars = reposData.reduce((sum: number, repo: any) => sum + repo.stargazers_count, 0);
        const totalForks = reposData.reduce((sum: number, repo: any) => sum + repo.forks_count, 0);

        setStats({
          followers: userData.followers,
          following: userData.following,
          public_repos: userData.public_repos,
          public_gists: userData.public_gists,
          total_stars: totalStars,
          total_forks: totalForks,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch GitHub stats");
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchGitHubStats();
    }
  }, [username]);

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
        <p className="text-sm">Failed to load GitHub stats</p>
        <p className="text-xs mt-1 opacity-75">{error}</p>
      </div>
    );
  }

  if (!stats) return null;

  const statItems = [
    { label: "Followers", value: stats.followers, icon: "👥" },
    { label: "Following", value: stats.following, icon: "👤" },
    { label: "Repositories", value: stats.public_repos, icon: "📁" },
    { label: "Gists", value: stats.public_gists, icon: "📄" },
    { label: "Total Stars", value: stats.total_stars, icon: "⭐" },
    { label: "Total Forks", value: stats.total_forks, icon: "🍴" },
  ];

  return (
    <motion.div
      className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {statItems.map((item, index) => (
        <motion.div
          key={item.label}
          className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 text-center hover:shadow-lg transition-shadow"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <div className="text-2xl mb-2">{item.icon}</div>
          <div className="text-2xl font-bold text-[var(--brand)] mb-1">
            {item.value.toLocaleString()}
          </div>
          <div className="text-sm text-[var(--muted)]">{item.label}</div>
        </motion.div>
      ))}
    </motion.div>
  );
};