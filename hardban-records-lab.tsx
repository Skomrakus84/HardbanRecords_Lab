import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';

// Inline Tailwind CSS dla pewności
const tailwindLink = document.createElement('link');
tailwindLink.href = 'https://cdn.tailwindcss.com';
tailwindLink.rel = 'stylesheet';
if (!document.head.querySelector('link[href="https://cdn.tailwindcss.com"]')) {
  document.head.appendChild(tailwindLink);
}

// Mock data - ZAKTUALIZOWANE na podstawie rzeczywistych danych z bazy
const statsData = {
  activeArtists: 5,        // z bazy: 5
  totalReleases: 4,        // z bazy: 4
  publishedBooks: 3,       // z bazy: 3
  totalRevenue: 25700      // z bazy: 25700.00
};

const streamingData = [
  { name: 'Jan', streams: 400000, books: 120 },
  { name: 'Feb', streams: 300000, books: 150 },
  { name: 'Mar', streams: 500000, books: 180 },
  { name: 'Apr', streams: 450000, books: 200 },
  { name: 'May', streams: 600000, books: 220 },
  { name: 'Jun', streams: 750000, books: 280 }
];

const platformData = [
  { name: 'Spotify', value: 35, color: '#1DB954' },
  { name: 'Apple Music', value: 25, color: '#FA243C' },
  { name: 'YouTube', value: 20, color: '#FF0000' },
  { name: 'Amazon', value: 12, color: '#FF9900' },
  { name: 'Others', value: 8, color: '#8B5CF6' }
];

const recentActivities = [
  {
    emoji: '🎵',
    title: "New album 'Midnight Dreams' released",
    details: "by The Synthwave • Distributed to 350 platforms • 2 hours ago",
    status: 'success'
  },
  {
    emoji: '📚',
    title: "Book 'Digital Future' published",
    details: "by Alex Chen • Live on Amazon KDP, Apple Books • 5 hours ago",
    status: 'success'
  },
  {
    emoji: '📊',
    title: "Weekly analytics report generated",
    details: "1M+ streams, 247 book sales • 1 day ago",
    status: 'success'
  },
  {
    emoji: '✨',
    title: "New artist 'Neon Beats' signed",
    details: "Electronic genre • Contract uploaded • 2 days ago",
    status: 'success'
  },
  {
    emoji: '🌍',
    title: "Global distribution completed",
    details: "Release 'Summer Vibes' • All 400 platforms • 3 days ago",
    status: 'success'
  },
  {
    emoji: '💰',
    title: "Royalty payments processed",
    details: "$12,500 distributed to 15 artists • 1 week ago",
    status: 'success'
  }
];

const mockReleases = [
  {
    id: 1,
    title: "Midnight Dreams",
    artist: "The Synthwave",
    cover: "/api/placeholder/200/200",
    status: "Live",
    platforms: 350,
    streams: "1.2M",
    revenue: "$4,200"
  },
  {
    id: 2,
    title: "Summer Vibes EP",
    artist: "Beach House",
    cover: "/api/placeholder/200/200",
    status: "Processing",
    platforms: 380,
    streams: "850K",
    revenue: "$2,800"
  },
  {
    id: 3,
    title: "Urban Nights",
    artist: "City Lights",
    cover: "/api/placeholder/200/200",
    status: "Live",
    platforms: 400,
    streams: "2.1M",
    revenue: "$7,500"
  }
];

const mockBooks = [
  {
    id: 1,
    title: "Digital Future",
    author: "Alex Chen",
    cover: "/api/placeholder/200/300",
    status: "Published",
    stores: 18,
    sales: 1247,
    revenue: "$3,200"
  },
  {
    id: 2,
    title: "The Art of Code",
    author: "Sarah Miller",
    cover: "/api/placeholder/200/300",
    status: "Review",
    stores: 21,
    sales: 892,
    revenue: "$2,100"
  }
];

