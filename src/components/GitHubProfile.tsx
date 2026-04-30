import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SiGithub } from "react-icons/si";
import { FaMapMarkerAlt, FaBuilding, FaLink, FaCalendarAlt } from "react-icons/fa";

interface GitHubProfile {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  location: string | null;
  company: string | null;
  blog: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
}

interface GitHubProfileProps {
  username: string;
  className?: string;
}

export const GitHubProfile: React.FC<GitHubProfileProps> = ({
  username,
  className = "",
}) => {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch profile: ${response.status}`);
        }

        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchProfile();
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
        <p className="text-sm">Failed to load GitHub profile</p>
        <p className="text-xs mt-1 opacity-75">{error}</p>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <motion.div
      className={`bg-[var(--surface)] border border-[var(--border)] rounded-lg p-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Avatar */}
        <motion.div
          className="flex-shrink-0"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <img
            src={profile.avatar_url}
            alt={`${profile.name || profile.login}'s avatar`}
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-[var(--border)]"
          />
        </motion.div>

        {/* Profile Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-[var(--text)] mb-1">
                {profile.name || profile.login}
              </h2>
              <p className="text-[var(--muted)] mb-3">@{profile.login}</p>

              {profile.bio && (
                <p className="text-[var(--text)] mb-4 leading-relaxed">
                  {profile.bio}
                </p>
              )}
            </div>

            <motion.a
              href={profile.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--brand)] text-white rounded-lg hover:opacity-90 transition-opacity self-start"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SiGithub size={16} />
              View Profile
            </motion.a>
          </div>

          {/* Profile Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {profile.location && (
              <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                <FaMapMarkerAlt size={16} />
                <span>{profile.location}</span>
              </div>
            )}

            {profile.company && (
              <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                <FaBuilding size={16} />
                <span>{profile.company}</span>
              </div>
            )}

            {profile.blog && (
              <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                <FaLink size={16} />
                <a
                  href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--brand)] hover:underline"
                >
                  {profile.blog}
                </a>
              </div>
            )}

            <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
              <FaCalendarAlt size={16} />
              <span>Joined {new Date(profile.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long'
              })}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mt-6 pt-4 border-t border-[var(--border)]">
            <div className="text-center">
              <div className="text-xl font-bold text-[var(--brand)]">
                {profile.public_repos}
              </div>
              <div className="text-xs text-[var(--muted)]">Repositories</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-[var(--brand)]">
                {profile.followers}
              </div>
              <div className="text-xs text-[var(--muted)]">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-[var(--brand)]">
                {profile.following}
              </div>
              <div className="text-xs text-[var(--muted)]">Following</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-[var(--brand)]">
                {profile.public_gists}
              </div>
              <div className="text-xs text-[var(--muted)]">Gists</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};