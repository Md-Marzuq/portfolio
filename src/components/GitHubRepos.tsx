import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SiGithub } from "react-icons/si";
import { FaStar, FaCodeBranch } from "react-icons/fa";

interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics: string[];
}

interface GitHubReposProps {
  username: string;
  maxRepos?: number;
  className?: string;
}

export const GitHubRepos: React.FC<GitHubReposProps> = ({
  username,
  maxRepos = 6,
  className = "",
}) => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=${maxRepos}&type=owner`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch repositories: ${response.status}`);
        }

        const data = await response.json();
        setRepos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch repositories");
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchRepos();
    }
  }, [username, maxRepos]);

  const getLanguageColor = (language: string | null) => {
    const colors: { [key: string]: string } = {
      JavaScript: "#f1e05a",
      TypeScript: "#2b7489",
      Python: "#3572A5",
      Java: "#b07219",
      "C++": "#f34b7d",
      C: "#555555",
      Go: "#00ADD8",
      Rust: "#dea584",
      PHP: "#4F5D95",
      Ruby: "#701516",
      Swift: "#ffac45",
      Kotlin: "#F18E33",
      Dart: "#00B4AB",
      HTML: "#e34c26",
      CSS: "#1572B6",
      Shell: "#89e051",
      Vue: "#2c3e50",
      React: "#61dafb",
    };
    return colors[language || ""] || "#586069";
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
        <p className="text-sm">Failed to load repositories</p>
        <p className="text-xs mt-1 opacity-75">{error}</p>
      </div>
    );
  }

  return (
    <motion.div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {repos.map((repo, index) => (
        <motion.a
          key={repo.id}
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-[var(--brand)] group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <SiGithub className="text-[var(--muted)] group-hover:text-[var(--brand)] transition-colors" />
              <h3 className="font-semibold text-[var(--text)] group-hover:text-[var(--brand)] transition-colors truncate">
                {repo.name}
              </h3>
            </div>
          </div>

          <p className="text-sm text-[var(--muted)] mb-4 line-clamp-2 min-h-[2.5rem]">
            {repo.description || "No description available"}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {repo.language && (
                <div className="flex items-center gap-1">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: getLanguageColor(repo.language) }}
                  />
                  <span className="text-xs text-[var(--muted)]">{repo.language}</span>
                </div>
              )}

              <div className="flex items-center gap-1">
                <FaStar className="text-[var(--muted)]" size={14} />
                <span className="text-xs text-[var(--muted)]">{repo.stargazers_count}</span>
              </div>

              <div className="flex items-center gap-1">
                <FaCodeBranch className="text-[var(--muted)]" size={14} />
                <span className="text-xs text-[var(--muted)]">{repo.forks_count}</span>
              </div>
            </div>
          </div>

          {repo.topics && repo.topics.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {repo.topics.slice(0, 3).map((topic) => (
                <span
                  key={topic}
                  className="px-2 py-1 text-xs bg-[var(--muted)]/10 text-[var(--muted)] rounded-full"
                >
                  {topic}
                </span>
              ))}
            </div>
          )}

          <div className="text-xs text-[var(--muted)] mt-3">
            Updated {new Date(repo.updated_at).toLocaleDateString()}
          </div>
        </motion.a>
      ))}
    </motion.div>
  );
};