// Main App Component
const HardbanRecordsLab = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [apiData, setApiData] = useState(null);

  // API Integration - pobieranie rzeczywistych danych
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://hardbanrecords-backend.onrender.com'}/api/dashboard/stats`);
        if (response.ok) {
          const data = await response.json();
          setApiData(data);
          console.log('✅ API Data loaded:', data);
        } else {
          console.log('⚠️ Using mock data - API not available');
        }
      } catch (error) {
        console.log('⚠️ Using mock data - API error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Użyj API data jeśli dostępne, inaczej mock data
  const currentStats = apiData || statsData;

  console.log('HardbanRecordsLab renderuje się!', { currentPage, sidebarOpen, isLoading });

  // Navigation Component
  const Sidebar = () => (
    <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-gray-900 text-white min-h-screen transition-all duration-300 flex flex-col`}>
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">🎵</div>
          {sidebarOpen && (
            <div>
              <h1 className="font-bold text-lg">HardbanRecords</h1>
              <p className="text-sm text-gray-400">Lab Platform</p>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {[
          { id: 'home', icon: '🏠', label: 'Dashboard' },
          { id: 'music', icon: '🎵', label: 'Music' },
          { id: 'publishing', icon: '📚', label: 'Publishing' },
          { id: 'analytics', icon: '📊', label: 'Analytics' },
          { id: 'distribution', icon: '🌍', label: 'Distribution' },
          { id: 'settings', icon: '⚙️', label: 'Settings' }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all ${
              currentPage === item.id
                ? 'bg-purple-600 text-white'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            {sidebarOpen && <span className="font-medium">{item.label}</span>}
          </button>
        ))}
      </nav>
    </div>
  );

  // Top Header Component
  const Header = () => (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h2 className="text-2xl font-bold text-gray-900 capitalize">{currentPage}</h2>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>All Systems Operational</span>
          </div>
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
            U
          </div>
        </div>
      </div>
    </header>
  );

  // HomePage Component - używa currentStats zamiast statsData
  const HomePage = () => (
    <div className="space-y-8">
      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="text-2xl">🎵 Loading HardbanRecords Lab...</div>
          <div className="text-gray-600 mt-2">Connecting to dashboard...</div>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white rounded-2xl p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">🎵 Welcome to HardbanRecords Lab</h1>
          <p className="text-xl mb-6 opacity-90">Your complete music distribution and digital publishing platform</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="text-center">
              <div className="w-3 h-3 bg-green-400 rounded-full mx-auto mb-2 animate-pulse"></div>
              <p className="text-sm">All Systems Online</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">+23%</div>
              <p className="text-sm">Revenue Growth</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{currentStats.totalReleases + currentStats.publishedBooks}</div>
              <p className="text-sm">Active Projects</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">20</div>
              <p className="text-sm">Total Platforms</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Grid - używa currentStats */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">👥</div>
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">Active</span>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold text-gray-900">{currentStats.activeArtists}</div>
            <div className="text-gray-600">Active Artists</div>
            <div className="text-sm text-gray-500 mt-1">Signed to HardbanRecords</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-2xl">🎵</div>
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">Live</span>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold text-gray-900">{currentStats.totalReleases}</div>
            <div className="text-gray-600">Music Releases</div>
            <div className="text-sm text-gray-500 mt-1">Albums & Singles live</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-2xl">📚</div>
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">Published</span>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold text-gray-900">{currentStats.publishedBooks}</div>
            <div className="text-gray-600">Published Books</div>
            <div className="text-sm text-gray-500 mt-1">Available in stores</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center text-2xl">💰</div>
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">+23%</span>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold text-gray-900">${currentStats.totalRevenue.toLocaleString()}</div>
            <div className="text-gray-600">Total Revenue</div>
            <div className="text-sm text-gray-500 mt-1">Combined income streams</div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">🚀 Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { emoji: '🎵', title: 'Add New Release', desc: 'Upload and distribute to 400+ platforms', action: () => setCurrentPage('music') },
            { emoji: '📖', title: 'Publish Book', desc: 'Create new book project for 21 platforms', action: () => setCurrentPage('publishing') },
            { emoji: '📊', title: 'View Analytics', desc: 'Unified analytics dashboard', action: () => setCurrentPage('analytics') },
            { emoji: '🌍', title: 'Manage Distribution', desc: 'Control global distribution', action: () => setCurrentPage('distribution') }
          ].map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className="text-center p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all group"
            >
              <div className="text-3xl mb-2">{action.emoji}</div>
              <div className="font-semibold text-gray-900 mb-1">{action.title}</div>
              <div className="text-sm text-gray-600">{action.desc}</div>
            </button>
          ))}
        </div>
      </section>

      {/* Performance Metrics - używa currentStats */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="text-3xl">🎧</div>
            <div className="text-right">
              <div className="text-3xl font-bold">854K</div>
              <div className="text-blue-100">Total streams across platforms</div>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-lg font-semibold">Music Streams</div>
            <div className="text-blue-100">{currentStats.totalReleases} releases live</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="text-3xl">📚</div>
            <div className="text-right">
              <div className="text-3xl font-bold">1,247</div>
              <div className="text-green-100">Books sold this month</div>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-lg font-semibold">Book Sales</div>
            <div className="text-green-100">{currentStats.publishedBooks} books published</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="text-3xl">🌐</div>
            <div className="text-right">
              <div className="text-3xl font-bold">20</div>
              <div className="text-purple-100">Active distribution channels</div>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-lg font-semibold">Platform Coverage</div>
            <div className="text-purple-100">10 music + 10 publishing</div>
          </div>
        </div>
      </section>

      {/* Recent Activity Feed */}
      <section className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">🕒 Recent Activity Feed</h3>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-all">
              <div className="text-2xl">{activity.emoji}</div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900">{activity.title}</div>
                <div className="text-gray-600 text-sm">{activity.details}</div>
              </div>
              <div className="text-green-500 text-xl">✅</div>
            </div>
          ))}
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-8 text-center">
        <h3 className="text-3xl font-bold mb-4">🎯 Ready to reach the world?</h3>
        <p className="text-xl mb-4 opacity-90">Distribute your music to 400+ platforms or publish books to 21 major retailers</p>
        <p className="text-indigo-200 mb-6">Join 10,000+ artists and authors already using HardbanRecords Lab</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => setCurrentPage('music')}
            className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all"
          >
            🎵 Start Music Distribution
          </button>
          <button
            onClick={() => setCurrentPage('publishing')}
            className="bg-indigo-700 text-white px-8 py-3 rounded-lg font-bold hover:bg-indigo-800 transition-all"
          >
            📚 Publish Your Book
          </button>
        </div>
        <button className="text-indigo-200 hover:text-white mt-4 underline">
          View all supported platforms →
        </button>
      </section>
    </div>
  );

  // Music Module Component - używa currentStats
  const MusicModule = () => (
    <div className="space-y-8">
      {/* Music Dashboard Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl p-6">
        <h2 className="text-3xl font-bold mb-2">🎵 Music Distribution Hub</h2>
        <p className="text-purple-100">Manage your music catalog and reach 400+ global platforms</p>
      </div>

      {/* Music Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">🎤</div>
            <span className="text-blue-600 text-sm font-medium">Live</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{currentStats.totalReleases}</div>
          <div className="text-gray-600">Total Releases</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">💿</div>
            <span className="text-green-600 text-sm font-medium">Active</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{currentStats.activeArtists}</div>
          <div className="text-gray-600">Signed Artists</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">🎧</div>
            <span className="text-green-600 text-sm font-medium">+18%</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">854K</div>
          <div className="text-gray-600">Monthly Streams</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">💰</div>
            <span className="text-green-600 text-sm font-medium">+15%</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">$16.3K</div>
          <div className="text-gray-600">Music Revenue</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">📈 Streaming Trends</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={streamingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Area type="monotone" dataKey="streams" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">🏆 Platform Breakdown</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={platformData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                  label={({name, value}) => `${name}: ${value}%`}
                >
                  {platformData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Releases */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">🎵 Recent Releases</h3>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
            + Add New Release
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockReleases.map((release) => (
            <div key={release.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all">
              <div className="w-full h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-4xl text-white">🎵</span>
              </div>
              <h4 className="font-semibold text-gray-900">{release.title}</h4>
              <p className="text-gray-600 text-sm">{release.artist}</p>
              <div className="mt-3 space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    release.status === 'Live' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {release.status}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Platforms:</span>
                  <span className="font-medium">{release.platforms}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Streams:</span>
                  <span className="font-medium">{release.streams}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Publishing Module Component - używa currentStats
  const PublishingModule = () => (
    <div className="space-y-8">
      {/* Publishing Dashboard Header */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-2xl p-6">
        <h2 className="text-3xl font-bold mb-2">📚 Digital Publishing Hub</h2>
        <p className="text-green-100">Publish and distribute books to 21 major platforms worldwide</p>
      </div>

      {/* Publishing Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">📖</div>
            <span className="text-green-600 text-sm font-medium">Published</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{currentStats.publishedBooks}</div>
          <div className="text-gray-600">Published Books</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">✏️</div>
            <span className="text-blue-600 text-sm font-medium">Active</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{Math.ceil(currentStats.activeArtists / 2)}</div>
          <div className="text-gray-600">Authors</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">💎</div>
            <span className="text-green-600 text-sm font-medium">+31%</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">1,247</div>
          <div className="text-gray-600">Total Sales</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">💰</div>
            <span className="text-green-600 text-sm font-medium">+28%</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">$9.4K</div>
          <div className="text-gray-600">Publishing Revenue</div>
        </div>
      </div>

      {/* Book Performance Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">📊 Book Sales Performance</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={streamingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Line type="monotone" dataKey="books" stroke="#10B981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Books Catalog */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">📚 Books Catalog</h3>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            + Publish New Book
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockBooks.map((book) => (
            <div key={book.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all">
              <div className="w-full h-48 bg-gradient-to-br from-green-400 to-blue-400 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-4xl text-white">📚</span>
              </div>
              <h4 className="font-semibold text-gray-900">{book.title}</h4>
              <p className="text-gray-600 text-sm">{book.author}</p>
              <div className="mt-3 space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    book.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {book.status}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Stores:</span>
                  <span className="font-medium">{book.stores}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Sales:</span>
                  <span className="font-medium">{book.sales.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Analytics Module Component
  const AnalyticsModule = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl p-6">
        <h2 className="text-3xl font-bold mb-2">📊 Unified Analytics Dashboard</h2>
        <p className="text-blue-100">Real-time insights from 400+ music platforms and 21 publishing stores</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">🎵 Music vs 📚 Books Revenue</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={streamingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="streams" fill="#8B5CF6" name="Music Streams (K)" />
                <Bar dataKey="books" fill="#10B981" name="Book Sales" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">🌍 Global Performance Map</h3>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">🗺️</div>
              <p className="text-gray-600">Interactive World Map</p>
              <p className="text-sm text-gray-500">Showing global distribution performance</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">🏆 Top Performing Release</h4>
          </div>
          <div className="space-y-2">
            <div className="text-lg font-bold">Urban Nights</div>
            <div className="text-gray-600">by City Lights</div>
            <div className="text-2xl font-bold text-purple-600">2.1M streams</div>
            <div className="text-sm text-green-600">+45% this week</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">📖 Best Selling Book</h4>
          </div>
          <div className="space-y-2">
            <div className="text-lg font-bold">Digital Future</div>
            <div className="text-gray-600">by Alex Chen</div>
            <div className="text-2xl font-bold text-green-600">1,247 sales</div>
            <div className="text-sm text-green-600">+31% this month</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">💰 Combined Revenue</h4>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-gray-900">$125,000</div>
            <div className="text-gray-600">Total this month</div>
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-purple-600">🎵 $85K</span>
              <span className="text-green-600">📚 $40K</span>
            </div>
            <div className="text-sm text-green-600">+23% overall growth</div>
          </div>
        </div>
      </div>
    </div>
  );

  // Distribution Module Component
  const DistributionModule = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl p-6">
        <h2 className="text-3xl font-bold mb-2">🌍 Global Distribution Center</h2>
        <p className="text-indigo-100">Manage distribution to 400+ music platforms and 21 publishing stores</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">🎵 Music Platforms Status</h3>
          <div className="space-y-3">
            {[
              { name: 'Spotify', status: 'Live', count: '45 releases', color: 'green' },
              { name: 'Apple Music', status: 'Live', count: '45 releases', color: 'green' },
              { name: 'YouTube Music', status: 'Processing', count: '3 pending', color: 'yellow' },
              { name: 'Amazon Music', status: 'Live', count: '42 releases', color: 'green' },
              { name: 'TikTok', status: 'Live', count: '38 releases', color: 'green' }
            ].map((platform, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    platform.color === 'green' ? 'bg-green-500' :
                    platform.color === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <div className="font-medium">{platform.name}</div>
                </div>
                <div className="text-right">
                  <div className={`text-sm px-2 py-1 rounded ${
                    platform.color === 'green' ? 'bg-green-100 text-green-800' :
                    platform.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {platform.status}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{platform.count}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
              View All 400+ Platforms →
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">📚 Publishing Stores Status</h3>
          <div className="space-y-3">
            {[
              { name: 'Amazon KDP', status: 'Live', count: '12 books', color: 'green' },
              { name: 'Apple Books', status: 'Live', count: '12 books', color: 'green' },
              { name: 'Google Play Books', status: 'Review', count: '2 pending', color: 'yellow' },
              { name: 'Kobo', status: 'Live', count: '10 books', color: 'green' },
              { name: 'Draft2Digital', status: 'Live', count: '12 books', color: 'green' }
            ].map((store, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    store.color === 'green' ? 'bg-green-500' :
                    store.color === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <div className="font-medium">{store.name}</div>
                </div>
                <div className="text-right">
                  <div className={`text-sm px-2 py-1 rounded ${
                    store.color === 'green' ? 'bg-green-100 text-green-800' :
                    store.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {store.status}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{store.count}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <button className="text-green-600 hover:text-green-700 text-sm font-medium">
              View All 21 Stores →
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">⚡ Quick Distribution Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border-2 border-purple-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all text-center">
            <div className="text-2xl mb-2">🚀</div>
            <div className="font-semibold">Bulk Release</div>
            <div className="text-sm text-gray-600">Add multiple releases to all platforms</div>
          </button>
          <button className="p-4 border-2 border-green-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all text-center">
            <div className="text-2xl mb-2">📊</div>
            <div className="font-semibold">Platform Analytics</div>
            <div className="text-sm text-gray-600">Deep dive into platform performance</div>
          </button>
          <button className="p-4 border-2 border-blue-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center">
            <div className="text-2xl mb-2">⚙️</div>
            <div className="font-semibold">Configure Platforms</div>
            <div className="text-sm text-gray-600">Manage platform settings and preferences</div>
          </button>
        </div>
      </div>
    </div>
  );

  // Settings Module Component
  const SettingsModule = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-2xl p-6">
        <h2 className="text-3xl font-bold mb-2">⚙️ Platform Settings</h2>
        <p className="text-gray-300">Configure your account, integrations, and platform preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">👤 Profile Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
              <input type="text" value="HardbanRecords Lab" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input type="email" value="admin@hardbanrecords.com" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                <option>UTC (GMT+0)</option>
                <option>EST (GMT-5)</option>
                <option>PST (GMT-8)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">🔔 Notifications</h3>
          <div className="space-y-4">
            {[
              { label: 'Email notifications', enabled: true },
              { label: 'Release status updates', enabled: true },
              { label: 'Revenue reports', enabled: false },
              { label: 'Platform announcements', enabled: true },
              { label: 'Marketing opportunities', enabled: false }
            ].map((setting, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-700">{setting.label}</span>
                <div className={`w-12 h-6 ${setting.enabled ? 'bg-purple-600' : 'bg-gray-300'} rounded-full relative cursor-pointer transition-colors`}>
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${setting.enabled ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">🔒 Security</h3>
          <div className="space-y-4">
            <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="font-medium">Change Password</div>
              <div className="text-sm text-gray-500">Update your account password</div>
            </button>
            <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="font-medium">Two-Factor Authentication</div>
              <div className="text-sm text-green-600">✓ Enabled</div>
            </button>
            <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="font-medium">Active Sessions</div>
              <div className="text-sm text-gray-500">Manage logged-in devices</div>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">🔌 Platform Integrations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'Spotify for Artists', status: 'Connected', color: 'green' },
            { name: 'Apple Music for Artists', status: 'Connected', color: 'green' },
            { name: 'YouTube Analytics', status: 'Pending', color: 'yellow' },
            { name: 'Amazon KDP', status: 'Connected', color: 'green' },
            { name: 'Google Analytics', status: 'Not Connected', color: 'gray' },
            { name: 'Social Media APIs', status: 'Connected', color: 'green' },
            { name: 'Payment Processors', status: 'Connected', color: 'green' },
            { name: 'Email Marketing', status: 'Connected', color: 'green' }
          ].map((integration, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="font-medium text-gray-900">{integration.name}</div>
              <div className={`text-sm mt-1 px-2 py-1 rounded inline-block ${
                integration.color === 'green' ? 'bg-green-100 text-green-800' :
                integration.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {integration.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Main render logic
  const renderCurrentPage = () => {
    switch(currentPage) {
      case 'home':
        return <HomePage />;
      case 'music':
        return <MusicModule />;
      case 'publishing':
        return <PublishingModule />;
      case 'analytics':
        return <AnalyticsModule />;
      case 'distribution':
        return <DistributionModule />;
      case 'settings':
        return <SettingsModule />;
      default:
        return <HomePage />;
    }
  };

  // Main render - pokaż prawdziwy interfejs
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto">
          {renderCurrentPage()}
        </main>
      </div>
    </div>
  );
};

export default HardbanRecordsLab;
