import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMusicStore } from '../../store/musicStore';
import { useArtistStore } from '../../store/artistStore';

export const MusicDashboard: React.FC = () => {
  const {
    releases,
    loading: musicLoading,
    fetchReleases
  } = useMusicStore();

  const {
    artists,
    isLoading: artistsLoading,
    fetchArtists
  } = useArtistStore();

  const isLoading = musicLoading || artistsLoading;

  // Calculate stats from available data
  const musicStats = {
    totalStreams: artists.reduce((sum, artist) => sum + (artist.totalStreams || 0), 0),
    totalRevenue: artists.reduce((sum, artist) => sum + (artist.totalRevenue || 0), 0)
  };

  useEffect(() => {
    fetchReleases();
    fetchArtists();
  }, [fetchReleases, fetchArtists]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="px-6 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white flex items-center gap-3">
              🎵 Music Dashboard
            </h1>
            <p className="text-blue-200 mt-2">Manage your music catalog and artists</p>
          </div>
          <Link
            to="/music/releases/new"
            className="bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            ➕ New Release
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="px-6 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm font-medium">Total Releases</p>
                <p className="text-3xl font-bold text-white">{releases.length}</p>
              </div>
              <div className="text-4xl">🎼</div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-green-400 text-sm">📈 +12%</span>
              <span className="text-blue-200 text-sm">this month</span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm font-medium">Active Artists</p>
                <p className="text-3xl font-bold text-white">{artists.length}</p>
              </div>
              <div className="text-4xl">🎤</div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-green-400 text-sm">🆕 +3</span>
              <span className="text-blue-200 text-sm">new this week</span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm font-medium">Monthly Streams</p>
                <p className="text-3xl font-bold text-white">{musicStats.totalStreams.toLocaleString()}</p>
              </div>
              <div className="text-4xl">📊</div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-green-400 text-sm">🔥 +28%</span>
              <span className="text-blue-200 text-sm">vs last month</span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm font-medium">Monthly Revenue</p>
                <p className="text-3xl font-bold text-white">${musicStats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="text-4xl">💰</div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-green-400 text-sm">💸 +15%</span>
              <span className="text-blue-200 text-sm">vs last month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 pb-6">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          ⚡ Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/music/releases"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-6 rounded-xl transition-all duration-300 group"
          >
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">🎵</div>
            <h3 className="font-semibold text-lg">View Releases</h3>
            <p className="text-blue-100 text-sm mt-1">Manage all music releases</p>
          </Link>

          <Link
            to="/music/artists"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-6 rounded-xl transition-all duration-300 group"
          >
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">🎤</div>
            <h3 className="font-semibold text-lg">Artists</h3>
            <p className="text-purple-100 text-sm mt-1">Manage artist profiles</p>
          </Link>

          <Link
            to="/music/analytics"
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white p-6 rounded-xl transition-all duration-300 group"
          >
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">📊</div>
            <h3 className="font-semibold text-lg">Analytics</h3>
            <p className="text-green-100 text-sm mt-1">Track performance</p>
          </Link>

          <Link
            to="/music/royalties"
            className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white p-6 rounded-xl transition-all duration-300 group"
          >
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">💰</div>
            <h3 className="font-semibold text-lg">Royalties</h3>
            <p className="text-yellow-100 text-sm mt-1">Revenue & payments</p>
          </Link>
        </div>
      </div>

      {/* Recent Releases */}
      <div className="px-6 pb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            🆕 Recent Releases
          </h2>
          <Link
            to="/music/releases"
            className="text-blue-300 hover:text-white transition-colors"
          >
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {releases.slice(0, 6).map((release) => (
            <div
              key={release.id}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl">
                  🎵
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white group-hover:text-blue-300 transition-colors truncate">
                    {release.title}
                  </h3>
                  <p className="text-blue-200 text-sm truncate">{release.artist}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs bg-blue-600/30 text-blue-200 px-2 py-1 rounded-full">
                      {release.status}
                    </span>
                    <span className="text-xs text-gray-300">
                      {new Date(release.releaseDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-blue-200">Status: {release.status}</span>
                  <span className="text-green-400">{release.genre || 'Various'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {releases.length === 0 && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 text-center border border-white/20">
            <div className="text-6xl mb-4">🎵</div>
            <h3 className="text-xl font-semibold text-white mb-2">No releases yet</h3>
            <p className="text-blue-200 mb-6">Start by adding your first music release</p>
            <Link
              to="/music/releases/new"
              className="bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
            >
              ➕ Add First Release
            </Link>
          </div>
        )}
      </div>

      {/* Platform Distribution */}
      <div className="px-6 pb-8">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          🌍 Platform Distribution
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { name: 'Spotify', emoji: '🟢', color: 'from-green-500 to-green-600' },
            { name: 'Apple Music', emoji: '🍎', color: 'from-gray-700 to-gray-800' },
            { name: 'YouTube Music', emoji: '📺', color: 'from-red-500 to-red-600' },
            { name: 'Amazon Music', emoji: '📦', color: 'from-orange-500 to-orange-600' },
            { name: 'Deezer', emoji: '🎯', color: 'from-purple-500 to-purple-600' },
            { name: 'Tidal', emoji: '🌊', color: 'from-blue-500 to-blue-600' }
          ].map((platform) => (
            <div
              key={platform.name}
              className={`bg-gradient-to-r ${platform.color} p-4 rounded-xl text-white text-center hover:scale-105 transition-transform cursor-pointer`}
            >
              <div className="text-3xl mb-2">{platform.emoji}</div>
              <div className="font-semibold text-sm">{platform.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicDashboard;
